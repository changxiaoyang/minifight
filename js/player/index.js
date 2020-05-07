import DataBus  from '../databus'
import BrownPlayer from './brownplayer'
import GirlPlayer from './girlplayer'
import BluePlayer from './blueplayer'
import Ai from './ai'
import GameInfo from '../runtime/gameinfo.js'
import ImageBox from '../imagebox'
import Menu from '../runtime/menu'
import FightBg from '../runtime/fightbg'
import Animation from '../base/animation'

const screenWidth    = window.innerWidth
const screenHeight   = window.innerHeight

let databus = new DataBus()
let imageBox = new ImageBox()

export default class Player {
  constructor(ctx, main) {
    this.ctx = ctx
    this.main = main
    // 玩家像素化的位置
    this.pointX = 30
    this.pointY = 30

    this.menu = new Menu()
    this.fightBg = new FightBg()
    this.animation = new Animation()
  }

  stopAnimation() {
    this.animation.stop()
  }

  resetEnemy() {
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
    // this.brPlayer = new BrownPlayer(this.pointX, this.pointY, usrColor)
    this.player.enemy(this.ai.player)

    this.gameInfo = new GameInfo(this.player, this.ai.player)
    this.restart()
  }

  /**
   * 开始游戏
   */
  restart() {
    this.animation.play(() => {
      this.ctx.clearRect(0, 0, screenWidth, screenHeight)
      // this.fightBg.render(this.ctx)
      this.update(databus.frequency, this.menu.getMenuStatus(), this.menu.attStatus)
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
    if (this.player.dead || this.ai.player.dead || this.timeOver()) {
      frequency = frequency * 3
      // this.gameInfo.renderWinner(ctx, this.brPlayer)
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
    this.ai.render(this.ctx)
    this.player.render(this.ctx)
    this.gameInfo.render(this.ctx, this.ai.practice)
  }

  timeOver() {
    return this.gameInfo.timer.surplus === 0
  }

  renderWinner() {
    
  }

}
