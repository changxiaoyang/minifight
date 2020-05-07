import DataBus from '../databus'
import Pixel from '../base/pixel'
import ImageBox from '../imagebox'
import PlayerPxBox from './playerpxbox'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const INITIAL_GX = 512

let imageBox = new ImageBox()
let databus = new DataBus()
let pixel = new Pixel()
let playerPxBox = new PlayerPxBox()

export default class GirlPlayer {
  constructor(x, y, img) {
    // imgId 1 橙色 2 蓝色 3 红色
    this.ccerId = img.id
    this.ccer = img.img

    this.frequency = 10

    // 在场景中的绝对位置
    this.pointX = x
    this.pointY = y

    this.pos = 1

    this.jumpHeight = [0, 0, 20, 8, 0, -8, -20, 0, 0]
    
    this.initVitalSigns()
    this.initMemoryBuffer()
    this.initActionFrame()
    this.initPicInfo()
  }

  initActionFrame() {
    this.stand = {
      picX: [0, 46, 87, 46],
      picY: [0, 0, 0, 0],
      picW: [45, 42, 42, 42],
      picH: [87, 87, 87, 87],
      renderX: [0, 5, 6, 5],
      renderY: [0, 0, 0, 0],
      frame: 0,
      count: 4
    }
    this.jump = {
      isPlaying: false,
      picX: [0, 48, 89, 131, 131, 131, 89,  0],
      picY: [87, 87, 87, 87, 87, 87, 87, 87],
      picW: [48, 41, 43, 43, 43, 43, 43, 48],
      picH: [103, 103, 103, 103, 103, 103, 103, 103],
      renderX: [2, 2, 2, 2, 2, 2, 2, 2],
      renderY: [-20, -20, -20, -20, -20, -20, -20, -20],
      frame: 0,
      count: 8
    }
    this.rolling = {
      dirc: 1,
      isPlaying: false,
      picX: [0, 0, 57, 115, 154, 0, 122, 0],
      picY: [87, 1020, 1020, 1020, 1005, 1080, 1080, 87],
      picW: [48, 57, 58, 40, 67, 82, 38, 48],
      picH: [103, 60, 60, 60, 58, 60, 60, 103],
      renderX: [2, 2, 2, 2, 2, 2, 2, 2],
      renderY: [-20, -20, -20, -20, -20, -20, -20, -20],
      step: [0, 5, 5, 5, 5, 5, 5, 0],
      frame: 0,
      count: 8
    }
    this.moveB = {
      dirc: 1,
      isPlaying: false,
      picX: [0, 60, 112, 163, 218, 266],
      picY: [1597, 1597, 1597, 1597, 1597, 1597],
      picW: [60, 52, 51, 55, 48, 50],
      picH: [84, 86, 86, 86, 86, 86],
      renderX: [2, 2, 0, 0, 2, 7],
      renderY: [4, 2, 2, 2, 2, 2],
      step: [3, 1, 1, 2, 4, 6],
      frame: 0,
      count: 6
    }
    this.moveF = {
      dirc: 1,
      isPlaying: false,
      picX: [0, 60, 112, 163, 218, 266],
      picY: [1597, 1597, 1597, 1597, 1597, 1597],
      picW: [60, 52, 51, 55, 48, 50],
      picH: [84, 86, 86, 86, 86, 86],
      renderX: [4, 7, 10, 12, 11, 12],
      renderY: [4, 2, 2, 2, 2, 2],
      step: [3, 3, 3, 3, 3, 3],
      frame: 0,
      count: 6
    }
    this.squat = {
      reday: false,
      isPlaying: false,
      picX: [134, 185],
      picY: [0, 0],
      picW: [51, 50],
      picH: [87, 87],
      renderX: [4, 11],
      renderY: [0, 0],
      frame: 0,
      count: 2
    }
    this.fist = {
      isPlaying: false,
      picX: [0, 45, 94, 45],
      picY: [190, 190, 190, 190],
      picW: [45, 49, 98, 45],
      picH: [84, 84, 84, 84],
      renderX: [6, 6, 28, 6],
      renderY: [2, 2, 2, 2],
      frame: 0,
      count: 4
    }
    this.sFist = {
      isPlaying: false,
      picX: [40, 84, 40],
      picY: [454, 454, 454],
      picW: [44, 60, 44],
      picH: [64, 64, 64],
      renderX: [16, 28, 16],
      renderY: [28, 28, 28],
      frame: 0,
      count: 3
    }
    this.jFist = {
      type: '',
      isPlaying: false,
      picX: [0, 47, 0],
      picY: [788, 788, 788],
      picW: [47, 53, 47],
      picH: [63, 63, 63],
      renderX: [0, 20, 0],
      renderY: [0, 0, 0],
      frame: 0,
      count: 3
    }
    this.leg = {
      isPlaying: false,
      picX: [0, 40, 86, 159, 222],
      picY: [360, 360, 360, 360, 360],
      picW: [40, 46, 73, 62, 44],
      picH: [94, 94, 94, 94, 94],
      renderX: [0, 0, 22, 18, 18],
      renderY: [-8, -8, -8, -8, -8],
      frame: 0,
      count: 5
    }
    this.sLeg = {
      isPlaying: false,
      picX: [0, 38, 79, 160, 229],
      picY: [582, 582, 582, 582, 582],
      picW: [38, 41, 80, 69, 39],
      picH: [60, 60, 60, 60, 60],
      renderX: [8, 4, 30, 26, 14],
      renderY: [32, 32, 32, 32, 32],
      frame: 0,
      count: 5
    }
    this.jLeg = {
      type: '',
      isPlaying: false,
      picX: [0, 44, 0],
      picY: [865, 865, 865],
      picW: [44, 76, 44],
      picH: [87, 70, 87],
      renderX: [0, 28, 0],
      renderY: [0, 0, 0],
      frame: 0,
      count: 3
    }
    //肘
    this.elbow = {
      isPlaying: false,
      picX: [0, 52, 110, 164, 227],
      picY: [1684, 1684, 1684, 1684, 1684],
      picW: [52, 58, 54, 63, 56],
      picH: [88, 88, 88, 88, 88],
      renderX: [7, 13, 12, 16, 7],
      renderY: [0, 0, 0, 0, 0],
      frame: 0,
      count: 5
    }
    this.sElbow = {
      isPlaying: false,
      picX: [0, 43, 0],
      picY: [517, 517, 517],
      picW: [43, 64, 43],
      picH: [63, 64, 63],
      renderX: [4, 20, 4],
      renderY: [30, 28, 30],
      frame: 0,
      count: 3
    }
    this.jElbow = {
      isPlaying: false,
      picX: [0, 43, 0],
      picY: [953, 947, 953],
      picW: [43, 67, 43],
      picH: [68, 68, 68],
      renderX: [0, 28, 0],
      renderY: [0, 0, 0],
      frame: 0,
      count: 3
    }

    // 发波动作
    this.wave = {
      isPlaying: false,
      picX: [235, 295],
      picY: [0, 0],
      picW: [60, 60],
      picH: [87, 87],
      renderX: [0, -5],
      renderY: [0, 0],
      frame: 0,
      count: 2
    }
    //防御
    this.defs = {
      isPlaying: false,
      picX: [0],
      picY: [1510],
      picW: [54],
      picH: [87],
      renderX: [0],
      renderY: [0],
      frame: 0,
      count: 1
    }
    this.sDefs = {
      isPlaying: false,
      picX: [54],
      picY: [1510],
      picW: [54],
      picH: [87],
      renderX: [0],
      renderY: [0],
      frame: 0,
      count: 1
    }

  }

