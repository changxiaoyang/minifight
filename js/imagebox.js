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
    this.menuSuccess = false
    this.fbgImg = new Image()
    this.fbgImg.src = 'images/fightbg.png'
    this.fbgSuccess = false
    this.blueImg = new Image()
    this.blueImg.src = 'images/blueplayer.png'
    this.blueSuccess = false
    this.brownImg = new Image()
    this.brownImg.src = 'images/brownplayer.png'
    this.brownSuccess = false
    this.tmmuImg = new Image()
    this.tmmuImg.src = 'images/tmmu.png'
    this.tmmuSuccess = false
    this.girlImg = new Image()
    this.girlImg.src = 'images/green.png'
    this.green2Success = false
    this.greenImg = new Image()
    this.greenImg.src = 'images/greenplayer.png'
    this.greenSuccess = false
    this.redImg = new Image()
    this.redImg.src = 'images/redplayer.png'
    this.redSuccess = false
    this.jnImg = new Image()
    this.jnImg.src = 'images/jn.png'
    this.jnSuccess = false
  }

  loadImg() {
    this.menuImg.onload = () => {
      this.loading += 20
      this.menuSuccess = true
    }
    this.fbgImg.onload = () => {
      this.loading += 10
      this.fbgSuccess = true
    }
    this.jnImg.onload = () => {
      this.loading += 10
      this.jnSuccess = true
    }
    this.blueImg.onload = () => {
      this.loading += 10
      this.blueSuccess = true
    }
    this.brownImg.onload = () => {
      this.loading += 10
      this.brownSuccess = true
    }
    this.tmmuImg.onload = () => {
      this.loading += 10
      this.tmmuSuccess = true
    }
    this.girlImg.onload = () => {
      this.loading += 10
      this.green2Success = true
    }
    this.greenImg.onload = () => {
      this.loading += 10
      this.greenSuccess = true
    }
    this.redImg.onload = () => {
      this.loading += 10
      this.redSuccess = true
    }
  }

  onLoadImg(callback) {
    this.loadImg()
    let waitLoading = setInterval(() => {
      wx.showLoading({
        title: '资源加载中...' + this.loading + '%',
      })
      if (this.redSuccess && this.greenSuccess && this.green2Success
        && this.tmmuSuccess && this.brownSuccess && this.blueSuccess
        && this.fbgSuccess && this.menuSuccess && this.jnSuccess) {
        clearInterval(waitLoading)
        wx.hideLoading()
        callback()
      }
    }, 30)
  }

}
