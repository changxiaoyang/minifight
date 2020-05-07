import DataBus from '../databus'
import Pixel from '../base/pixel'
import ImageBox from '../imagebox'
import PlayerPxBox from './playerpxbox'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const INITIAL_X = 512

let imageBox = new ImageBox()
let databus = new DataBus()
let pixel = new Pixel()
let playerPxBox = new PlayerPxBox()

export default class BasePlayer {
  constructor(img) {
    // imgId 1 橙色 2 蓝色
    this.ccerId = img.id
    this.ccer = img.img
  }
  
  initPosition(x, y) {
    // 在场景中的绝对位置
    this.pointX = x
    this.pointY = y

    this.initVitalSigns()
    this.initMemoryBuffer()

    this.initActionFrame()
    this.initPicInfo()
    this.initAbsArr()
  }

  initPicInfo() {
    this.pic = {
      x: 512,
      y: 0,
      width: 48,
      height: 80,
      // 绘制图画的坐标移动
      renderX: 0,
      renderY: 0,
      pos: 1
    }
  }

  /**
   * 初始化生命体征
   */
  initVitalSigns() {
    this.hp = 100
    this.mp = 10

    this.dead = this.hp <= 0
    // 伤害值
    this.damage = 0
  }

  /**
   * 初始化实体占位信息
   */
  initAbsArr() {
    this.absPxArr = this.toAbsArr(playerPxBox.orange.stand, this.pointX, this.pointY)
    this.absAttPxArr = []
  }

  /**
   * 初始化键盘操作记忆队列
   */
  initMemoryBuffer() {
    this.qSize = 30     // 0.5秒内按出的键可以组合成必杀技
    this.charged = 0    // 蓄力
    this.acQueue = []   // 操作记忆队列
  }

  enemy(other) {
    this.enemy = other
    other.enemy = this
  }

  checkTolerance() {
    return !this.fallUp.isPlaying && !this.footwall.isPlaying && !this.blue.isPlaying
      && !this.orange.isPlaying && !this.azure.isPlaying && !this.slide.isPlaying
  }

  /**
   * 初始化动画帧
   */
  initActionFrame() {
    this.stand = {
      count: 3,
      curFrame: 0,
      picIndexH: 0,
      rX: 0,
      rY: 0,
      picW: 48,
      picH: 82,
      addFrame: 1
    }
    // 蓝色按钮
    this.blue = {
      count: 3,
      isPlaying: false,
      picIndex: 244,
      picIndexH: 83,
      picW: 78,
      picH: 90,
      rX: 0,
      rY: -3.5,
      curFrame: 0
    }
    this.azure = {
      count: 3,
      isPlaying: false,
      picIndexH: 83,
      picW: 68,
      picH: 82,
      rX: 0,
      rY: -3.5,
      curFrame: 0
    }
    this.orange = {
      count: 5,
      isPlaying: false,
      picIndexH: 168,
      picW: 74,
      picH: 86,
      rX: 12,
      rY: -4,
      curFrame: 0
    }
    this.slide = {
      count: 2,
      attHeight: [-30, 30],
      isPlaying: false,
      picIndexH: 1480,
      picIndex: 48,
      picW: 74,
      picH: 56,
      rX: 0,
      rY: 0,
      curFrame: 0
    }
    this.sLeg = {
      count: 4,
      isPlaying: false,
      picIndexH: 442,
      picW: 88,
      picH: 58,
      rX: 0,
      rY: 30,
      curFrame: 0
    }
    //防御
    this.defs = {
      count: 2,
      isPlaying: false,
      picIndexH: 988,
      picW: 58,
      picH: 90,
      rX: 0,
      rY: -5,
      curFrame: 0
    }
    this.sDefs = {
      count: 2,
      isPlaying: false,
      picIndexH: 500,
      picIndex: 238,
      picW: 48,
      picH: 60,
      rX: 0,
      rY: -5,
      curFrame: 0
    }
    this.sOrg = {
      count: 4,
      isPlaying: false,
      picIndexH: 328,
      picW: 54,
      picH: 114,
      rX: 0,
      rY: -40,
      curFrame: 0
    }
    this.sAzu = {
      count: 3,
      isPlaying: false,
      picIndexH: 272,
      picIndex: 100,
      picW: 58,
      picH: 58,
      rX: 0,
      rY: 30,
      curFrame: 0
    }
    this.run = {
      count: 3,
      isPlaying: false,
      picIndex: 150,
      picIndexH: 0,
      picW: 64,
      picH: 80,
      dirc: 1,
      rX: 0,
      rY: 0,
      pos: 0,
      curFrame: 0
    }
    this.leftOrRight = {
      count: 4,
      isPlaying: false,
      pos: 0,
      picIndexH: 731,
      picW: 48,
      picH: 82,
      rX: 0,
      rY: 0,
      curFrame: 0
    }
    this.squat = {
      count: 2,
      defense: false,
      isPlaying: false,
      picIndexH: 252,
      picW: 52,
      picH: 78,
      rX: 0,
      rY: 4,
      curFrame: 0
    }
    this.jump = {
      frameH: [0, 20, 18, 8, -8, -18, -20],
      count: 7,
      isPlaying: false,
      picIndexH: 556,
      picW: 46,
      picH: 100,
      rX: 0,
      rY: -20,
      curFrame: 0
    }
    this.jAzu = {
      count: 2,
      isPlaying: false,
      picIndexH: 826,
      picW: 58,
      picH: 74,
      rX: 0,
      rY: 0,
      curFrame: 0
    }
    this.jBlue = {
      count: 2,
      isPlaying: false,
      picIndexH: 830,
      picIndex: 130,
      picW: 76,
      picH: 68,
      rX: 0,
      rY: 0,
      curFrame: 0
    }
    this.jOrg = {
      count: 3,
      isPlaying: false,
      picIndexH: 898,
      picIndex: 94,
      picW: 58,
      picH: 92,
      rX: 0,
      rY: 0,
      curFrame: 0
    }
    this.rolling = {
      frameH: [0, 20, 12, 4, -4, -12, -20],
      count: 7,
      isPlaying: false,
      picIndexH: 0,
      picIndex: 434,
      dirc: 0,
      picW: 80,
      picH: 96,
      rX: 0,
      rY: -20,
      curFrame: 0
    }

    this.footwall = {
      frameH: [0, -10, 20, 4, -4, 0],
      frameW: [-8, -4, -2, -2, -1, -1],
      count: 6,
      isPlaying: false,
      picIndexH: 1028,
      picIndex: 224,
      dirc: 0,
      picW: 78,
      picH: 64,
      rX: 0,
      rY: 0,
      pos: 0,
      curFrame: 0
    }
    this.hanging = {
      count: 3,
      isPlaying: false,
      picIndexH: 946,
      picIndex: 248,
      picW: 48,
      picH: 84,
      rX: 0,
      rY: 0,
      pos: 0,
      curFrame: 0
    }
    //翻跟头起来
    this.fallUp = {
      frameH: [0, -10, 20],
      count: 3,
      isPlaying: false,
      picIndexH: 1092,
      picIndex: 246,
      dirc: 0,
      picW: 54,
      picH: 102,
      rX: 0,
      rY: -30,
      pos: 0,
      curFrame: 0
    }

  }

