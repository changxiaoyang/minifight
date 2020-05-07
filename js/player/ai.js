import DataBus from '../databus'
import Pixel from '../base/pixel'
import ImageBox from '../imagebox'
import BrownPlayer from './brownplayer'


const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let imageBox = new ImageBox()
let databus = new DataBus()
let pixel = new Pixel()

let TO_LEFT = [1, 2, 3, 8, 0]
let TO_RIGHT = [0, 4, 5, 6, 7]

export default class Ai {
  constructor(imgArr) {
    this.aiArr = imgArr
    // AI 像素化的位置
    this.pointX = 140
    this.pointY = 30
    /**
     * 练习模式 ai
     *    1. 站着不动
     *    2. 打不死
     */
    this.practice = false

    this.player = this.aiArr.shift()
    this.player.initPosition(this.pointX, this.pointY)
    this.dirc = 1
    this.oprQueue = []
    this.attQueue = []
  }

  /**
   * 计算
   *   todo :  smart
   */
  caculate(pos) {
    if (this.practice) {
      this.oprQueue.push(0)
      this.attQueue.push(0)
      this.player.initVitalSigns()
      return
    }
    if (this.oprQueue.length > 0) return
    let enemy = this.player.enemy
    if (enemy.dead) {
      this.oprQueue.push(0)
      this.attQueue.push(0)
    }
    if (pos < 0) {
      if (Math.abs(enemy.pointX, this.player.pointX) > 100) {
        this.oprQueue = [1, 0, 1, 1]
        this.attQueue = [0, 0, 0, 2]
        return
      }
      if (enemy.jump.isPlaying || enemy.rolling.isPlaying ) {
        this.oprQueue = [6, 6, 6]
        this.attQueue = [0, 0, 2]
        return
      } 
      let orr = Math.floor(Math.random() * 4)
      this.oprQueue = [TO_LEFT[orr], TO_LEFT[orr], TO_LEFT[orr], TO_LEFT[orr]]
    }
    if (pos > 0) {
      if (Math.abs(enemy.pointX, this.player.pointX) > 200) {
        this.oprQueue = [5, 0, 5, 5]
        this.attQueue = [0, 0, 0, 3]
        return
      }
      if (enemy.jump.isPlaying || enemy.rolling.isPlaying) {
        this.oprQueue = [8, 8, 8]
        this.attQueue = [0, 0, 3]
        return
      }
      let orr = Math.floor(Math.random() * 4)
      this.oprQueue = [TO_RIGHT[orr], TO_RIGHT[orr], TO_RIGHT[orr], TO_RIGHT[orr]]
    }

    this.attQueue = [0, 0, 0]
    this.attQueue.push(Math.floor(Math.random() * 3))
  }

  /**
   * AI自动操作
   */
  update(f, pos) {
    this.caculate(pos)
    this.dirc = this.oprQueue.shift()
    this.player.update(f, this.dirc, this.attQueue.shift(), pos)
  }

  render(ctx) {
    this.player.render(ctx)
  }

}