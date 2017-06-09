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
      enemy: {},
      emenySize: 100,
      actionTime: 5, //update time
      pause: false
    })

    this.component = {
      enemys: [],
      // box : new Rect(this._parents).set({
      //   background: '#ffffff',
      //   width: 200,
      //   height: 100,
      //   x: 0,
      //   y: 0
      // })
    }

    this.enemyList = {}
    this.ani = new Ani(this)
    this.counter = 0
    this.attackAction = () => {}
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

  /**
   * 設定攻擊目標寬度 , x 軸
   * @param {object} data 
   */
  setTarget(data) {
    this.setState({
      target: data
    })

    return this
  }

  /**
   * 殺目標方向的怪物
   */
  killEnemy(align) {
    for (let enemy of this.component.enemys) {
      if(enemy.side === align && enemy.status !== 'die') {
         enemy.status = 'die'
         enemy.frame = 0
         break
      }
    }
  }

  push(name, side = null) {
    let char
    if (this.enemyList[name]) {
      char = this.enemyList[name]
      this.component.enemys.push(
        {
          status: 'move',
          frame: 0,
          lastStatusFrame: 0,
          type: name,
          side: side,
          x: side?this.state.width - 100: 100,
          y: this.state.height * 0.5,
          sprite: new Sprite(this._parents).setParent(this).set(Object.assign(this.state.enemy,{
            url: Resource.image+char.img,
            wPiece: char.wPiece,
            hPiece: char.hPiece,
            x: side?this.state.width - 100: 100,
            y: this.state.height * 0.5,
            sprWidth: this.state.height * 0.5,
            sprHeight: this.state.height * 0.5,
          })).flip(side)
        }
      )
      this.forceUpdate()
    }
  }

  setAttack(func) {
    this.attackAction = func
  }

  update() {
    let enemy, nameData
    this.counter ++
    if(!this.state.pause)
    if(this.counter%this.state.actionTime===0) {
      for( let i in this.component.enemys ) {
        enemy = this.component.enemys[i]
        nameData = this.enemyList[enemy.type]
        if((enemy.side==0&&(enemy.x+this.state.height * 0.5)>=this.state.target.x+50)
          ||(enemy.side==1&&enemy.x<=(this.state.target.x+this.state.target.width-50) )) { //change attack
            if (enemy.status === 'attack') {
              this.attackAction()
              // console.log('now attack'+ (enemy.frame - enemy.lastStatusFrame))
              if (Math.abs(enemy.frame - enemy.lastStatusFrame) >= nameData.action['attack'].length -1) {
                // console.log(i+' dispared')
                enemy.status = 'die'
                enemy.frame = 0
              }
            } else if (enemy.status === 'move') {
              enemy.status = 'attack'
              enemy.lastStatusFrame = enemy.frame
            }
        } else if (enemy.status === 'move') {
            if (enemy.side) { //face left
            enemy.sprite.set({x: enemy.x - nameData.moveSpeed})
            enemy.x -= nameData.moveSpeed
          } else {
            enemy.sprite.set({x: enemy.x + nameData.moveSpeed})
            enemy.x += nameData.moveSpeed
          }
        }

        if (this.counter%(this.state.actionTime*5)===0) {
          enemy.frame = ++enemy.frame%nameData.action[enemy.status].length
          enemy.sprite.showPiece(nameData.action[enemy.status][enemy.frame])
          if (enemy.status==='die' && enemy.frame >= nameData.action[enemy.status].length - 1) {
            enemy.sprite.hide()
            this.component.enemys.splice( i, 1)
          }
        }
      }
      this.forceUpdate()
    }
  }

}