  /**
   * 更新状态
   */
  update(frequency, dirc, att, pos) {
    if (this.footwall.isPlaying) {
      this.updateBeinjured(frequency)
      return
    }
    if (this.dead) return
    if (this.hanging.isPlaying) {
      this.updateHanging(frequency)
      return
    }
    if (this.fallUp.isPlaying) {
      this.updateFallUp(frequency)
      return
    }

    if (this.blue.isPlaying) {
      this.updateBlue(frequency)
      return
    }
    if (this.azure.isPlaying) {
      this.updateAzure(frequency)
      return
    }
    if (this.orange.isPlaying) {
      this.updateOrange(frequency)
      return
    }
    switch (att) {
      case 1:
        this.clearQueue()
        this.updateAzure(frequency)
        break
      case 2:
        this.clearQueue()
        this.updateOrange(frequency)
        break
      case 3:
        this.clearQueue()
        this.updateBlue(frequency)
        break
      default:
        this.pic.pos = pos
        this.pushQueue(dirc)
        this.updateMove(frequency, dirc)
        break
    }
  }

  /**
   * 移动动画
   */
  updateMove(frequency, dirc) {
    if (this.jump.isPlaying) {
      this.clearQueue()
      this.updateJump(frequency)
      return
    }
    if (this.rolling.isPlaying) {
      this.clearQueue()
      this.updateRolling(frequency, this.rolling.dirc)
      return
    }
    switch (dirc) {
      case 1:
        this.resetSquat()
        this.leftOrRight.pos = -1
        this.updateLR(frequency, this.leftOrRight.pos)
        break
      case 2:
        this.resetSquat()
        this.rolling.dirc = -1
        this.run.isPlaying = false
        this.run.curFrame = 0
        this.updateRolling(frequency, this.rolling.dirc)
        break
      case 3:
        this.resetSquat()
        this.run.isPlaying = false
        this.run.curFrame = 0
        this.updateJump(frequency)
        break
      case 4:
        this.resetSquat()
        this.rolling.dirc = 1
        this.run.isPlaying = false
        this.run.curFrame = 0
        this.updateRolling(frequency, this.rolling.dirc)
        break
      case 5:
        this.resetSquat()
        this.leftOrRight.pos = 1
        this.updateLR(frequency, this.leftOrRight.pos)
        break
      case 6:
        this.run.isPlaying = false
        this.run.curFrame = 0
        this.updateSquat(frequency, false)
        break
      case 7:
        this.run.isPlaying = false
        this.run.curFrame = 0
        this.updateSquat(frequency, false)
        break
      case 8:
        this.run.isPlaying = false
        this.run.curFrame = 0
        this.updateSquat(frequency, true)
        break
      default:
        this.resetSquat()
        this.run.curFrame = 0
        this.run.isPlaying = false
        this.updateStand(frequency)
        break
    }
  }

  /**
   * 下蹲
   */
  updateSquat(frequency, def) {
    this.squat.defense = def
    this.initActionPic(this.squat)
    this.squat.isPlaying = true
    if (this.squat.curFrame < frequency) {
      this.pic.x = INITIAL_X
    } else {
      this.pic.x = INITIAL_X + this.pic.pos * this.pic.width
    }
    this.squat.curFrame++
  }

