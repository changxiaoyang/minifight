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
  constructor(ctx) {
    this.ctx = ctx
    // 玩家像素化的位置
    this.pointX = 60
    this.pointY = 30
    this.outerX = 220

    this.menu = new Menu()
    this.fightBg = new FightBg()
    this.animation = new Animation()
  }

  resetEnemy() {
    this.level = 1
    this.round = 1
    this.roundEnd = false
    this.levelEnd = false
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
    this.ai = new Ai(this.ememies, this.outerX)
    if (mode === 3) {
      this.ai.practice = true
    }
    this.player.setEnemy(this.ai.player)
    
    this.gameInfo = new GameInfo(this.player, this.ai.player)
    this.admission()
  }

  /**
   * AI入场动画 过关时播放
   */
  admission() {
    databus.gameOver = false
    this.animation.play(() => {
      this.defeat = 0
      this.win = 0
      this.round = 0
      this.player.update(databus.frequency, 0, 0, 1)
      let end = this.ai.admission()
      this.ctx.clearRect(0, 0, screenWidth, screenHeight)
      this.render()
      if (end) {
        this.animation.stop()
        this.restart()
      }
    })
  }

  /**
   * 下一关
   */
  nextLevel() {
    setTimeout(()=> {
      this.level++
      this.player.initPosition(this.pointX, this.pointY)
      this.player.initVitalSigns()
      this.ai.pointX = this.outerX
      this.ai.nextPlayer()
      this.player.setEnemy(this.ai.player)
      this.gameInfo = new GameInfo(this.player, this.ai.player)
      this.admission()
    }, 4000)
  }

  /**
   * 下回合
   */
  nextRound() {
    setTimeout(() => {
      this.round++
      this.player.initPosition(this.pointX, this.pointY)
      this.player.initVitalSigns()
      this.ai.resetPlayer()
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
    if (this.preparatory(frequency))  return
    let winner = this.checkWinner(this.player, this.ai.player)
    if (winner) {
      let playerWin = (winner.ccerId == this.player.ccerId)
      this.calculateScore(playerWin)
      if (winner.victory.end == true) {
        if (this.ko)
          music.playKO()
        this.animation.stop()
        this.plusWinner(playerWin)
        if (this.defeat == 2) 
          this.gameOver()
        else if (this.win == 2)
          this.nextLevel()
        else
          this.nextRound()
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

  plusWinner(winner) {
    if (winner) this.win ++
    else this.defeat ++
  }

  /**
   * 准备中，播放倒计时
   */
  preparatory(frequency) {
    if (score.ready >= 0) {
      music.stopBgm()
      score.countdown()
      if (score.ready < 0) {
        music.playBgm()
      }
      this.ai.player.update(frequency, 0, 0, -1)
      this.player.update(frequency, 0, 0, 1)
      return true
    }
    return false
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
      score.renderCD(this.ctx, this.round + 1)
    if (databus.gameOver) {
      score.renderContinue(this.ctx)
    }
  }

  timeOver() {
    return this.gameInfo.timer.surplus === 0
  }

  /**
   * 游戏失败
   */
  gameOver() {
    music.playGameOver()
    databus.gameOver = true
    this.menu.addContinueHandler()
    setTimeout(() => {
      this.menu.removeContinueHandler()
      databus.main.gotoPage(0)
    }, 5000)
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

  /**
   * 计算单场得分
   */
  calculateScore(playerWin) {
    if (!playerWin) {
      return
    }
    let timeScore = this.gameInfo.timer.count * 500
    let hpScore = this.player.hp * 500
    let sum = timeScore + hpScore
    databus.score = Math.max(sum, databus.score)
    this.printScore = true
  }
}