  /**
   * 重置站立动画帧数
   */
  resetStandFrame() {
    this.stand.frame = 0
  }
  resetMoveFrame() {
    this.moveB.frame = 0
    this.moveF.frame = 0
    this.moveB.isPlaying = false
    this.moveF.isPlaying = false
  }

  initPicInfo() {
    this.pic = {
      x: 0,
      y: 0,
      width: 45,
      height: 87,
      // 绘制图画的坐标移动
      renderX: 0,
      renderY: 0
    }
  }

  /**
   * 操作人物
   */
  update(frequency, dirc, att) {
    this.pushQueue(dirc)
    if (this.fist.isPlaying) {
      this.updateFist()
      return
    }
    if (this.leg.isPlaying) {
      this.updateLeg()
      return
    }
    if (this.elbow.isPlaying) {
      this.updateElbow()
      return
    }
    switch(att) {
      case 1:
        this.resetStandFrame()
        this.resetMoveFrame()
        this.updateFist()
        return
      case 2:
        this.resetStandFrame()
        this.resetMoveFrame()
        this.updateLeg()
        return
      case 3:
        this.resetStandFrame()
        this.resetMoveFrame()
        this.updateElbow()
        return
      default:
        this.updateMove(dirc)
    }
  }

  updateMove(dirc) {
    if (this.jump.isPlaying) {
      this.updateJump()
      return
    }
    if (this.rolling.isPlaying) {
      this.updateRolling()
      return
    }
    switch(dirc) {
      case 3: 
        this.squat.reday = false
        this.resetStandFrame()
        this.resetMoveFrame()
        this.updateJump()
        break
      case 5:
        this.squat.reday = false
        this.resetStandFrame()
        this.moveF.dirc = 1
        this.moveB.dirc = 1
        if (this.pos == 1)
          this.updateForward()
        else
          this.updateBack()
        break
      case 1:
        this.squat.reday = false
        this.resetStandFrame()
        this.moveF.dirc = -1
        this.moveB.dirc = -1
        if (this.pos == -1)
          this.updateForward()
        else
          this.updateBack()
        break
      case 2:
        this.squat.reday = false
        this.resetStandFrame()
        this.resetMoveFrame()
        this.rolling.dirc = -1
        this.updateRolling()
        break
      case 4:
        this.squat.reday = false
        this.resetMoveFrame()
        this.resetStandFrame()
        this.rolling.dirc = 1
        this.updateRolling()
        break
      case 6:
      case 7:
      case 8:
        this.resetStandFrame()
        this.resetMoveFrame()
        this.updateSquat()
        break
      default:
        this.squat.reday = false
        this.updateStand()
        break
    }
  }