  resetSquat() {
    this.squat.curFrame = 0
    this.squat.isPlaying = false
  }

  updateJump(frequency) {
    let frc = frequency
    this.initActionPic(this.jump)
    this.jump.isPlaying = true
    let cor = Math.floor(this.jump.curFrame / frc)
    let frm = cor
    if (cor > 3) {
      cor = this.jump.count - cor - 1
    }
    if (this.jump.curFrame % frc == 0) {
      this.pointY += this.jump.frameH[frm]
    }
    this.pic.x = INITIAL_X + this.pic.pos * this.pic.width * cor
    this.jump.curFrame++
    if (this.jump.curFrame === this.jump.count * frc) {
      this.jump.curFrame = 0
      this.jump.isPlaying = false
    }
  }

  updateRolling(frequency, dirc) {
    let frc = frequency
    this.initActionPic(this.rolling)
    this.rolling.isPlaying = true
    let cor = Math.floor(this.rolling.curFrame / frc)
    //后翻
    if ((this.pic.pos > 0 && dirc < 0) || (this.pic.pos < 0 && dirc > 0)) {
      this.pic.y = this.pic.height * (this.rolling.count - cor - 1)
    } else {
      this.pic.y = this.pic.height * cor
    }

    this.pic.x = INITIAL_X + this.pic.pos * this.rolling.picIndex

    if (this.rolling.curFrame % frc == 0 && this.rolling.curFrame !== 0) {
      this.pointY += this.rolling.frameH[cor]
      if (this.canMove(dirc))
        this.pointX += dirc * 4
    }
    this.rolling.curFrame++
    if (this.rolling.curFrame === this.rolling.count * frc) {
      this.rolling.curFrame = 0
      this.rolling.isPlaying = false
    }
  }

  /**
   * 设置相关动作的图形属性
   */
  initActionPic(action) {
    this.pic.renderX = action.rX
    this.pic.renderY = action.rY
    this.pic.height = action.picH
    this.pic.width = action.picW
    this.pic.y = action.picIndexH
  }

  /**
   * 连续两次前进 人物跑起来
   */
  updateRun(frequency, dirc) {
    this.clearQueue()
    let frc = frequency
    this.initActionPic(this.run)
    if (this.run.pos == 0) {
      this.run.pos = this.pic.pos
    }
    this.pic.pos = this.run.pos
    this.run.dirc = dirc
    this.run.isPlaying = true
    let cor = Math.floor(this.run.curFrame / frc)
    if (this.run.curFrame % frc == 0) {
      this.charged++
      this.pic.x = INITIAL_X + this.run.pos * this.run.picIndex +
        this.run.pos * this.pic.width * cor
      let arr = this.pic.pos > 0 ? playerPxBox.orange.run[cor] :
        this.reversePx(playerPxBox.orange.run[cor], this.pic.width)
      if (this.moveable(dirc, arr, 6)) {
        this.pointX += dirc * 6
        this.absPxArr = this.absPxArrFuture
      } else {
        this.absPxArr = this.toAbsArr(arr, this.pointX, this.pointY)
      }
    }
    this.run.curFrame++
    if (this.run.curFrame === this.run.count * frc
      || this.run.curFrame === -this.run.count * frc) {
      this.run.curFrame = 0
    }
  }

  /**
   * 左移， this.pic.pos == -1  前进 +1 后退
   */
  updateLR(frequency, dirc) {
    let frc = frequency
    if (this.run.isPlaying ||
      (this.lastAction([5, 0]) && dirc > 0 && this.pic.pos > 0) ||
      (this.lastAction([1, 0]) && dirc < 0 && this.pic.pos < 0)) {
      this.updateRun(frequency, dirc)
      return
    }
    this.charged = 0
    this.run.pos = 0
    this.initActionPic(this.leftOrRight)
    let cor = Math.floor(this.leftOrRight.curFrame / frc)
    let arr = this.pic.pos > 0 ? playerPxBox.orange.move :
      this.reversePx(playerPxBox.orange.move, this.pic.width)
    // 前进
    if (dirc * this.pic.pos === 1) {
      if (this.leftOrRight.curFrame % frc == 0) {
        this.pic.x = INITIAL_X + this.pic.pos * this.pic.width * cor
        if (this.moveable(dirc, arr, 4)) {
          this.pointX += dirc * 4
          this.absPxArr = this.absPxArrFuture
        } else {
          this.absPxArr = this.toAbsArr(arr, this.pointX, this.pointY)
        }
      }
    }
    //后退
    if (dirc * this.pic.pos === -1) {
      if (this.leftOrRight.curFrame % frc == 0) {
        this.pic.x = INITIAL_X + this.pic.pos * this.pic.width * (this.leftOrRight.count - cor - 1)
        if (this.moveable(dirc, arr, 4)) {
          this.pointX += dirc * 4
          this.absPxArr = this.absPxArrFuture
        } else {
          this.absPxArr = this.toAbsArr(arr, this.pointX, this.pointY)
        }
      }
    }

    this.leftOrRight.curFrame++
    //动画完成
    if (this.leftOrRight.curFrame === this.leftOrRight.count * frc
      || this.leftOrRight.curFrame === -this.leftOrRight.count * frc) {
      this.leftOrRight.curFrame = 0
    }
  }

