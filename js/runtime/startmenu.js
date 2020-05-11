import ImageBox from '../imagebox'
import Music from './music'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let imageBox = new ImageBox()
let music = new Music()

/**
 * 开始界面
 */
export default class StartMenu {
  constructor(ctx, main) {
    this.ctx = ctx

    this.main = main
    this.btn = {
      w: 160,
      h: 60
    }
    this.resetBtn()
    this.initTouchHandler()
  }

  /**
   * 进入开始页面
   */
  cutIn() {
    this.render()
    this.addTouchHandler()
  }

  /**
   * button初始位置
   */
  resetBtn() {
    //闯关
    this.chlg = {
      picX: 5,
      picY: 60,
      picW: 155,
      picH: 54,
      x: screenWidth / 2 - 80,
      y: 120
    }
    //对战
    this.comb = {
      picX: 5,
      picY: 118,
      picW: 155,
      picH: 54,
      x: screenWidth / 2 - 80,
      y: 180
    }
    //练习
    this.prdc = {
      picX: 182,
      picY: 54,
      picW: 146,
      picH: 54,
      x: screenWidth / 2 - 80,
      y: 240
    }
    this.buttonArr = [this.chlg, this.comb, this.prdc]
  }
 
  render() {
    this.ctx.drawImage(imageBox.fbgImg, 0, 0, 200, 124, 0, 0, screenWidth, screenHeight)
    this.ctx.drawImage(imageBox.menuImg, 
      this.chlg.picX, this.chlg.picY, this.chlg.picW, this.chlg.picH, 
      this.chlg.x, this.chlg.y, this.btn.w, this.btn.h)
    this.ctx.drawImage(imageBox.menuImg, 
      this.comb.picX, this.comb.picY, this.comb.picW, this.comb.picH,
      this.comb.x, this.comb.y, this.btn.w, this.btn.h)
    this.ctx.drawImage(imageBox.menuImg, 
      this.prdc.picX, this.prdc.picY, this.prdc.picW, this.prdc.picH,
      this.prdc.x, this.prdc.y, this.btn.w, this.btn.h)
    music.render(this.ctx)
  }

  addTouchHandler() {
    this.touchHandler = this.startTouchHander.bind(this)
    canvas.addEventListener('touchstart', this.touchHandler)
  }

  /**
   * 手指离开按钮时 跳转页面
   */
  endTouchHander(e) {
    e.preventDefault()
    music.playClick()
    let x = e.changedTouches[0].clientX
    let y = e.changedTouches[0].clientY
    this.resetBtn()
    this.render()
    canvas.removeEventListener('touchend', this.touchEndHanler)
    let endBtnId = this.inTouchArea(x, y)
    if (this.curBtnId === 1 && endBtnId === 1) {
      this.main.gotoPage(1)
    } else if (this.curBtnId === 2 && endBtnId === 2) {
      this.addTouchHandler()
    } else if (this.curBtnId === 3 && endBtnId === 3) {
      this.main.gotoPage(1)
    } else {
      this.addTouchHandler()
    }
    
  }

  startTouchHander(e) {
    e.preventDefault()
    let x = e.changedTouches[0].clientX
    let y = e.changedTouches[0].clientY
    this.changeTouchHander(this.inTouchArea(x, y))
  }
  
  /**
   * 按键按下时，更新触屏事件
   */
  changeTouchHander(num) {
    if (num === 0) return
    this.curBtnId = num
    this.changeBtnSize()
    this.touchEndHanler = this.endTouchHander.bind(this)
    canvas.addEventListener('touchend', this.touchEndHanler)
    canvas.removeEventListener('touchstart', this.touchHandler)
    this.render()
  }

  changeBtnSize() {
    let index = this.curBtnId - 1
    this.buttonArr[index].picW += 6
    this.buttonArr[index].picH += 4
    this.buttonArr[index].picX -= 3
    this.buttonArr[index].picY -= 1
  }

  inTouchArea(x, y) {
    let btnX = this.chlg.x + 7
    let h1 = 5
    let h2 = 54
    if (x > btnX && x < btnX + 145) {
      if (y > this.chlg.y + h1 && y < this.chlg.y + h2)
        return 1
      if (y > this.comb.y + h1 && y < this.comb.y + h2)
        return 2
      if (y > this.prdc.y + h1 && y < this.prdc.y + h2)
        return 3
    }
    return 0
  }

  /**
   * 音乐相关操作
   */
  initTouchHandler() {
    this.musicHandler = this.musicTouchHander.bind(this)
    canvas.addEventListener('touchstart', this.musicHandler)
  }

  musicTouchHander(e) {
    e.preventDefault()
    let x = e.changedTouches[0].clientX
    let y = e.changedTouches[0].clientY
    if (music.onMenuBtn(x, y)) {
      music.playClick()
      music.setup.playing = !music.setup.playing
      this.main.render()
    }
    if (music.onMusicBtn(x, y)) {
      music.music.playing ? music.closeMusic() : music.openMusic()
      music.closeMenu()
      this.main.render()
    }
    if (music.onHomeBtn(x, y)) {
      music.playClick()
      music.closeMenu()
      this.main.gotoPage(0)
    }
  }

  closeSetUp() {
    music.setup.playing = false
  }
}