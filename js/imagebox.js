let instance

/**
 * 全局图片盒子
 */
export default class ImageBox {
  constructor() {
    if (instance)
      return instance

    instance = this

    this.loading = 0
    this.init()
  }

  init() {
    this.menuImg = new Image()
    this.menuImg.src = 'images/menu.png'
    this.fbgImg = new Image()
    this.fbgImg.src = 'images/fightbg.png'
    this.blueImg = new Image()
    this.blueImg.src = 'images/blueplayer.png'
    this.brownImg = new Image()
    this.brownImg.src = 'images/brownplayer.png'
    this.tmmuImg = new Image()
    this.tmmuImg.src = 'images/tmmu.png'
    this.girlImg = new Image()
    this.girlImg.src = 'images/green.png'
    this.greenImg = new Image()
    this.greenImg.src = 'images/greenplayer.png'
    this.redImg = new Image()
    this.redImg.src = 'images/redplayer.png'
  }

  loadImg() {
    this.menuImg.onload = () => {
      this.loading += 30
    }
    this.fbgImg.onload = () => {
      this.loading += 10
    }
    this.blueImg.onload = () => {
      this.loading += 10
    }
    this.brownImg.onload = () => {
      this.loading += 10
    }
    this.tmmuImg.onload = () => {
      this.loading += 10
    }
    this.girlImg.onload = () => {
      this.loading += 10
    }
    this.greenImg.onload = () => {
      this.loading += 10
    }
    this.redImg.onload = () => {
      this.loading += 10
    }
  }

  onLoadImg(callback) {
    this.loadImg()
    let waitLoading = setInterval(() => {
      wx.showLoading({
        title: '资源加载中...' + this.loading + '%',
      })
      if (this.loading === 100) {
        clearInterval(waitLoading)
        wx.hideLoading()
        callback()
      }
    }, 30)
  }

}