  canMove(dirc) {
    return !(this.pointX < 1 && dirc < 0) && !(this.pointX > pixel.mapWidth && dirc > 0)
  }

  /**
   * @param speed 每个动作移动的距离
   */
  moveable(dirc, arr, speed) {
    let future = this.pointX + speed * dirc
    if (future < 0 || future > pixel.mapWidth)
      return false

    this.absPxArrFuture = this.toAbsArr(arr, future, this.pointY)
    return this.intersect(this.absPxArrFuture, this.enemy.absPxArr).length === 0
  }

  /**
   * 位置检测，自动错开
   */
  tolerance(arr1, arr2) {
    if (this.intersect(arr1, arr2).length > 0) {
      if (this.canMove(this.pic.pos * -1)) {
        this.pointX -= this.pic.pos
      }
      if (this.canMove(this.enemy.pic.pos * -1)) {
        this.pointX -= this.pic.pos
      }
    }
  }

  /**
   * 蓝色按钮动画 踢腿
   */
  updateBlue(frequency) {
    let frc = frequency
    this.blue.isPlaying = true
    if (this.run.isPlaying || this.slide.isPlaying) {
      this.updateSlide(frequency, 1)
      return
    }
    if (this.squat.isPlaying || this.sLeg.isPlaying) {
      this.updateSLeg(frequency)
      return
    }
    if (this.jump.isPlaying) {
      this.updateJump(frc)
      if (this.jBlue.isPlaying ||
        (this.jump.curFrame > 0 * frc && this.jump.curFrame < 5 * frc)) {
        this.updateJBlue(frc)
      } else {
        this.blue.isPlaying = false
      }
      return
    }
    if (this.rolling.isPlaying) {
      this.updateRolling(frc, this.rolling.dirc)
      if (this.jBlue.isPlaying ||
        (this.rolling.curFrame > 0 * frc && this.rolling.curFrame < 5 * frc)) {
        this.updateJBlue(frc)
      } else {
        this.blue.isPlaying = false
      }
      return
    }
    this.initActionPic(this.blue)
    let cor = Math.floor(this.blue.curFrame / frc)
    if (this.blue.curFrame % frc == 0) {
      if (cor === 2) {
        cor = 0
      }
      this.pic.x = INITIAL_X + this.pic.pos * this.blue.picIndex +
        this.pic.pos * this.pic.width * cor
      this.damage = 5
      let arr = this.pic.pos > 0 ? playerPxBox.orange.blue[cor] :
        this.reversePx(playerPxBox.orange.blue[cor], this.pic.width)
      this.absPxArr = this.toAbsArr(arr, this.pointX, this.pointY)
      let attArr = this.pic.pos > 0 ? playerPxBox.orangeAtt.blue[cor] :
        this.reversePx(playerPxBox.orangeAtt.blue[cor], this.pic.width)
      this.absAttPxArr = this.toAbsArr(attArr, this.pointX, this.pointY)
    }

    this.blue.curFrame++
    //动画完成
    if (this.blue.curFrame === this.blue.count * frc) {
      this.blue.isPlaying = false
      this.blue.curFrame = 0
      this.absAttPxArr = []
    }
  }

  updateJOrg(frequency) {
    let frc = frequency
    this.jOrg.isPlaying = true
    this.initActionPic(this.jOrg)
    let cor = Math.floor(this.jOrg.curFrame / frc)
    if (this.jOrg.curFrame % frc === 0) {
      let arr = this.pic.pos > 0 ? playerPxBox.orange.jOrg[0] :
        this.reversePx(playerPxBox.orange.jOrg[0], this.pic.width)
      this.absPxArr = this.toAbsArr(arr, this.pointX, this.pointY)
      this.damage = 5
      let attArr = this.pic.pos > 0 ? playerPxBox.orangeAtt.jOrg[0] :
        this.reversePx(playerPxBox.orangeAtt.jOrg[0], this.pic.width)
      this.absAttPxArr = this.toAbsArr(attArr, this.pointX, this.pointY)
    }
    this.pic.x = INITIAL_X + this.pic.pos * this.jOrg.picIndex
    this.jOrg.curFrame++
    //动画完成
    if (this.jOrg.curFrame === this.jOrg.count * frc) {
      this.jOrg.isPlaying = false
      this.jOrg.curFrame = 0
      this.orange.isPlaying = false
      this.absAttPxArr = []
    }
  }