  /**
   * 站立动画
   */
  updateStand() {
    if (this.moveF.isPlaying) {
      this.updateForward()
      return
    }
    if (this.moveB.isPlaying) {
      this.updateBack()
      return
    }
    this.fillPicInfo(this.stand, this.frequency)
  }

  /**
   * 跳
   */
  updateJump() {
    let frc = this.frequency - 3
    this.jump.isPlaying = true
    let end = this.fillPicInfo(this.jump, frc)
    this.changePositionY(this.jump, frc)
    if (end) {
      this.jump.isPlaying = false
    }
  }

  /**
   * 前进
   */
  updateForward() {
    let frc = this.frequency - 5
    this.moveF.isPlaying = true
    let end = this.fillPicInfo(this.moveF, frc)
    this.changePositionX(this.moveF, frc, this.moveF.dirc)
    if (end) {
      this.moveF.isPlaying = false
    }
  }

  /**
   * 后退
   */
  updateBack() {
    let frc = this.frequency - 5
    this.moveB.isPlaying = true
    let end = this.fillPicInfo(this.moveB, frc)
    this.changePositionX(this.moveB, frc, this.moveB.dirc)
    if (end) {
      this.moveB.isPlaying = false
    }
  }

  /**
   * 左右跳
   */
  updateRolling(){
    let frc = this.frequency
    this.rolling.isPlaying = true
    let end = this.fillPicInfo(this.rolling, frc)
    this.changePositionY(this.rolling, frc)
    this.changePositionX(this.rolling, frc, this.rolling.dirc)
    if (end) {
      this.rolling.isPlaying = false
    }
  }

  /**
   * 下蹲
   */
  updateSquat() {
    let frc = this.frequency - 5
    this.squat.isPlaying = true
    if(this.squat.reday) return
    let end = this.fillPicInfo(this.squat, frc)
    if (end) {
      this.squat.reday = true
    }
  }

  /**
   * 拳
   */
  updateFist() {
    let frc = this.frequency - 3
    this.fist.isPlaying = true
    // 发波
    if (this.wave.isPlaying
      || (this.pos == 1 && this.lastAction([7, 6, 5]))
      || (this.pos == -1 && this.lastAction([7, 8, 1]))) {
      if (this.simpleUpdate(this.wave)) {
        this.fist.isPlaying = false
      }
      return
    }
    if (this.sFist.isPlaying || this.squat.reday) {
      if (this.simpleUpdate(this.sFist)) {
        this.fist.isPlaying = false
      }
      return
    }
    if ((this.jump.isPlaying && this.jump.frame > 20 && this.jump.frame < 30) 
      || (this.jFist.isPlaying && this.jFist.type == 'jump')) {
      this.jFist.type = 'jump'
      this.updateJump()
      if (this.simpleUpdate(this.jFist))
        this.fist.isPlaying = false
      return
    }
    if ((this.rolling.isPlaying && this.rolling.frame > 20 && this.rolling.frame < 30)
      || (this.jFist.isPlaying && this.jFist.type == 'rolling')) {
      this.jFist.type = 'rolling'
      this.updateRolling()
      if (this.simpleUpdate(this.jFist))
        this.fist.isPlaying = false
      return
    }
    if (this.jump.isPlaying || this.rolling.isPlaying) {
      this.fist.isPlaying = false
      return
    }
    let end = this.fillPicInfo(this.fist, frc)
    if (end) {
      this.fist.isPlaying = false
    }
  }

