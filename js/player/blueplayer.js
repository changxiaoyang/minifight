import BasePlayer from './baseplayer'

export default class BluePLayer extends BasePlayer {
  constructor(img) {
    super(img)

    this.initChildFrame()
  }

  /**
   * 特有的招式
   */
  initChildFrame() {
    this.kt01 = {
      picX: [256, 310, 372, 434, 434, 434],
      picY: [1278, 1278, 1278, 1278, 1278, 1278],
      picW: [54, 62, 62, 82, 82, 82],
      picH: [84, 84, 84, 84, 84, 84],
      renderX: [0, 0, 0, 0, 0, 0],
      renderY: [0, 0, 0, 0, 0, 0],
      frame: 0,
      count: 6,
      isPlaying: false
    }

    this.techArr = []
  }

  /**
   * 必杀技01 小黄人冲击波
   */
  killTechniques01(frequency) {
    if (this.simpleUpdate(this.kt01, frequency)) {
      this.azure.isPlaying = false
    }
    if (this.kt01.frame == frequency * 4) {
      let tech01 = {
        picX: 512 + 78 * this.pic.pos,
        pos: this.pic.pos,
        picY: 0,
        picW: 156,
        picH: 135,
        len: 10 * this.pic.pos,
        max: 100 * this.pic.pos
      }
      this.techArr.push(tech01)
    }
  }

  /**
   * 技能弹道飞行
   */
  updateTech(attArr) {
    this.techArr.forEach((tech) => {
      tech.len += 2 * tech.pos
      if (tech.pos < 0) 
        attArr = this.reversePx(attArr, tech.picW)
      this.absTecPxArr = this.toAbsArr(attArr, 
        this.pointX + tech.len, this.pointY)
      if (Math.abs(tech.len - tech.max) < 3) {
        this.techArr.shift()
        this.absTecPxArr = []
      }
    })
    
  }

  /**
   * 通用的动作更新
   */
  simpleUpdate(action, frequency) {
    action.isPlaying = true
    let end = this.fillPicInfo(action, frequency)
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
    if (action.frame % frc === 0) {
      this.pic.height = action.picH[cur]
      this.pic.width = action.picW[cur]
      this.pic.x = 512 + action.picX[cur] * this.pic.pos
      this.pic.y = action.picY[cur]
      this.pic.renderX = action.renderX[cur]
      this.pic.renderY = action.renderY[cur]
    }
    let end = false
    action.frame++
    if (action.frame == frc * action.count) {
      end = true
      action.frame = 0
    }

    return end
  }

  
}