  /**
   * 橙色 重腿
   */
  updateOrange(frequency) {
    let frc = frequency
    this.orange.isPlaying = true
    if (this.run.isPlaying || this.slide.isPlaying) {
      this.updateSlide(frequency, 0)
      return
    }
    if (this.squat.isPlaying || this.sOrg.isPlaying) {
      this.updateSOrg(frequency)
      return
    }
    if (this.jump.isPlaying) {
      this.updateJump(frc)
      if (this.jOrg.isPlaying ||
        (this.jump.curFrame > 0 * frc && this.jump.curFrame < 5 * frc)) {
        this.updateJOrg(frc)
      } else {
        this.orange.isPlaying = false
      }
      return
    }
    if (this.rolling.isPlaying) {
      this.updateRolling(frc, this.rolling.dirc)
      if (this.jOrg.isPlaying ||
        (this.rolling.curFrame > 0 * frc && this.rolling.curFrame < 5 * frc)) {
        this.updateJOrg(frc)
      } else {
        this.orange.isPlaying = false
      }
      return
    }
    this.initActionPic(this.orange)
    let cor = Math.floor(this.orange.curFrame / frc)
    this.pic.x = INITIAL_X + this.pic.pos * this.pic.width * cor
    if (this.orange.curFrame % frc == 0) {
      let arr = this.pic.pos > 0 ? playerPxBox.orange.orange[cor] :
        this.reversePx(playerPxBox.orange.orange[cor], this.pic.width)
      this.absPxArr = this.toAbsArr(arr, this.pointX, this.pointY)
      this.damage = 10
      let attArr = this.pic.pos > 0 ? playerPxBox.orangeAtt.orange[cor] :
        this.reversePx(playerPxBox.orangeAtt.orange[cor], this.pic.width)
      this.absAttPxArr = this.toAbsArr(attArr, this.pointX, this.pointY)
    }
    this.orange.curFrame++
    //动画完成
    if (this.orange.curFrame === this.orange.count * frc) {
      this.orange.isPlaying = false
      this.orange.curFrame = 0
      this.absAttPxArr = []
    }
  }


  /**
   * 蹲下上拳头
   */
  updateSOrg(frequency) {
    let frc = frequency
    this.sOrg.isPlaying = true
    this.initActionPic(this.sOrg)
    let cor = Math.floor(this.sOrg.curFrame / frc)
    if (this.sOrg.curFrame % frc == 0) {
      if (cor === 3) {
        cor = 0
      }
      let arr = this.pic.pos > 0 ? playerPxBox.orange.sOrg[cor] :
        this.reversePx(playerPxBox.orange.sOrg[cor], this.pic.width)
      this.absPxArr = this.toAbsArr(arr, this.pointX, this.pointY)
      this.damage = 9
      let attArr = this.pic.pos > 0 ? playerPxBox.orangeAtt.sOrg[cor] :
        this.reversePx(playerPxBox.orangeAtt.sOrg[cor], this.pic.width)
      this.absAttPxArr = this.toAbsArr(attArr, this.pointX, this.pointY)
      this.pic.x = INITIAL_X + this.pic.pos * this.pic.width * cor
    }
    this.sOrg.curFrame++
    //动画完成
    if (this.sOrg.curFrame === this.sOrg.count * frc) {
      this.sOrg.isPlaying = false
      this.sOrg.curFrame = 0
      this.orange.isPlaying = false
      this.absAttPxArr = []
    }
  }

  /**
   * 被打
   */
  updateUnderAtt(power, frc) {
    if (this.hp > power) {
      this.hp -= power
      if (power > 5) {
        this.updateBeinjured(frc)
      } else {
        this.updateHanging(frc)
      }
    } else {
      this.hp = 0
      this.updateBeinjured(frc)
      this.dead = true
    }
    if (this.mp < 100) {
      this.mp += 10
    }
  }

  /**
   * 上盘被攻击，会被连续击打
   */
  updateHanging(frequency) {
    let frc = frequency
    this.absPxArr = []
    this.absAttPxArr = []
    this.initActionPic(this.hanging)
    this.hanging.isPlaying = true
    let cor = Math.floor(this.hanging.curFrame / frc)
    if (cor >= 2) {
      cor = cor - 2
    }
    this.pic.x = INITIAL_X + this.pic.pos * this.pic.width * cor +
      this.hanging.picIndex * this.pic.pos

    if (this.hanging.curFrame % frc == 0 && this.moveable(this.hanging.pos, [], 1)) {
      this.pointX -= this.pic.pos
    }
    this.hanging.curFrame++
    if (this.hanging.curFrame === this.hanging.count * frc) {
      this.hanging.isPlaying = false
      this.hanging.curFrame = 0
    }
  }

  /**
   * 下盘被攻击或被重击，倒地
   */
  updateBeinjured(frequency) {
    let frc = frequency
    this.absPxArr = []
    this.absAttPxArr = []
    this.initActionPic(this.footwall)
    this.footwall.isPlaying = true
    if (this.footwall.pos == 0) {
      this.footwall.pos = this.pic.pos
    }
    let stopCur = false
    let cor = Math.floor(this.footwall.curFrame / frc)
    if (cor == 2 && this.pointY > 30) {
      this.jump.isPlaying = false
      this.jump.curFrame = 0
      this.rolling.isPlaying = false
      this.rolling.curFrame = 0
      this.pointY--
      stopCur = true
    }
    if (cor >= 3) {
      cor = cor - 2
    }
    if (cor >= 3) {
      cor = 2
    }
    this.pic.x = INITIAL_X + this.footwall.pos * this.pic.width * cor +
      this.footwall.picIndex * this.footwall.pos

    this.pic.renderY += this.footwall.frameH[cor]

    if (this.footwall.curFrame % frc == 0 && this.moveable(this.footwall.pos, [],
      this.footwall.frameW[cor])) {
      this.pointX += this.footwall.pos * this.footwall.frameW[cor]
    }
    if (!stopCur)
      this.footwall.curFrame++
    if (this.footwall.curFrame === this.footwall.count * frc) {
      this.footwall.isPlaying = false
      this.footwall.curFrame = 0
      this.fallUp.isPlaying = true
      this.footwall.pos = 0
    }
  }

