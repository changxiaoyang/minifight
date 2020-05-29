import Pool from './base/pool'

let instance
let PAGE_DEFINE = ['home', 'select', 'fighting']

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.pool = new Pool()

    this.reset()
  }

  reset() {
    this.frame      = 0
    // 计算格斗得分
    this.score      = 0
    this.gameOver   = false

    this.frequency = 7
    //记录正在运行的页面
    this.currentPage = 0
  }

  loadMain(main) {
    this.main = main
  }

}
