import ImageBox from '../imagebox'
import DataBus from '../databus'
import Music from './music'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let databus = new DataBus()
let imageBox = new ImageBox()
let music = new Music()

let instance

export default class Score {

  constructor() {
    if (instance)
      return instance
    instance = this
    this.ko = {
      picX: 342,
      picY: 462,
      picW: 246,
      picH: 96,
      x: screenWidth / 3,
      y: screenHeight / 4,
      w: screenWidth / 3,
      h: screenHeight / 3
    }

    this.to = {
      picX: 330,
      picY: 562,
      picW: 300,
      picH: 96,
      x: screenWidth / 3,
      y: screenHeight / 4,
      w: screenWidth / 3,
      h: screenHeight / 3
    }

    this.ctn = {
      picX: 4,
      picY: 678,
      picW: 178,
      picH: 60,
      x: screenWidth * 0.35,
      y: screenHeight * 0.7,
      w: 160,
      h: 56
    }

    this.initScore()
  }

  initScore() {
    this.frame = 179
    this.ready = 4
    this.v1 = 0
    this.v2 = 0
  }

  update() {
    this.timer.curFrame++
    if (this.timer.curFrame === 60) {
      this.timer.curFrame = 0
      this.timer.surplus--
    }
  }

  renderScore(ctx, score) {
    ctx.font = "normal 24px Verdana";
    ctx.fillStyle = '#c8fee3';
    ctx.fillText('得分：' + score, this.ko.x, this.ko.y + this.ko.h + 80);
  }

  renderKO(ctx) {
    ctx.drawImage(
      imageBox.menuImg,
      this.ko.picX, this.ko.picY, this.ko.picW, this.ko.picH,
      this.ko.x, this.ko.y, this.ko.w, this.ko.h
    )
  }

  renderTO(ctx) {
    ctx.drawImage(
      imageBox.menuImg,
      this.to.picX, this.to.picY, this.to.picW, this.to.picH,
      this.to.x, this.to.y, this.to.w, this.to.h
    )
  }

  renderContinue(ctx) {
    ctx.drawImage(
      imageBox.menuImg,
      this.ctn.picX, this.ctn.picY, this.ctn.picW, this.ctn.picH,
      this.ctn.x, this.ctn.y, this.ctn.w, this.ctn.h
    )
  }

  /**
   * Countdown
   */
  renderCD(ctx, round) {
    ctx.font = "normal 100px Verdana";
    ctx.fillStyle = '#ff8900';
    if(this.ready == 4) {
      ctx.font = "normal 56px Verdana";
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('Round ' + round, screenWidth * 0.38, this.ko.y + this.ko.h)
    }
    else
      ctx.fillText(this.ready, screenWidth * 0.46, this.ko.y + this.ko.h)
  }

  countdown() {
    if ((this.frame --) % 60 === 0) {
      this.ready--
      if (this.ready > 0)
        music.playDing()
    }
  }


}