  /**
   * 被击倒后起身
   */
  updateFallUp(frequency) {
    let frc = frequency
    this.absPxArr = []
    this.absAttPxArr = []
    this.initActionPic(this.fallUp)
    this.fallUp.isPlaying = true
    if (this.fallUp.pos == 0) {
      this.fallUp.pos = this.pic.pos
    }
    let cor = Math.floor(this.fallUp.curFrame / frc)
    this.pic.x = INITIAL_X + this.fallUp.pos * this.pic.width * cor +
      this.fallUp.picIndex * this.fallUp.pos

    if (this.fallUp.curFrame % frc == 0 && this.moveable(this.fallUp.pos, [], -2)) {
      this.pointX += this.fallUp.pos * -2
    }
    this.fallUp.curFrame++
    if (this.fallUp.curFrame === this.fallUp.count * frc) {
      this.fallUp.isPlaying = false
      this.fallUp.curFrame = 0
    }
  }

  /**
   * 滑踢
   */
  updateSlide(frequency, h) {
    let frc = frequency
    this.run.isPlaying = false
    this.slide.isPlaying = true
    this.initActionPic(this.slide)
    this.pic.x = INITIAL_X + this.slide.picIndex * this.run.pos
    this.pic.renderY = this.slide.attHeight[h]
    if (this.slide.curFrame % frc === 0) {
      let arr = this.run.pos > 0 ? playerPxBox.orange.slide[0] :
        this.reversePx(playerPxBox.orange.slide[0], this.pic.width)
      this.absPxArr = this.toAbsArr(arr, this.pointX, this.pointY)
      this.damage = (h == 1) ? 9 : 10
      let attArr = this.pic.pos > 0 ? playerPxBox.orangeAtt.slide[0] :
        this.reversePx(playerPxBox.orangeAtt.slide[0], this.pic.width)
      this.absAttPxArr = this.toAbsArr(attArr, this.pointX, this.pointY)
      if (this.canMove(this.run.dirc)) {
        this.pointX += 6 * this.run.dirc
      }
    }
    this.slide.curFrame++
    if (this.slide.curFrame === (this.slide.count + this.charged) * frc) {
      this.slide.isPlaying = false
      this.orange.isPlaying = false
      this.blue.isPlaying = false
      this.slide.curFrame = 0
      this.absAttPxArr = []
    }
  }

  /**
   * 蹲下出拳
   */
  updateSAzu(frequency) {
    let frc = frequency
    this.sAzu.isPlaying = true
    this.initActionPic(this.sAzu)
    let cor = Math.floor(this.sAzu.curFrame / frc)
    if (this.sAzu.curFrame % frc == 0) {
      let arr = this.pic.pos > 0 ? playerPxBox.orange.sAzu[cor] :
        this.reversePx(playerPxBox.orange.sAzu[cor], this.pic.width)
      this.absPxArr = this.toAbsArr(arr, this.pointX, this.pointY)
      this.damage = 5
      let attArr = this.pic.pos > 0 ? playerPxBox.orangeAtt.sAzu[cor] :
        this.reversePx(playerPxBox.orangeAtt.sAzu[cor], this.pic.width)
      this.absAttPxArr = this.toAbsArr(attArr, this.pointX, this.pointY)
      this.pic.x = INITIAL_X + this.pic.pos * this.pic.width * cor +
        this.sAzu.picIndex * this.pic.pos
    }
    this.sAzu.curFrame++
    //动画完成
    if (this.sAzu.curFrame === this.sAzu.count * frc) {
      this.sAzu.isPlaying = false
      this.sAzu.curFrame = 0
      this.azure.isPlaying = false
      this.absAttPxArr = []
    }
  }

  /**
   * 蹲下踢腿
   */
  updateSLeg(frequency) {
    let frc = frequency
    this.sLeg.isPlaying = true
    this.initActionPic(this.sLeg)
    let cor = Math.floor(this.sLeg.curFrame / frc)
    if (this.sLeg.curFrame % frc == 0) {
      if (cor === 3) {
        cor = 0
      }
      let arr = this.pic.pos > 0 ? playerPxBox.orange.sLeg[cor] :
        this.reversePx(playerPxBox.orange.sLeg[cor], this.pic.width)
      this.absPxArr = this.toAbsArr(arr, this.pointX, this.pointY)
      this.damage = 7
      let attArr = this.pic.pos > 0 ? playerPxBox.orangeAtt.sLeg[cor] :
        this.reversePx(playerPxBox.orangeAtt.sLeg[cor], this.pic.width)
      this.absAttPxArr = this.toAbsArr(attArr, this.pointX, this.pointY)
      this.pic.x = INITIAL_X + this.pic.pos * this.pic.width * cor
    }
    this.sLeg.curFrame++
    //动画完成
    if (this.sLeg.curFrame === this.sLeg.count * frc) {
      this.sLeg.isPlaying = false
      this.sLeg.curFrame = 0
      this.blue.isPlaying = false
      this.absAttPxArr = []
    }
  }

