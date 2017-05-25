export default class Ani {
  constructor(parent) {
    this._parent = parent
    this.actions = {}
    this.callback = {}
    this.finishCall = {}
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
        tmp.isTmp = false //  臨時呼叫
        actionData[i] = tmp
      }
    this.actions = actionData
    
    return this
  }
  /**
   * 刪除 action
   */
  _deleteAction(actionType) {
    delete this.actions[actionType]
    this.callback[actionType] = null
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
        let actLength = act.length
        let parts = 1 / (actLength - 1)
        if (data.status === 1 && time >= data.startTime) { //running

          if (time >= data.endTime) { //end
            if (data.loop) {
              let time = new Date().getTime()
              data.startTime = time + data.timeout * 1000
              data.endTime = time + data.resTime * 1000
            } else {
              data.status = 0
              if (this.callback[type])
                this.callback[type].call(this._parent, act[actLength - 1])
              if (this.finishCall[type])
                this.finishCall[type].call(this._parent)
              if (data.isTmp) 
                this._deleteAction(type)
            }
          } else {
            let percent = (time - data.startTime) / (data.endTime - data.startTime)
            let nowStep = parseInt(percent / parts)
            let certainPercnt = (percent / parts) % 1
            
            data.tmpData = {}

            for (let i in data.action[nowStep]) {
              if (data.action[nowStep + 1][i] != null) {
                // console.log(certainPercnt, data.action[nowStep][i], data.action[nowStep + 1][i])
                data.tmpData[i] = ((data.action[nowStep + 1][i] - data.action[nowStep][i]) * certainPercnt) + data.action[nowStep][i]
              }
            }

            // data.tmpData = {
            //   percent,
            //   nowStep,
            //   actLength
            // }

            if (this.callback[type])
              this.callback[type].call(this._parent, data.tmpData)
          }

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
  /**
   * 直接呼叫動畫 從 到 時間 func (暫定名稱)
   */
  fromTo(from = {}, to = {}, resTime = 0, callback = () => {}, tmpName = null, timeout = 0, loop = false) {
    let time = new Date().getTime() + timeout * 1000
    this.callback[tmpName || time] = callback
    this.actions[tmpName || time] = {
      status: 1,
      count: 0,
      startTime: time,
      endTime: time + resTime * 1000,
      isTmp: true,
      action: [from, to],
      resTime,
      loop,
      timeout
    }
    return new Promise((resolve, reject) => {
      this.finishCall[tmpName || time] = resolve
    })
  }

  /**
   * 直接呼叫動畫流
   */
  go(actions = [], resTime = 0, callback = () => {}, tmpName = null) {
    let time = new Date().getTime()
    this.callback[tmpName || time] = callback
    this.actions[tmpName || time] = {
      status: 1,
      count: 0,
      startTime: time,
      endTime: time + resTime * 1000,
      isTmp: true,
      action: actions
    }

    return this
  }
}