import ImageBox from '../imagebox'
import Music from './music'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

let imageBox = new ImageBox()
let music = new Music()

/**
 * 游戏菜单类
 * 提供所有的轮盘，按钮功能
 */
export default class Menu {
  constructor() {
    this.menuRadius = Math.floor(screenHeight / 5)
    this.initPoint()
    // 攻击按钮 0 1 2 3
    this.attStatus = 0
    this.attFrame = 0

    this.touchId = -1
    // 8个方向 9种状态
    this.menuStatus = {
      s: 0,
      l: 1,
      ul: 2,
      u: 3,
      ur: 4,
      r: 5,
      dr: 6,
      d: 7,
      dl: 8
    }
  }

  initPoint() {
    this.originPoint = {
      x: this.menuRadius + 25,
      y: this.menuRadius * 4 - 10
    }
    this.fingerPoint = {
      x: this.menuRadius + 25,
      y: this.menuRadius * 4 - 10
    }
    this.fistPoint = {
      x: screenWidth - this.menuRadius * 1.4,
      y: this.menuRadius * 3.5 - 10
    }
    this.legPoint = {
      x: screenWidth - this.menuRadius * 2.1,
      y: this.menuRadius * 4.5 - 10
    }
    this.bodyPoint = {
      x: screenWidth - this.menuRadius,
      y: this.menuRadius * 4.5 - 10
    }
  }