  /**
   * 空中出拳
   */
  updateJAzu(frequency) {
    let frc = frequency
    this.jAzu.isPlaying = true
    this.initActionPic(this.jAzu)
    let cor = Math.floor(this.jAzu.curFrame / frc)
    if (this.jAzu.curFrame % frc === 0) {
      let arr = this.pic.pos > 0 ? playerPxBox.orange.jAzu[1] :
        this.reversePx(playerPxBox.orange.jAzu[1], this.pic.width)
      this.absPxArr = this.toAbsArr(arr, this.pointX, this.pointY)
      this.damage = 5
      let attArr = this.pic.pos > 0 ? playerPxBox.orangeAtt.jAzu[1] :
        this.reversePx(playerPxBox.orangeAtt.jAzu[1], this.pic.width)
      this.absAttPxArr = this.toAbsArr(attArr, this.pointX, this.pointY)
    }
    this.pic.x = INITIAL_X + this.pic.pos * this.pic.width
    this.jAzu.curFrame++
    //动画完成
    if (this.jAzu.curFrame === this.jAzu.count * frc) {
      this.jAzu.isPlaying = false
      this.jAzu.curFrame = 0
      this.azure.isPlaying = false
      this.absAttPxArr = []
    }
  }


  /**
   * 空中踢腿
   */
  updateJBlue(frequency) {
    let frc = frequency
    this.jBlue.isPlaying = true
    this.initActionPic(this.jBlue)
    if (this.jBlue.curFrame % frc === 0) {
      let arr = this.pic.pos > 0 ? playerPxBox.orange.jBlue[1] :
        this.reversePx(playerPxBox.orange.jBlue[1], this.pic.width)
      this.absPxArr = this.toAbsArr(arr, this.pointX, this.pointY)
      this.damage = 5
      let attArr = this.pic.pos > 0 ? playerPxBox.orangeAtt.jBlue[1] :
        this.reversePx(playerPxBox.orangeAtt.jBlue[1], this.pic.width)
      this.absAttPxArr = this.toAbsArr(attArr, this.pointX, this.pointY)
    }
    this.pic.x = INITIAL_X + this.pic.pos * this.pic.width +
      this.pic.pos * this.jBlue.picIndex
    this.jBlue.curFrame++
    //动画完成
    if (this.jBlue.curFrame === this.jBlue.count * frc) {
      this.jBlue.isPlaying = false
      this.jBlue.curFrame = 0
      this.blue.isPlaying = false
      this.absAttPxArr = []
    }
  }


  /**
   * 第一个按钮 出拳
   */
  updateAzure(frequency) {
    let frc = frequency
    this.azure.isPlaying = true
    if (this.squat.isPlaying || this.sAzu.isPlaying) {
      this.updateSAzu(frequency)
      return
    }
    if (this.jump.isPlaying) {
      this.updateJump(frc)
      if (this.jAzu.isPlaying ||
        (this.jump.curFrame > 2 * frc && this.jump.curFrame < 5 * frc)) {
        this.updateJAzu(frc)
      } else {
        this.azure.isPlaying = false
      }
      return
    }
    if (this.rolling.isPlaying) {
      this.updateRolling(frc, this.rolling.dirc)
      if (this.jAzu.isPlaying ||
        (this.rolling.curFrame > 2 * frc && this.rolling.curFrame < 5 * frc)) {
        this.updateJAzu(frc)
      } else {
        this.azure.isPlaying = false
      }
      return
    }
    this.initActionPic(this.azure)
    let cor = Math.floor(this.azure.curFrame / frc)
    if (this.azure.curFrame % frc == 0) {
      if (cor === 2) {
        cor = 0
      }
      let arr = this.pic.pos > 0 ? playerPxBox.orange.azure[cor] :
        this.reversePx(playerPxBox.orange.azure[cor], this.pic.width)
      this.absPxArr = this.toAbsArr(arr, this.pointX, this.pointY)
      this.damage = 5
      let attArr = this.pic.pos > 0 ? playerPxBox.orangeAtt.azure[cor] :
        this.reversePx(playerPxBox.orangeAtt.azure[cor], this.pic.width)
      this.absAttPxArr = this.toAbsArr(attArr, this.pointX, this.pointY)
      this.pic.x = INITIAL_X + this.pic.pos * this.pic.width * cor
    }

    this.azure.curFrame++
    //动画完成
    if (this.azure.curFrame === this.azure.count * frc) {
      this.azure.isPlaying = false
      this.azure.curFrame = 0
      this.absAttPxArr = []
    }
  }

  /**
   * 防御动画
   */
  updateDefense(frequency) {
    if (this.squat.isPlaying) {
      //蹲防
      this.initActionPic(this.sDefs)
      this.sDefs.isPlaying = true
      this.pic.x = INITIAL_X + this.pic.pos * this.sDefs.picIndex
    } else {
      // 站防
      this.initActionPic(this.defs)
      this.defs.isPlaying = true
      this.pic.x = INITIAL_X
    }
  }

