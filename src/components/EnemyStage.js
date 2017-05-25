import Framework from '../framework_es6'
import {Resource} from '../constant'
import GameObject from './GameObject'
import JsonParser from '../modules/BeatsMapParser'
import Sprite from './Sprite'
import Ani from '../helper/Ani'
import Rect from './Rectangle'

export default class EnemyStage extends GameObject {
  constructor(props) {
    super(props)
    this._parents = props
    Object.assign(this.state, {
      enemy: {}
    })

    this.component = {
      enemys: [],
      box : new Rect(this._parent).setParent(this).set({
        background: '#ffffff',
        width: 200,
        height: 100,
        x: 0,
        y: 0
      })
    }

    this.enemyList = {}
    this.ani = new Ani(this)
    // document.body.appendChild(this._tmpCanvas.element())
  }

  /**
   * 載入怪物名稱以及資料
   */
  loadEnemy(name) {
    new JsonParser(`${Resource.character}${name}.json`).then(data => {
      this.enemyList[name] = data
    })
    
    return this
  }

  set(data) {
    if (data.width||data.height) {
      this._tmpCanvas.resize(data.width, data.height)
    }
    this.setState(data)
    return this
  }

  setEnemy(data) {
    this.setState({
      enemy: data
    })
  }

  push(name, side = null) {
    let char
    if (this.enemyList[name]) {
      char = this.enemyList[name]
      this.component.enemys.push(
        new Sprite(this._parents).setParent(this).set(Object.assign(this.state.enemy,{
          url: Resource.image+char.img,
          wPiece: char.wPiece,
          hPiece: char.hPiece,
          x: 10+this.component.enemys.length * 10,
          y: 10,
          sprWidth: 200,
          sprHeight: 200,
          }))
      )
      this.forceUpdate()
    }
  }

  fresh() {
    
  }

}