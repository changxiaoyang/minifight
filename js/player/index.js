import DataBus  from '../databus'
import BrownPlayer from './brownplayer'
import GirlPlayer from './girlplayer'
import BluePlayer from './blueplayer'
import Ai from './ai'
import GameInfo from '../runtime/gameinfo'
import Score from '../runtime/score'
import ImageBox from '../imagebox'
import Menu from '../runtime/menu'
import FightBg from '../runtime/fightbg'
import Music from '../runtime/music'
import Animation from '../base/animation'

const screenWidth    = window.innerWidth
const screenHeight   = window.innerHeight

let databus = new DataBus()
let imageBox = new ImageBox()
let score = new Score()
let music = new Music()

export default class Player {
  constructor(ctx, main) {
    this.ctx = ctx
    this.main = main
    // 玩家像素化的位置
    this.pointX = 30
    this.pointY = 30

    this.level = 1

    this.menu = new Menu()
    this.fightBg = new FightBg()
    this.animation = new Animation()
  }

  resetEnemy() {
    this.level = 1
    let org = new BluePlayer({ id: 1, img: imageBox.brownImg })
    let blue = new BluePlayer({ id: 2, img: imageBox.blueImg })
    let green = new BluePlayer({ id: 3, img: imageBox.greenImg })
    let red = new BluePlayer({ id: 4, img: imageBox.redImg })
    this.ememies = [org, blue, green, red]
  }

  cutIn(mode, color) {
    this.resetEnemy()
    this.player = this.ememies[color - 1]
    this.player.initPosition(this.pointX, this.pointY)
    this.ememies.splice(color - 1, 1)
    this.ai = new Ai(this.ememies)
    if (mode === 3) {
      this.ai.practice = true
    }
    this.player.setEnemy(this.ai.player)

    this.gameInfo = new GameInfo(this.player, this.ai.player)
    this.restart()
  }

  /**
   * 下一关
   */
  nextLevel() {
    setTimeout(()=> {
      this.level++
      this.player.initPosition(this.pointX, this.pointY)
      this.player.initVitalSigns()
      this.ai.nextPlayer()
      this.player.setEnemy(this.ai.player)
      this.gameInfo = new GameInfo(this.player, this.ai.player)
      this.restart()
    }, 4000)
  }

  cutOut() {
    this.animation.stop()
    this.menu.removeAllHandler()
  }

  /**
   * 开始游戏
   */
  restart() {
    this.ko = false
    this.to = false
    this.defeat = false
    this.printScore = false
    score.initScore()
    this.animation.play(() => {
      this.update(databus.frequency, this.menu.getMenuStatus(), this.menu.attStatus)
      this.ctx.clearRect(0, 0, screenWidth, screenHeight)
      this.render()
      this.menu.render(this.ctx)
    })
    this.menu.addTouchHandler()
    this.menu.addAttTouchHandler()
  }

  /**
   * 更新状态
   */
  update(frequency, dirc, att) {
    //准备阶段
    if (score.ready > 0) {
      score.countdown()
      return
    }
    let winner = this.checkWinner(this.player, this.ai.player)
    if (winner) {
      let playerWin = (winner.ccerId == this.player.ccerId)
      this.calculateScore(playerWin)
      if (winner.victory.end == true) {
        this.animation.stop()
        //玩家获胜
        if (playerWin) {
          //计算本关得分
          this.nextLevel()
        } else {
          music.playGameOver()
        }
        return
      }
    }
    
    let pos = this.player.position(this.ai.player)
    this.ai.update(frequency, pos * -1)
    this.player.update(frequency, dirc, att, pos)
    if (this.player.checkTolerance() && this.ai.player.checkTolerance()) {
      this.player.tolerance(this.player.absPxArr, this.ai.player.absPxArr)
    }

    let attCK = this.player.attCheck()
    if (attCK[0] > 0) {
      this.underArrOrDefense(this.ai.player, attCK[0], this.ai.dirc, frequency)
    }
    if (attCK[1] > 0) {
      this.underArrOrDefense(this.player, attCK[1], dirc, frequency)
    }
    if (!this.ai.practice)
      this.gameInfo.update()
  }

  underArrOrDefense(player, num, dirc, frequency) {
    if (player.defense(dirc)) {
      player.updateDefense(frequency)
    } else {
      player.updateUnderAtt(num, frequency)
    }
  }

  /**
   * 绘制图画
   */
  render() {
    this.ctx.drawImage(imageBox.fbgImg, 200, 0, 200, 124, 0, 0, screenWidth, screenHeight)
    this.ai.render(this.ctx)
    this.player.render(this.ctx)
    this.gameInfo.render(this.ctx, this.ai.practice)
    if (this.to) 
      score.renderTO(this.ctx)
    else if (this.ko)
      score.renderKO(this.ctx)
    if (this.printScore)
      score.renderScore(this.ctx, databus.score)
    if (score.ready > 0) 
      score.renderCD(this.ctx)
    if (this.defeat)
      score.renderContinue(this.ctx)
  }

  timeOver() {
    return this.gameInfo.timer.surplus === 0
  }

  checkWinner(player, ai) {
    if (player.dead && ai.dead)
      return false
    if (player.dead) {
      return this.winner(ai)
    }
    if (ai.dead) {
      return this.winner(player)
    }
    if (this.timeOver()) {
      this.to = true
      return this.winner((ai.hp > player.hp) ? ai : player)
    }
    return false
  }

  winner(player) {
    this.menu.removeAllHandler()
    player.victory.isPlaying = true
    this.ko = true
    return player
  }

  calculateScore(playerWin) {
    if (!playerWin) {
      this.defeat = true
      return
    }
    let timeScore = this.gameInfo.timer.count * 500
    let hpScore = this.player.hp * 500
    let sum = timeScore + hpScore
    databus.score = Math.max(sum, databus.score)
    this.printScore = true
  }
}
