import ImageBox from './imagebox'
import DataBus from './databus'

import StartMenu from './runtime/startmenu'
import Player from './player/index'
import PlayerLoader from './player/playerloader'
import SelectColor from './runtime/selectcolor'
import Music from './runtime/music'

let imageBox = new ImageBox()
let dataBus = new DataBus()
let music = new Music()
let ctx = canvas.getContext('2d')

let instance

canvas.width = wx.getSystemInfoSync().windowWidth
canvas.height = wx.getSystemInfoSync().windowHeight

/**
 * 切出屏幕回来时调用
 */
wx.onShow(res => {
  music.playBgm()
  if (instance.player)
    setTimeout(function () {
      instance.render()
    }, 50)
})

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    if (instance) {
      return instance
    }
    instance = this
    dataBus.loadMain(instance)
    imageBox.onLoadImg(() => {
      this.selectColor = new SelectColor(ctx)
      this.startMenu = new StartMenu(ctx)
      this.player = new Player(ctx)

      this.loader = new PlayerLoader()
      this.loader.reloadPlayer()
      this.gotoPage(0)
    })
  }

  /**
   * 页面跳转
   *    不在此处 new 
   */
  gotoPage(pageNo) {
    this.startMenu.closeSetUp()
    switch(pageNo) {
      case 0:
        dataBus.currentPage = 0
        this.player.cutOut()
        this.selectColor.cutOut()
        this.startMenu.cutIn()
        break
      case 1:
        dataBus.currentPage = 1
        this.player.cutOut()
        this.selectColor.cutIn()
        break
      case 2:
        dataBus.currentPage = 2
        this.player.cutIn(this.startMenu.curBtnId, this.selectColor.selecter)
        break
    }
    music.changeBgm()
  }

  render() {
    switch (dataBus.currentPage) {
      case 0:
        this.startMenu.render()
        break
      case 1:
        this.selectColor.render()
        break
      case 2:
        this.player.render()
        break
      default:
        break
    }
  }

}

