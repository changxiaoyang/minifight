import Sprite  from './sprite'
import DataBus from '../databus'

let databus = new DataBus()

const __ = {
  timer: Symbol('timer'),
}

/**
 * 简易的帧动画类实现
 */
export default class Animation {
  constructor() {
    // 当前动画是否播放中
    this.isPlaying = false
    // 每一帧的时间间隔
    this.interval = 1000 / 60
    // 帧定时器
    this[__.timer] = null
  }

  play(callback) {
    this.isPlaying = true
    if (this.interval > 0 && this.isPlaying) {
      this[__.timer] = setInterval(callback, this.interval)
    }
  }

  // 停止帧动画播放
  stop() {
    this.isPlaying = false

    if ( this[__.timer] )
      clearInterval(this[__.timer])
  }

}