  /**
   * 站立动画
   */
  updateStand(frequency) {
    this.initActionPic(this.stand)
    if (this.stand.curFrame === this.stand.count * frequency - 1) {
      this.stand.addFrame = -1
    }
    if (this.stand.curFrame === 0) {
      this.stand.addFrame = 1
    }
    let arr = this.pic.pos > 0 ? playerPxBox.orange.stand :
      this.reversePx(playerPxBox.orange.stand, this.pic.width)
    this.absPxArr = this.toAbsArr(arr, this.pointX, this.pointY)
    this.pic.x = INITIAL_X +
      this.pic.pos * this.pic.width * Math.floor(this.stand.curFrame / frequency)
    this.pic.y = 0
    this.charged = 0
    this.stand.curFrame += this.stand.addFrame
  }

  position(other) {
    return this.pointX < other.pointX ? 1 : -1;
  }

  /**
   * 队列添加操作缓存
   */
  pushQueue(item) {
    if (this.acQueue.length == this.qSize) {
      this.acQueue.shift()
    }
    this.acQueue.push(item)
  }

  /**
   * 有动作之后清空队列
   */
  clearQueue() {
    this.acQueue = []
  }

  /**
   * 攻击检测
   */
  attCheck() {
    let a1 = 0
    let a2 = 0
    if (this.intersect(this.absAttPxArr, this.enemy.absPxArr).length > 0)
      a1 = this.damage
    if (this.intersect(this.absPxArr, this.enemy.absAttPxArr).length > 0)
      a2 = this.enemy.damage
    return [a1, a2]
  }

  /**
   * 防御状态
   */
  defense(dirc) {
    if ((this.pic.pos < 0 && (dirc == 5 || dirc == 6)) ||
      (this.pic.pos > 0 && (dirc == 1 || dirc == 8))) {
      return !this.orange.isPlaying && !this.blue.isPlaying && !this.azure.isPlaying &&
        !this.rolling.isPlaying && !this.jump.isPlaying && !this.footwall.isPlaying &&
        !this.fallUp.isPlaying && !this.hanging.isPlaying
    }
    return false
  }

  /**
   * 求交集
   */
  intersect(a, b) {
    let set1 = new Set(a), set2 = new Set(b)
    return [...new Set([...set1].filter(x => set2.has(x)))]
  }

  /**
   * 判断最近的动作，做连续技、必杀技判定
   */
  lastAction(arr) {
    let acLength = this.acQueue.length
    if (acLength < 2 || arr.length < 2) return false
    let cur = arr.pop()
    if (this.acQueue[acLength - 2] !== cur) {
      return false
    }
    for (let i = acLength - 2; i >= 0; i--) {
      if (this.acQueue[i] !== cur) {
        if (arr.length == 0)
          return false
        cur = arr.pop()
        if (this.acQueue[i] !== cur) {
          return false
        }
        if (arr.length == 0)
          return true
      }
    }
    if (arr.length > 0) {
      return false
    }
  }

  /**
   * 绘制图画
   */
  render(ctx) {
    let x
    if (this.pic.pos < 0)
      x = this.pic.x - this.pic.width
    else
      x = this.pic.x
    ctx.drawImage(
      this.ccer,
      x, this.pic.y, this.pic.width, this.pic.height,
      this.pointX * pixel.value + pixel.p0.x +
      this.pic.renderX * this.pic.pos - this.pic.width * .6,
      pixel.p0.y - this.pointY * pixel.value + this.pic.renderY,
      this.pic.width * 1.2, this.pic.height * 1.2
    )
  }

  /**
   * 像素取反
   */
  reversePx(arr, width) {
    // 取中点
    let pxW = Math.floor(width / 3)
    let resArr = []
    for (let i = 0; i < arr.length; i++) {
      let po = arr[i].split(',')
      let xp = parseInt(po[0])
      let yp = parseInt(po[1])
      resArr.push((pxW - xp - 1) + ',' + yp)
    }
    return resArr
  }

  /**
   * 根据相对坐标 转为绝对坐标
   */
  toAbsArr(arr, pointX, pointY) {
    let psx = Math.floor(Math.floor(this.pic.width / 3) / 2)
    let absArr = []
    for (let i = 0; i < arr.length; i++) {
      let po = arr[i].split(',')
      let xp = parseInt(po[0])
      let yp = parseInt(po[1])
      let absX = pointX + xp - psx
      let absY = pointY - yp
      absArr.push(absX + ',' + absY)
    }
    return absArr
  }

  /**
   * 打印当前地图
   */
  printMapPx() {
    console.log(this.pointX)
    console.log(this.enemy.pointX)
    let s1 = new Set(this.absPxArr)
    let s2 = new Set(this.enemy.absPxArr)
    for (let j = pixel.mapHeight - 1; j >= 0; j--) {
      let out = ''
      for (let i = 0; i < pixel.mapWidth; i++) {
        if (s1.has(i + ',' + j) || s2.has(i + ',' + j)) {
          out = out + 'o'
        } else {
          out = out + ' '
        }
      }
      console.log(out)
    }
  }
}