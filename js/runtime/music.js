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

    this.closeMusic()
    // this.bgmAudio = new Audio()
    // this.bgmAudio.loop = true
    // this.bgmAudio.src  = 'audio/bgm.mp3'

    // this.shootAudio     = new Audio()
    // this.shootAudio.src = 'audio/bullet.mp3'

    // this.boomAudio     = new Audio()
    // this.boomAudio.src = 'audio/boom.mp3'

    // this.playBgm()
  }

  render(ctx) {
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
  }

  openMusic() {
    this.music.playing = true
    this.music.picY = 102
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
    this.bgmAudio.play()
  }

  playShoot() {
    this.shootAudio.currentTime = 0
    this.shootAudio.play()
  }

  playExplosion() {
    this.boomAudio.currentTime = 0
    this.boomAudio.play()
  }
}