import ImageBox from './imagebox'
import DataBus from './databus'

import StartMenu from './runtime/startmenu'
import Player from './player/index'
import PlayerLoader from './player/playerloader'
import SelectColor from './runtime/selectcolor'

let imageBox = new ImageBox()
let dataBus = new DataBus()
let ctx = canvas.getContext('2d')

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    imageBox.onLoadImg(() => {
      this.selectColor = new SelectColor(ctx, this)
      this.startMenu = new StartMenu(ctx, this)
      this.player = new Player(ctx, this)
     
      // this.loader = new PlayerLoader()
      // this.loader.loadPlayers(ctx)
      this.gotoPage(0)
    })
  }

  /**
   * 页面跳转
   *    不在此处 new 
   */
  gotoPage(pageNo) {
    switch(pageNo) {
      case 0:
        dataBus.currentPage = 0
        this.player.stopAnimation()
        this.startMenu.cutIn()
        break
      case 1:
        dataBus.currentPage = 1
        this.player.stopAnimation()
        this.selectColor.cutIn()
        break
      case 2:
        dataBus.currentPage = 2
        this.player.cutIn(this.startMenu.curBtnId, this.selectColor.selecter)
        break
    }
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