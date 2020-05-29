import ImageBox from '../imagebox'
import Music from './music'
import DataBus from '../databus'
import Animation from '../base/animation'
import BluePlayer from '../player/blueplayer'

let imageBox = new ImageBox()
let music = new Music()
let dataBus = new DataBus()

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export default class SelectColor{

  constructor(ctx) {
    this.ctx = ctx
    this.selecter = 1
    this.animation = new Animation()
    this.initExample()
    this.setSelectBg(this.selecter)
    this.initPicPos()
  }

  /**
   * 切入 选择格斗颜色页面
   */
  cutIn() {
    this.addSelectHandler()
    this.animation.play(() =>{
      this.updateExample()
      this.render()
    })
  }

  initPicPos() {
    this.blue = {
      picX: 284,
      picY: 110
    }
    this.orange = {
      picX: 180,
      picY: 110
    }
    this.green = {
      picX: 506,
      picY: 0
    }
    this.red = {
      picX: 610,
      picY: 0
    }
    this.start = {
      picX: 186,
      picY: 0,
      picW: 148,
      picH: 52,
      x: screenWidth * .7,
      y: screenHeight * .6,
      w: 150,
      h: 60
    }
  }

  resetStartBtn() {
    this.start.x = screenWidth * .7
    this.start.y = screenHeight * .6
    this.start.w = 150
    this.start.h = 60
  }

  setSelectBg() {
    this.selectBg = {
      picW: 32,
      picH: 32,
      picY: 182,
      picX: 12,
      x: 47,
      y: 48
    }
  }

  /**
   * 切出页面，移除Handler
   */
  cutOut() {
    this.animation.stop()
    canvas.removeEventListener('touchend', this.stEndHanler)
    canvas.removeEventListener('touchstart', this.selectHandler)
  }

  addSelectHandler() {
    this.selectHandler = this.selectTouchHander.bind(this)
    canvas.addEventListener('touchstart', this.selectHandler)
  }

  selectTouchHander(e) {
    e.preventDefault()
    let x = e.changedTouches[0].clientX
    let y = e.changedTouches[0].clientY
    let usr = this.onBtnStart(x, y)
    switch (usr) {
      case 1:
      case 2:
      case 3:
      case 4:
        music.playSelect()
        this.selecter = usr
        this.changeSelect()
        break
      case 13:
        this.start.x += 2
        this.start.y += 2
        this.start.w -= 4
        this.start.h -= 4
        this.stEndHanler = this.endSTouchHander.bind(this)
        canvas.addEventListener('touchend', this.stEndHanler)
        canvas.removeEventListener('touchstart', this.selectHandler)
        this.render()
        break
      default:
        break
    }
  }

  /**
   * 松开开始按钮后，切换页面
   */
  endSTouchHander(e) {
    e.preventDefault()
    music.playClick()
    let x = e.changedTouches[0].clientX
    let y = e.changedTouches[0].clientY
    this.resetStartBtn()
    this.render()
    let usr = this.onBtnStart(x, y)
    if (usr == 13) {
      this.animation.stop()
      dataBus.main.gotoPage(2)
    } else {
      canvas.addEventListener('touchstart', this.selectHandler)
    }
    canvas.removeEventListener('touchend', this.stEndHanler)
  }

  changeSelect() {
    let ly = (this.selecter > 2) ? this.selecter - 2 : this.selecter
    let lx = this.selecter > 2
    this.selectBg.x = 48 + (lx ? 100 : 0)
    this.selectBg.y = 48 + 100 * (ly - 1)
    this.changeExample()
    this.render()
  }

  onBtnStart(x, y) {
    if (this.distance(x, y, 92, 92) < 44)
      return 1
    if (this.distance(x, y, 92, 192) < 44)
      return 2
    if (this.distance(x, y, 192, 92) < 44)
      return 3
    if (this.distance(x, y, 192, 192) < 44)
      return 4
    if (x < this.start.x + 100 && x > this.start.x && y < this.start.y + 50 && y > this.start.y) 
      return 13
    return 0
  }

  distance(p1x, p1y, p2x, p2y) {
    let dx = Math.abs(p1x - p2x);
    let dy = Math.abs(p2y - p1y);
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
  }

  render() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    this.ctx.drawImage(imageBox.fbgImg, 200, 0, 200, 124, 0, 0, screenWidth, screenHeight)
    this.ctx.drawImage(
      imageBox.menuImg,
      this.selectBg.picX, this.selectBg.picY, this.selectBg.picW, this.selectBg.picH, 
      this.selectBg.x, this.selectBg.y, 90, 90
    )
    this.ctx.drawImage(
      imageBox.menuImg,
      this.orange.picX, this.orange.picY, 90, 90, 50, 50, 86, 86
    )
    this.ctx.drawImage(
      imageBox.menuImg,
      this.blue.picX, this.blue.picY, 90, 90, 50, 150, 86, 86
    )
    this.ctx.drawImage(
      imageBox.menuImg,
      this.green.picX, this.green.picY, 90, 90, 150, 50, 86, 86
    )
    this.ctx.drawImage(
      imageBox.menuImg,
      this.red.picX, this.red.picY, 90, 90, 150, 150, 86, 86
    )
    this.ctx.drawImage(
      imageBox.menuImg,
      this.start.picX, this.start.picY, this.start.picW, this.start.picH, 
      this.start.x, this.start.y, this.start.w, this.start.h
    )
    this.renderExample()
    music.render(this.ctx)
  }

  updateExample() {
    let att = Math.floor(Math.random() * 200)
    if (att > 196) 
      att = att - 196
    else
      att = 0
    this.example.update(dataBus.frequency, 0, att, 1)
  }

  renderExample() {
    this.example.render(this.ctx)
  }

  changeExample() {
    switch (this.selecter) {
      case 1:
        this.example = new BluePlayer({ id: 1, img: imageBox.brownImg })
        break
      case 2:
        this.example = new BluePlayer({ id: 2, img: imageBox.blueImg })
        break
      case 3:
        this.example = new BluePlayer({ id: 3, img: imageBox.greenImg })
        break
      case 4:
        this.example = new BluePlayer({ id: 4, img: imageBox.redImg })
        break
    }
    this.example.initPosition(100, 40)
  }

  initExample() {
    this.example = new BluePlayer({ id: 1, img: imageBox.brownImg })
    this.example.initPosition(100, 40)
  }

}