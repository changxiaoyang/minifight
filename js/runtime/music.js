import ImageBox from '../imagebox'
import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let instance
let imageBox = new ImageBox()
let dataBus = new DataBus()

/**
 * 统一的音效管理器
 */
export default class Music {
  constructor() {
    if ( instance )
      return instance

    instance = this
    this.music = {
      picX: 542,
      picY: 102,
      picW: 130,
      picH: 130,
      x: screenWidth * .95 - 50,
      y: 100,
      w: 43,
      h: 43,
      playing: false
    }
    this.setup = {
      picX: 408,
      picY: 102,
      picW: 130,
      picH: 130,
      x: screenWidth * .95,
      y: 100,
      w: 43,
      h: 43,
      playing: false
    }
    this.home = {
      picX: 408,
      picY: 246,
      picW: 130,
      picH: 130,
      x: screenWidth * .95 - 100,
      y: 100,
      w: 43,
      h: 43
    }

    this.btnBg = {
      picX: 0,
      picY: 464,
      picW: 280,
      picH: 100,
      x: screenWidth * .95 - 50,
      y: 100,
      w: screenWidth * .05 + 105,
      h: 42
    }

    this.bgmAudio = new Audio()
    this.bgmAudio.loop = true
    this.bgmAudio.src  = 'audio/bg1.mp3'

    this.clickAudio = new Audio()
    this.clickAudio.src = 'audio/click.mp3'
    this.selectAudio = new Audio()
    this.selectAudio.src = 'audio/select.mp3'

    this.gameOverAudio = new Audio()
    this.gameOverAudio.src = 'audio/gameover.mp3'
    this.koAudio = new Audio()
    this.koAudio.src = 'audio/ko.mp3'
    this.dingAudio = new Audio()
    this.dingAudio.src = 'audio/d3.mp3'

    if (wx.getStorageSync('music'))
      this.openMusic()
    else
      this.closeMusic()
  }

  changeBgm() {
    this.bgmAudio.pause()
    if (dataBus.currentPage == 2) {
      this.bgmAudio.src = 'audio/bg3.mp3'
    } else if (dataBus.currentPage == 0) {
      this.bgmAudio.src = 'audio/bg2.mp3'
    } else {
      this.bgmAudio.src = 'audio/bg1.mp3'
    }
    this.playBgm()
  }

  render(ctx) {
    this.btnBg.x = !this.setup.playing ? screenWidth * .95 - 4 
        :dataBus.currentPage != 0 ? screenWidth * .95 - 104 : screenWidth * .95 - 54
    ctx.drawImage(imageBox.menuImg,
      this.btnBg.picX, this.btnBg.picY, this.btnBg.picW, this.btnBg.picH,
      this.btnBg.x, this.btnBg.y, this.btnBg.w, this.btnBg.h)
    ctx.drawImage(imageBox.menuImg,
      this.setup.picX, this.setup.picY, this.setup.picW, this.setup.picH,
      this.setup.x, this.setup.y, this.setup.w, this.setup.h)
    if (this.setup.playing) {
      ctx.drawImage(imageBox.menuImg,
        this.music.picX, this.music.picY, this.music.picW, this.music.picH,
        this.music.x, this.music.y, this.music.w, this.music.h)
      if (dataBus.currentPage != 0) {
        ctx.drawImage(imageBox.menuImg,
          this.home.picX, this.home.picY, this.home.picW, this.home.picH,
          this.home.x, this.home.y, this.home.w, this.home.h)
      }

    }
  }

  /**
   * 音乐的开关操作
   */
  closeMusic() {
    this.music.playing = false
    this.music.picY = 246
    this.bgmAudio.pause()
    wx.setStorageSync('music', false)
  }

  openMusic() {
    this.music.playing = true
    this.music.picY = 102
    this.playBgm()
    wx.setStorageSync('music', true)
  }

  closeMenu() {
    this.setup.playing = false
  }
  openMenu() {
    this.setup.playing = true
  }


  /**
   * 菜单按钮位置判断
   */
  onMenuBtn(x, y) {
    return x > this.setup.x + 2 && y > this.setup.y + 2 && y < this.setup.y + 36
  }

  /**
   * 音乐按钮位置判断
   */
  onMusicBtn(x, y) {
    return this.setup.playing && x > this.music.x && x < this.music.x + 36 && 
      y > this.music.y + 2 && y < this.music.y + 36
  }

  /**
   * Home按钮位置判断
   */
  onHomeBtn(x, y) {
    return this.setup.playing && x > this.home.x + 2 && x < this.home.x + 36 
    && y > this.home.y + 2 && y < this.home.y + 36
  }

  playBgm() {
    if (this.music.playing) {
      this.bgmAudio.play()
    }
  }

  stopBgm() {
    this.bgmAudio.pause()
  }

  playClick() {
    if (this.music.playing) {
      this.clickAudio.currentTime = 0.25
      this.clickAudio.play()
    }
  }

  playDing() {
    if (this.music.playing) {
      this.dingAudio.currentTime = 0
      this.dingAudio.play()
    }
  }

  playSelect() {
    if (this.music.playing) {
      this.selectAudio.currentTime = 0
      this.selectAudio.play()
    }
  }

  playGameOver() {
    this.bgmAudio.pause()
    if (this.music.playing) {
      this.gameOverAudio.currentTime = 0
      this.gameOverAudio.play()
    }
  }

  playKO() {
    if (this.music.playing) {
      this.koAudio.currentTime = 0
      this.koAudio.play()
    }
  }
}
