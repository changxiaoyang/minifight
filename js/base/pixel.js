const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let instance

export default class Pixel {
  constructor() {
    if (instance) 
      return instance
    instance = this

    // 场景大小
    this.mapHeight = 80
    this.mapWidth = 220

    this.value = Math.floor(screenWidth / 192) 

    this.p0 = {
      x: 0,
      y: screenHeight * .8,
      pointX: 0,
      pointY: 79
    }
  }
}