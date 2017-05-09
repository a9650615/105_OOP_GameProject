export default class Ani {
  constructor(parent) {
    this._parent = parent
    this.actions = {}
    this.callback = {}
  }

  _aniCounter() {
    // console.log('anime help caller')
  }
  /**
   * 設置動畫參數
   * @param {object} actionData 動畫參數
   * @return {class} this
   */
  setAction(actionData = {}) {
    if (typeof actionData === 'object')
      for(let i in actionData) {
        let tmp = {}
        tmp.action = actionData[i]
        tmp.tmpData = {}
        tmp.status = 0
        tmp.count = 0
        actionData[i] = tmp
      }
    this.actions = actionData
    
    return this
  }
  /**
   * 更新邏輯 ( 外部呼叫 )
   */
  update() {
    let actionData = this.actions
    let time = new Date().getTime()
    for(let type in actionData) {
      if (actionData.hasOwnProperty(type)) {
        let data = actionData[type]
        let act = data.action
        if (data.status === 1) { //running

          if (time >= data.endTime) {
            data.status = 0
          }
          if (this.callback[type])
            this.callback[type].call(this._parent, actionData[type].tmpData)

        }
      }
    }
  }

  call(type, time = 0) {
    if (this.actions[type]) {
      this.actions[type].status = 1
      this.actions[type].count = 0
      this.actions[type].startTime = new Date().getTime()
      this.actions[type].endTime = new Date().getTime() + time * 1000
    }
  }

  on(type, callback) {
    this.callback[type] = callback
  }
}