  /**
   * 手指按下后的移动事件
   */
  touchMoveHandler(e) {
    e.preventDefault()
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === this.touchId) {
        let x = e.changedTouches[i].clientX
        let y = e.changedTouches[i].clientY
        this.changeFingerCoordinate(x, y)
        if (x > screenWidth - this.menuRadius * 4) {
          this.clearMoveAndEnd()
        }
      }
    }
    
  }

  /**
   * 根据手指位置 改变fingerPoint
   */
  changeFingerCoordinate(x, y) {
    let dis = this.distance(x, y, this.originPoint.x, this.originPoint.y)
    if (dis < this.menuRadius) {
      this.fingerPoint.x = x
      this.fingerPoint.y = y
    } else {
      this.fingerPoint.x = this.menuRadius * (x - this.originPoint.x) / dis + this.originPoint.x
      this.fingerPoint.y = this.menuRadius * (y - this.originPoint.y) / dis + this.originPoint.y
    }
  }

  /**
   * 获取操作轮盘状态
   */
  getMenuStatus() {
    let dis = this.distance(this.fingerPoint.x, this.fingerPoint.y, 
      this.originPoint.x, this.originPoint.y)
    if (dis < this.menuRadius / 2)
      return this.menuStatus.s
    let diffX = this.fingerPoint.x - this.originPoint.x
    let cos = diffX * this.menuRadius / (this.menuRadius * dis)
    let angle = 180 * Math.acos(cos) / Math.PI
    let f = 180 / 8 
    if (angle >= f * 7)
      return this.menuStatus.l
    if (angle <= f)
      return this.menuStatus.r
    if (angle > f && angle < f * 3)
      return this.fingerPoint.y < this.originPoint.y ? this.menuStatus.ur : this.menuStatus.dr
    if (angle >= 3 * f && angle <= f * 5)
      return this.fingerPoint.y < this.originPoint.y ? this.menuStatus.u : this.menuStatus.d
    return this.fingerPoint.y < this.originPoint.y ? this.menuStatus.ul : this.menuStatus.dl
  }

  addTouchHandler() {
    this.touchHandler = this.playTouchHandler.bind(this)
    canvas.addEventListener('touchstart', this.touchHandler)
  }

  addMoveHandler() {
    this.moveHandler = this.touchMoveHandler.bind(this)
    canvas.addEventListener('touchmove', this.moveHandler)
  }

  addEndHandler() {
    this.endHandler = this.touchEndHandler.bind(this)
    canvas.addEventListener('touchend', this.endHandler)
  }

  playTouchHandler(e) {
    e.preventDefault()
    let x = e.changedTouches[0].clientX
    let y = e.changedTouches[0].clientY
    if (this.inTouchArea(x, y)) {
      this.touchId = e.changedTouches[0].identifier
      this.addMoveHandler()
      this.addEndHandler()
      canvas.removeEventListener('touchstart', this.touchHandler)
    }
  }

  touchEndHandler(e) {
    e.preventDefault()
    let x = e.changedTouches[0].clientX
    // 攻击按钮和移动轮盘冲突
    if (this.touchId !== e.changedTouches[0].identifier) return
    this.clearMoveAndEnd()
  }

  clearMoveAndEnd() {
    this.touchId = -1
    this.fingerPoint = {
      x: this.menuRadius + 25,
      y: this.menuRadius * 4 - 10
    }
    canvas.removeEventListener('touchmove', this.moveHandler)
    canvas.removeEventListener('touchend', this.endHandler)
    this.addTouchHandler()
  }

  addAttTouchHandler() {
    this.attTouchHandler = this.attTouchHandler.bind(this)
    canvas.addEventListener('touchstart', this.attTouchHandler)
  }

  attTouchHandler(e) {
    e.preventDefault()
    let x = e.changedTouches[0].clientX
    let y = e.changedTouches[0].clientY
    if (x > screenWidth - this.menuRadius * 4)
      this.changeAttStatus(x, y)
  }

  changeAttStatus(x, y) {
    if (this.distance(x, y, this.fistPoint.x, this.fistPoint.y) < this.menuRadius * .5) {
      this.attStatus = 1
      this.attFrame = 5
    } else if (this.distance(x, y, this.legPoint.x, this.legPoint.y) < this.menuRadius * .5) {
      this.attStatus = 2
      this.attFrame = 5
    } else if (this.distance(x, y, this.bodyPoint.x, this.bodyPoint.y) < this.menuRadius * .5) {
      this.attStatus = 3
      this.attFrame = 5
    }
  }

  inTouchArea(x, y) {
    return this.distance(x, y, this.originPoint.x, this.originPoint.y) < this.menuRadius * .7
  }

  /**
   * 两点间距离
   */
  distance(p1x, p1y, p2x, p2y) {
    let dx = Math.abs(p1x - p2x);
    let dy = Math.abs(p2y - p1y);
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
  }

  /**
   * 绘图函数
   */
  render(ctx) {
    ctx.drawImage(
      imageBox.tmmuImg,
      0, 0, 156, 153,
      this.originPoint.x - this.menuRadius, this.originPoint.y - this.menuRadius,
         this.menuRadius * 2, this.menuRadius * 2
    )
    ctx.drawImage(
      imageBox.tmmuImg,
      0, 152, 52, 52,
      this.fingerPoint.x - this.menuRadius/2, this.fingerPoint.y - this.menuRadius/2, 
      this.menuRadius, this.menuRadius
    )
    //攻击键 点击效果
    switch(this.attStatus) {
      case 1: 
        ctx.drawImage(
          imageBox.tmmuImg,
          260, 103, 100, 102,
          this.fistPoint.x - this.menuRadius / 2 - 5, this.fistPoint.y - this.menuRadius / 2 - 5,
          this.menuRadius + 10, this.menuRadius + 10
        )
        break
      case 2:
        ctx.drawImage(
          imageBox.tmmuImg,
          260, 103, 100, 102,
          this.legPoint.x - this.menuRadius / 2 - 5, this.legPoint.y - this.menuRadius / 2 - 5,
          this.menuRadius + 10, this.menuRadius + 10
        )
        break
      case 3:
        ctx.drawImage(
          imageBox.tmmuImg,
          260, 103, 100, 102,
          this.bodyPoint.x - this.menuRadius / 2 - 5, this.bodyPoint.y - this.menuRadius / 2 - 5,
          this.menuRadius + 10, this.menuRadius + 10
        )
        break
      default:
        break
    }
    

    ctx.drawImage(
      imageBox.tmmuImg,
      158, 0, 101, 103,
      this.fistPoint.x - this.menuRadius / 2, this.fistPoint.y - this.menuRadius / 2, 
          this.menuRadius, this.menuRadius
    )
    ctx.drawImage(
      imageBox.tmmuImg,
      158, 103, 102, 100,
      this.legPoint.x - this.menuRadius / 2, this.legPoint.y - this.menuRadius / 2,
      this.menuRadius, this.menuRadius
    )
    ctx.drawImage(
      imageBox.tmmuImg,
      259, 0, 102, 102,
      this.bodyPoint.x - this.menuRadius / 2, this.bodyPoint.y - this.menuRadius / 2,
      this.menuRadius, this.menuRadius
    )

    music.render(ctx)

    if (this.attFrame > 0 && --this.attFrame <= 0) {
      this.attStatus = 0
    }
  }
}