  /**
   * 腿
   */
  updateLeg() {
    let frc = this.frequency - 3
    this.leg.isPlaying = true
    if (this.sLeg.isPlaying || this.squat.reday) {
      if (this.simpleUpdate(this.sLeg)) {
        this.leg.isPlaying = false
      }
      return
    }
    if ((this.jump.isPlaying && this.jump.frame > 20 && this.jump.frame < 30)
      || (this.jLeg.isPlaying && this.jLeg.type == 'jump')) {
      this.jLeg.type == 'jump'
      this.updateJump()
      if (this.simpleUpdate(this.jLeg))
        this.leg.isPlaying = false
      return
    }
    if ((this.rolling.isPlaying && this.rolling.frame > 20 && this.rolling.frame < 30)
      || (this.jLeg.isPlaying && this.jLeg.type == 'rolling')) {
      this.jLeg.type = 'rolling'
      this.updateRolling()
      if (this.simpleUpdate(this.jLeg))
        this.leg.isPlaying = false
      return
    }
    if (this.jump.isPlaying || this.rolling.isPlaying) {
      this.leg.isPlaying = false
      return
    }
    let end = this.fillPicInfo(this.leg, frc)
    if (end) {
      this.leg.isPlaying = false
    }
  }


  /**
   * 肘
   */
  updateElbow() {
    let frc = this.frequency - 3
    this.elbow.isPlaying = true
    if (this.sElbow.isPlaying || this.squat.reday) {
      if (this.simpleUpdate(this.sElbow)) {
        this.elbow.isPlaying = false
      }
      return
    }
    if ((this.jump.isPlaying && this.jump.frame > 20 && this.jump.frame < 30)
      || (this.jElbow.isPlaying && this.jElbow.type == 'jump')) {
      this.jElbow.type = 'jump'
      this.updateJump()
      if (this.simpleUpdate(this.jElbow))
        this.elbow.isPlaying = false
      return
    }
    if ((this.rolling.isPlaying && this.rolling.frame > 20 && this.rolling.frame < 30)
      || (this.jElbow.isPlaying && this.jElbow.type == 'jump')) {
      this.jElbow.type = 'rolling'
      this.updateRolling()
      if (this.simpleUpdate(this.jElbow))
        this.elbow.isPlaying = false
      return
    }
    if (this.jump.isPlaying || this.rolling.isPlaying) {
      this.elbow.isPlaying = false
      return
    }
    
    let end = this.fillPicInfo(this.elbow, frc)
    if (end) {
      this.elbow.isPlaying = false
    }
  }

  /**
   * 通用的动作更新
   */
  simpleUpdate(action) {
    let frc = this.frequency - 3
    action.isPlaying = true
    let end = this.fillPicInfo(action, frc)
    if (end) {
      action.isPlaying = false
    }
    return end
  }

  /**
   * 更换图片
   */
  fillPicInfo(action, frc) {
    let cur = Math.floor(action.frame / frc)
    if (action.frame % frc === frc - 1) { //最后一帧更新动画
      this.pic.height = action.picH[cur]
      this.pic.width = action.picW[cur]
      this.pic.x = action.picX[cur]
      this.pic.y = action.picY[cur]
      this.pic.renderX = action.renderX[cur]
      this.pic.renderY = action.renderY[cur]
    }
    let end = false
    action.frame++
    if (action.frame == frc * action.count){
      end = true
      action.frame = 0
    }

    return end
  }

  /**
   * 防御动画
   */
  updateDefense(frequency) {
    if (this.squat.isPlaying) {
      //蹲防
      this.fillPicInfo(this.sDefs)
      this.sDefs.isPlaying = true
    } else {
      // 站防
      this.fillPicInfo(this.defs)
      this.defs.isPlaying = true
    }
  }

  /**
   * 更新高度
   */
  changePositionY(action, frc) {
    let cur = Math.floor(action.frame / frc)
    if (action.frame % frc === frc - 1) {
      this.pointY += this.jumpHeight[cur]
    }
  }

  /**
   * 更新水平坐标
   */
  changePositionX(action, frc, dirc) {
    let cur = Math.floor(action.frame / frc)
    if (action.frame % frc === frc - 1) {
      this.pointX += dirc * action.step[cur]
    }
  }

  position() {
    return this.pos
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
   * 初始化键盘操作记忆队列
   */
  initMemoryBuffer() {
    this.qSize = 30     // 0.5秒内按出的键可以组合成必杀技
    this.charged = 0    // 蓄力
    this.acQueue = []   // 操作记忆队列
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
   * 判断最近的动作，做连续技、必杀技判定
   */
  lastAction(arr) {
    let acLength = this.acQueue.length
    if (acLength < 2) return false
    let cur = arr.pop()
    if (this.acQueue[acLength - 1] !== cur) {
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
    if (this.pos < 0)
      x = INITIAL_GX - this.pic.x - this.pic.width
    else
      x = INITIAL_GX + this.pic.x
    ctx.drawImage(
      this.ccer,
      x, this.pic.y, this.pic.width, this.pic.height,
      this.pointX * pixel.value + pixel.p0.x +
      this.pic.renderX * this.pos - this.pic.width * .6,
      pixel.p0.y - this.pointY * pixel.value + this.pic.renderY,
      this.pic.width * 1.2, this.pic.height * 1.2
    )
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
}