import ImageBox from '../imagebox'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let imageBox = new ImageBox()

/**
 * 游戏菜单类
 * 提供所有的轮盘，按钮功能
 */
export default class FightBg {
  constructor() {
    this.level = 0
    this.bgPoint = {
      x: [0, 400, 0, 400],
      y: [0, 0, 200, 200]
    }
  }

  /**
   * 升级
   */
  upgrade() {
    this.level ++
  }

  /**
   * 绘图函数
   */
  render(ctx) {
    ctx.drawImage(
      imageBox.fbgImg,
      this.bgPoint.x[this.level], this.bgPoint.y[this.level], 400, 200,
      0, 0, screenWidth, screenHeight
    )
  }
}