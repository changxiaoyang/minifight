import ImageBox from '../imagebox'

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

let imageBox = new ImageBox()

const X0 = 20
const Y0 = 20

const INDEX_H = 228
const INDEX_W = 80

const BG_W = 290
const BG_H = 94
const HP_INDEX_W = 96
const HP_INDEX_H = 48

const MP_INDEX_W = 88
const MP_INDEX_H = 69

const HP_W = 188
const HP_H = 16
const MP_W = 148
const MP_H = 10

const TI_X = 570
const TI_W = 570

export default class GameInfo {

  constructor(a, b) {
    this.player1 = {source: a}
    this.player2 = {source: b}

    this.blue = {
      picX: 286,
      picY: 118
    }
    this.orange = {
      picX: 181,
      picY: 117
    }
    this.green = {
      picX: 510,
      picY: 4
    }
    this.red = {
      picX: 614,
      picY: 4
    }

    this.initPlayer(a.ccerId, this.player1)
    this.initPlayer(b.ccerId, this.player2)
    this.timer = {
      count: 60,
      surplus: 60,
      curFrame: 0
    }

    this.timeBg = {
      x: 570,
      y: 0,
      h: 74,
      w: 116
    }
  }

  initPlayer(id, player) {
    switch(id) {
      case 1:
        player.pic = this.orange
        break
      case 2:
        player.pic = this.blue
        break
      case 3:
        player.pic = this.green
        break
      case 4:
        player.pic = this.red
        break
      default:
        player.pic = this.orange
        break
    }
  }

  update() {
    this.timer.curFrame++
    if (this.timer.curFrame === 60) {
      this.timer.curFrame = 0
      this.timer.surplus--
    }
  }

  renderWinner(ctx, player) {
    ctx.font = "normal 52px Verdana";
    ctx.fillStyle = '#c8fee3';
    ctx.fillText('Game Over', screenWidth / 2 - 40, screenHeight / 2);
  }

  render(ctx, practice) {
    let hpW2 = HP_W / 100 * this.player2.source.hp
    let mpW2 = MP_W / 100 * this.player2.source.mp
    //HP
    ctx.drawImage(
      imageBox.menuImg,
      0, 235, 60, 30, X0 + HP_INDEX_W, Y0 + HP_INDEX_H, HP_W / 100 * this.player1.source.hp, HP_H
    )
    ctx.drawImage(
      imageBox.menuImg,
      0, 235, 60, 30, screenWidth - X0 - HP_INDEX_W - hpW2, Y0 + HP_INDEX_H, hpW2, HP_H
    )
    //MP
    ctx.drawImage(
      imageBox.menuImg,
      0, 285, 60, 30, X0 + MP_INDEX_W, Y0 + MP_INDEX_H, MP_W / 100 * this.player1.source.mp, MP_H
    )
    ctx.drawImage(
      imageBox.menuImg,
      0, 285, 60, 30, screenWidth - X0 - MP_INDEX_W - mpW2, Y0 + MP_INDEX_H, mpW2, MP_H
    )
    ctx.drawImage(
      imageBox.menuImg,
      this.player1.pic.picX, this.player1.pic.picY, 84, 84, X0 + 6, Y0 + 6, 84, 84
    )
    ctx.drawImage(
      imageBox.menuImg,
      this.player2.pic.picX, this.player2.pic.picY, 84, 84, screenWidth - X0 - 92, Y0 + 6, 84, 84
    )
    this.drawInfoBg(ctx)
    if (!practice)
      this.drawTime(ctx)
  }

  drawInfoBg(ctx) {
    ctx.drawImage(
      imageBox.menuImg,
      INDEX_W, INDEX_H, BG_W, BG_H, X0, Y0, BG_W, BG_H
    )
    ctx.drawImage(
      imageBox.menuImg,
      INDEX_W, INDEX_H + BG_H + 12, BG_W, BG_H, screenWidth - X0 - BG_W - 2, Y0, BG_W, BG_H
    )

  }

  drawTime(ctx) {
    ctx.font = "normal 52px Verdana";
    ctx.fillStyle = '#c8fee3';
    let time = this.timer.surplus > 10 ? this.timer.surplus : '0' + this.timer.surplus
    ctx.fillText(this.timer.surplus, screenWidth / 2 - 30, 80);
  }
}

