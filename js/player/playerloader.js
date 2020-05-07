import Pixel from '../base/pixel'
import ImageBox from '../imagebox'
import BrownPlayer from './brownplayer'
import BluePlayer from './blueplayer'
import GirlPlayer from './girlplayer'
import PlayerPxBox from './playerpxbox'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const X0 = screenWidth / 8
const Y0 = screenHeight * .8

const P_HEIGHT = 15
const P_WIDTH = X0 * 6

let imageBox = new ImageBox()
let pixel = new Pixel()

let playerPxBox = new PlayerPxBox()

/**
 * 游戏加载器
 */
export default class PlayerLoader {
  constructor() {
    this.pointX = 60
    this.pointY = 60

    this.progress = 0

    this.player = new BrownPlayer(this.pointX, this.pointY, { id: 0, img: imageBox.brownImg})
    // this.player = new GirlPlayer(this.pointX, this.pointY, { id: 0, img: imageBox.girlImg })
  }

  loadPlayers1(ctx) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    // for (let i = 0; i < 21; i++) {
    //   this.player.update(0, 3, 0)
    // }
    this.player.update(0, 7, 0)
    this.player.update(0, 6, 0)
    this.player.update(0, 5, 0)
    for (let j = 0; j < 14; j++) {
      this.player.update(0, 5, 1)
    }
    let arr = []
    this.render(ctx, arr)
    this.printAllMap(arr)
    console.log(arr)
  }

  /**
   * 执行所有的加载过程
   */
  loadPlayers(ctx) {
    //站立
    let stand = wx.getStorageSync('stand')
    if (!stand || stand.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 0, 0, 1)
      this.render(ctx, playerPxBox.orange.stand)
      wx.setStorageSync('stand', playerPxBox.orange.stand)
    } else {
      playerPxBox.orange.stand = stand
    }
    this.progress += 10
    // move
    let move = wx.getStorageSync('move')
    if (!move || move.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 5, 0, 1)
      this.render(ctx, playerPxBox.orange.move)
      wx.setStorageSync('move', playerPxBox.orange.move)
    } else {
      playerPxBox.orange.move = move
    }
    this.progress += 10
    // run[0][1][2]
    let run0 = wx.getStorageSync('run0')
    if (!run0 || run0.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 0, 0, 1)
      this.player.update(1, 5, 0, 1)
      this.render(ctx, playerPxBox.orange.run[0])
      wx.setStorageSync('run0', playerPxBox.orange.run[0])
    } else {
      playerPxBox.orange.run[0] = run0
    }
    let run1 = wx.getStorageSync('run1')
    if (!run1 || run1.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 5, 0, 1)
      this.render(ctx, playerPxBox.orange.run[1])
      wx.setStorageSync('run1', playerPxBox.orange.run[1])
    } else {
      playerPxBox.orange.run[1] = run1
    }
    let run2 = wx.getStorageSync('run2')
    if (!run2 || run2.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 5, 0, 1)
      this.render(ctx, playerPxBox.orange.run[2])
      wx.setStorageSync('run2', playerPxBox.orange.run[2])
    } else {
      playerPxBox.orange.run[2] = run2
    }
    this.progress += 30
    // dun
    let squat0 = wx.getStorageSync('squat0')
    if (!squat0 || squat0.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 7, 0, 1)
      this.render(ctx, playerPxBox.orange.squat[0])
      wx.setStorageSync('squat0', playerPxBox.orange.squat[0])
    } else {
      playerPxBox.orange.squat[0] = squat0
    }

    let squat1 = wx.getStorageSync('squat1')
    if (!squat1 || squat1.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 7, 0, 1)
      this.render(ctx, playerPxBox.orange.squat[1])
      wx.setStorageSync('squat1', playerPxBox.orange.squat[1])
    } else {
      playerPxBox.orange.squat[1] = squat1
    }
    this.progress += 10
    // jump
    let jump0 = wx.getStorageSync('jump0')
    if (!jump0 || jump0.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 3, 0, 1)
      this.render(ctx, playerPxBox.orange.jump[0])
      wx.setStorageSync('jump0', playerPxBox.orange.jump[0])
    } else {
      playerPxBox.orange.jump[0] = jump0
    }

    let jump1 = wx.getStorageSync('jump1')
    if (!jump1 || jump1.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 3, 0, 1)
      this.render(ctx, playerPxBox.orange.jump[1])
      wx.setStorageSync('jump1', playerPxBox.orange.jump[1])
    } else {
      playerPxBox.orange.jump[1] = jump1
    }
    let jump2 = wx.getStorageSync('jump2')
    if (!jump2 || jump2.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 3, 0, 1)
      this.render(ctx, playerPxBox.orange.jump[2])
      wx.setStorageSync('jump2', playerPxBox.orange.jump[2])
    } else {
      playerPxBox.orange.jump[2] = jump2
    }
    let jump3 = wx.getStorageSync('jump3')
    if (!jump3 || jump3.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 3, 0, 1)
      this.render(ctx, playerPxBox.orange.jump[3])
      wx.setStorageSync('jump3', playerPxBox.orange.jump[3])
    } else {
      playerPxBox.orange.jump[3] = jump3
    }
    this.progress += 10
    this.player.update(1, 0, 0, 1)
    this.player.update(1, 0, 0, 1)
    this.player.update(1, 0, 0, 1)
    this.player.update(1, 0, 0, 1)
    this.player.update(1, 0, 0, 1)
    this.player.update(1, 4, 0, 1)
    this.player.update(1, 4, 0, 1)
    // rolling
    let rolling0 = wx.getStorageSync('rolling0')
    if (!rolling0 || rolling0.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 4, 0, 1)
      this.render(ctx, playerPxBox.orange.rolling[0])
      wx.setStorageSync('rolling0', playerPxBox.orange.rolling[0])
    } else {
      playerPxBox.orange.rolling[0] = rolling0
    }

    let rolling1 = wx.getStorageSync('rolling1')
    if (!rolling1 || rolling1.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 4, 0, 1)
      this.render(ctx, playerPxBox.orange.rolling[1])
      wx.setStorageSync('rolling1', playerPxBox.orange.rolling[1])
    } else {
      playerPxBox.orange.rolling[1] = rolling1
    }
    let rolling2 = wx.getStorageSync('rolling2')
    if (!rolling2 || rolling2.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 4, 0, 1)
      this.render(ctx, playerPxBox.orange.rolling[2])
      wx.setStorageSync('rolling2', playerPxBox.orange.rolling[2])
    } else {
      playerPxBox.orange.rolling[2] = rolling2
    }
    let rolling3 = wx.getStorageSync('rolling3')
    if (!rolling3 || rolling3.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 4, 0, 1)
      this.render(ctx, playerPxBox.orange.rolling[3])
      wx.setStorageSync('rolling3', playerPxBox.orange.rolling[3])
    } else {
      playerPxBox.orange.rolling[3] = rolling3
    }
    this.progress += 10
    // att 0
    let azure0 = wx.getStorageSync('azure0')
    if (!azure0 || azure0.length == 0) {
      this.player.update(1, 0, 0, 1)
      this.player.update(1, 0, 0, 1)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 0, 1, 1)
      this.render(ctx, playerPxBox.orange.azure[0])
      wx.setStorageSync('azure0', playerPxBox.orange.azure[0])
    } else {
      playerPxBox.orange.azure[0] = azure0
    }

    let azure1 = wx.getStorageSync('azure1')
    if (!azure1 || azure1.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 0, 1, 1)
      this.render(ctx, playerPxBox.orange.azure[1])
      wx.setStorageSync('azure1', playerPxBox.orange.azure[1])
    } else {
      playerPxBox.orange.azure[1] = azure1
    }
    let blue0 = wx.getStorageSync('blue0')
    if (!blue0 || blue0.length == 0) {
      this.player.update(1, 0, 0, 1)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 0, 3, 1)
      this.render(ctx, playerPxBox.orange.blue[0])
      wx.setStorageSync('blue0', playerPxBox.orange.blue[0])
    } else {
      playerPxBox.orange.blue[0] = blue0
    }

    let blue1 = wx.getStorageSync('blue1')
    if (!blue1 || blue1.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 0, 3, 1)
      this.render(ctx, playerPxBox.orange.blue[1])
      wx.setStorageSync('blue1', playerPxBox.orange.blue[1])
    } else {
      playerPxBox.orange.blue[1] = blue1
    }
    
    this.player.update(1, 0, 0, 1)
    this.player.update(1, 0, 0, 1)
    this.player.update(1, 0, 0, 1)
    let orange0 = wx.getStorageSync('orange0')
    if (!orange0 || orange0.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 0, 2, 1)
      this.render(ctx, playerPxBox.orange.orange[0])
      wx.setStorageSync('orange0', playerPxBox.orange.orange[0])
    } else {
      playerPxBox.orange.orange[0] = orange0
    }

    let orange1 = wx.getStorageSync('orange1')
    if (!orange1 || orange1.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 0, 2, 1)
      this.render(ctx, playerPxBox.orange.orange[1])
      wx.setStorageSync('orange1', playerPxBox.orange.orange[1])
    } else {
      playerPxBox.orange.orange[1] = orange1
    }
    let orange2 = wx.getStorageSync('orange2')
    if (!orange2 || orange2.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 0, 2, 1)
      this.render(ctx, playerPxBox.orange.orange[2])
      wx.setStorageSync('orange2', playerPxBox.orange.orange[2])
    } else {
      playerPxBox.orange.orange[2] = orange2
    }
    let orange3 = wx.getStorageSync('orange3')
    if (!orange3 || orange3.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 0, 2, 1)
      this.render(ctx, playerPxBox.orange.orange[3])
      wx.setStorageSync('orange3', playerPxBox.orange.orange[3])
    } else {
      playerPxBox.orange.orange[3] = orange3
    }
    let orange4 = wx.getStorageSync('orange4')
    if (!orange4 || orange4.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 0, 2, 1)
      this.render(ctx, playerPxBox.orange.orange[4])
      wx.setStorageSync('orange4', playerPxBox.orange.orange[4])
    } else {
      playerPxBox.orange.orange[4] = orange4
    }
    this.player.update(1, 0, 0, 1)
    this.player.update(1, 0, 0, 1)
    this.player.update(1, 0, 0, 1)
    this.player.update(1, 5, 0, 1)
    this.player.update(1, 0, 0, 1)
    let slide0 = wx.getStorageSync('slide0')
    if (!slide0 || slide0.length == 0) {
      this.player.update(1, 5, 0, 1)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 0, 2, 1)
      this.render(ctx, playerPxBox.orange.slide[0])
      wx.setStorageSync('slide0', playerPxBox.orange.slide[0])
    } else {
      playerPxBox.orange.slide[0] = slide0
    }

    this.player.update(1, 0, 0, 1)
    this.player.update(1, 0, 0, 1)
    this.player.update(1, 0, 0, 1)
    let sLeg0 = wx.getStorageSync('sLeg0')
    if (!sLeg0 || sLeg0.length == 0) {
      this.player.update(1, 7, 0, 1)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 7, 3, 1)
      this.render(ctx, playerPxBox.orange.sLeg[0])
      wx.setStorageSync('sLeg0', playerPxBox.orange.sLeg[0])
    } else {
      playerPxBox.orange.sLeg[0] = sLeg0
    }
    let sLeg1 = wx.getStorageSync('sLeg1')
    if (!sLeg1 || sLeg1.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 7, 3, 1)
      this.render(ctx, playerPxBox.orange.sLeg[1])
      wx.setStorageSync('sLeg1', playerPxBox.orange.sLeg[1])
    } else {
      playerPxBox.orange.sLeg[1] = sLeg1
    }
    let sLeg2 = wx.getStorageSync('sLeg2')
    if (!sLeg2 || sLeg2.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 7, 3, 1)
      this.render(ctx, playerPxBox.orange.sLeg[2])
      wx.setStorageSync('sLeg2', playerPxBox.orange.sLeg[2])
    } else {
      playerPxBox.orange.sLeg[2] = sLeg2
    }
    this.player.update(1, 0, 0, 1)
    this.player.update(1, 0, 0, 1)
    this.player.update(1, 7, 0, 1)
    let sAzu0 = wx.getStorageSync('sAzu0')
    if (!sAzu0 || sAzu0.length == 0) { 
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 7, 1, 1)
      this.render(ctx, playerPxBox.orange.sAzu[0])
      wx.setStorageSync('sAzu0', playerPxBox.orange.sAzu[0])
    } else {
      playerPxBox.orange.sAzu[0] = sAzu0
    }

    let sAzu1 = wx.getStorageSync('sAzu1')
    if (!sAzu1 || sAzu1.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 7, 1, 1)
      this.render(ctx, playerPxBox.orange.sAzu[1])
      wx.setStorageSync('sAzu1', playerPxBox.orange.sAzu[1])
    } else {
      playerPxBox.orange.sAzu[1] = sAzu1
    }
    let sAzu2 = wx.getStorageSync('sAzu2')
    if (!sAzu2 || sAzu2.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 7, 1, 1)
      this.render(ctx, playerPxBox.orange.sAzu[2])
      wx.setStorageSync('sAzu2', playerPxBox.orange.sAzu[2])
    } else {
      playerPxBox.orange.sAzu[2] = sAzu2
    }
    this.player.update(1, 0, 0, 1)
    this.player.update(1, 0, 0, 1)
    this.player.update(1, 7, 0, 1)
    let sOrg0 = wx.getStorageSync('sOrg0')
    if (!sOrg0 || sOrg0.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 7, 2, 1)
      this.render(ctx, playerPxBox.orange.sOrg[0])
      wx.setStorageSync('sOrg0', playerPxBox.orange.sOrg[0])
    } else {
      playerPxBox.orange.sOrg[0] = sOrg0
    }

    let sOrg1 = wx.getStorageSync('sOrg1')
    if (!sOrg1 || sOrg1.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 7, 2, 1)
      this.render(ctx, playerPxBox.orange.sOrg[1])
      wx.setStorageSync('sOrg1', playerPxBox.orange.sOrg[1])
    } else {
      playerPxBox.orange.sOrg[1] = sOrg1
    }
    let sOrg2 = wx.getStorageSync('sOrg2')
    if (!sOrg2 || sOrg2.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 7, 2, 1)
      this.render(ctx, playerPxBox.orange.sOrg[2])
      wx.setStorageSync('sOrg2', playerPxBox.orange.sOrg[2])
    } else {
      playerPxBox.orange.sOrg[2] = sOrg2
    }
    let jBlue0 = wx.getStorageSync('jBlue0')
    if (!jBlue0 || jBlue0.length == 0) {
      this.player.update(1, 0, 0, 1)
      this.player.update(1, 0, 0, 1)
      this.player.update(1, 3, 0, 1)
      this.player.update(1, 3, 0, 1)
      this.player.update(1, 3, 0, 1)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 3, 3, 1)
      this.render(ctx, playerPxBox.orange.jBlue[0])
      wx.setStorageSync('jBlue0', playerPxBox.orange.jBlue[0])
    } else {
      playerPxBox.orange.jBlue[0] = jBlue0
    }

    let jBlue1 = wx.getStorageSync('jBlue1')
    if (!jBlue1 || jBlue1.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 3, 3, 1)
      this.render(ctx, playerPxBox.orange.jBlue[1])
      wx.setStorageSync('jBlue1', playerPxBox.orange.jBlue[1])
    } else {
      playerPxBox.orange.jBlue[1] = jBlue1
    }
    let jAzu0 = wx.getStorageSync('jAzu0')
    if (!jAzu0 || jAzu0.length == 0) {
      this.player.update(1, 0, 0, 1)
      this.player.update(1, 0, 0, 1)
      this.player.update(1, 3, 0, 1)
      this.player.update(1, 3, 0, 1)
      this.player.update(1, 3, 0, 1)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 3, 1, 1)
      this.render(ctx, playerPxBox.orange.jAzu[0])
      wx.setStorageSync('jAzu0', playerPxBox.orange.jAzu[0])
    } else {
      playerPxBox.orange.jAzu[0] = jAzu0
    }

    let jAzu1 = wx.getStorageSync('jAzu1')
    if (!jAzu1 || jAzu1.length == 0) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 3, 3, 1)
      this.render(ctx, playerPxBox.orange.jAzu[1])
      wx.setStorageSync('jAzu1', playerPxBox.orange.jAzu[1])
    } else {
      playerPxBox.orange.jAzu[1] = jAzu1
    }

    let jOrg0 = wx.getStorageSync('jOrg0')
    if (!jOrg0 || jOrg0.length == 0) {
      this.player.update(1, 0, 0, 1)
      this.player.update(1, 0, 0, 1)
      this.player.update(1, 0, 0, 1)
      this.player.update(1, 3, 0, 1)
      this.player.update(1, 3, 0, 1)
      this.player.update(1, 3, 0, 1)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      this.player.update(1, 3, 2, 1)
      this.render(ctx, playerPxBox.orange.jOrg[0])
      wx.setStorageSync('jOrg0', playerPxBox.orange.jOrg[0])
    } else {
      playerPxBox.orange.jOrg[0] = jOrg0
    }
  }

  render(ctx, arr) {
    // this.drawProgress(ctx)
    this.player.render(ctx)
    this.cache(ctx, arr)
  }

  drawProgress(ctx) {
    ctx.drawImage(
      imageBox.menuImg,
      480, 30, 5, 5, X0, Y0, P_WIDTH, P_HEIGHT
    )
    ctx.drawImage(
      imageBox.menuImg,
      0, 285, 200, 30, X0, Y0, P_WIDTH * this.progress / 100, P_HEIGHT
    )
  }

  cache(ctx, pxArr) {
    let x = this.player.pointX * pixel.value + pixel.p0.x +
      this.player.pic.renderX * this.player.pos - this.player.pic.width * .6
    let y = pixel.p0.y - this.player.pointY * pixel.value + this.player.pic.renderY
    let width = this.player.pic.width * 1.2
    let height = this.player.pic.height * 1.2
    let data = ctx.getImageData(x, y, width, height).data
    let px = pixel.value
    let arr = ''
    let h2 = 0
    for (let i = 0; i < data.length; i += 4 * 3) {
      let actPx = i / 4
      let n = data[i + 3]
      let hh = h2 % 3 == 0
      let hr = actPx % Math.floor(width)
      arr = arr + (n ? '#' : ' ')
      if (n && hh) {
        pxArr.push(Math.floor(hr / 3) + ',' + (h2 / 3 +
          Math.floor(this.player.pic.renderY / 3)))
      }
      if (hr < 3) {
        arr = ''
        h2++
      }
    }
  }

  printAllMap(pxArr) {
    let absArr = this.player.toAbsArr(pxArr, this.player.pointX, this.player.pointY)

    let s1 = new Set(absArr)
    for (let j = pixel.mapHeight - 1; j >= 0; j--) {
      let out = ''
      for (let i = 0; i < pixel.mapWidth; i++) {
        if (s1.has(i + ',' + j)) {
          out = out + 'o'
        } else {
          out = out + ' '
        }
      }
      console.log(out)
    }
  }
}