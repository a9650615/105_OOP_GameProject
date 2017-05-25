import Framework from '../framework_es6'
import {Resource} from '../constant'
import GameObject from './GameObject'
import JsonParser from '../modules/BeatsMapParser'
import Sprite from './Sprite'
import Ani from '../helper/Ani'


export default class EnemyStage extends GameObject {
  constructor(props) {
    super(props)
    this._parents = props
    Object.assign(this.state, {
      enemy: {}
    })

    this.component = {
      enemys: []
    }

    this.enemyList = {}
    this.ani = new Ani(this)
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
      new Sprite(this._parents).setParent(this).set(Object.assign(this.state.enemy,{
        url: Resource.image+char.img,
        wPiece: char.wPiece,
        hPiece: char.hPiece,
        x: 10,
        y: 10
      }))
      this.forceUpdate()
    }
  }

  fresh() {

  }

}