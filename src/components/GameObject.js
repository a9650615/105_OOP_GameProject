import Framework, {ES6Trans} from '../framework_es6';
import {mouseManager} from '../../framework/MouseManager';
import Canvas from './Canvas';

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

class GameObject extends ES6Trans{
  __construct(prop) {
    this._tmpCanvas = new Canvas();
    this._tmpContent = this._tmpCanvas.ctx();
    this._parent = null;
    this._parentCanvas = null;

    this._gameObject = {
      hide: false,
      uid: guid(),
      align: 'left'
    };

    this.state = {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      scaleResolveX: 0,
      scaleResolveY: 0
    };
    
    this.prop = prop;
    this.type = 'GameObject';   
    this.pushSelfToLevel();

    this._initMouseEvent();
    this._initTouchEvent();
    prop.rootScene.attach(this);
    this.load();
  }

  /**
   * 檢查狀態是成立, 成立及執行底下 function
   * @param {boolen} bool 
   * @param {function} func 
   */
  _callEventFunction(bool = false, func) {
    if (bool)
      func.call();
  }

  _initMouseEvent() {
    let event = new mouseManager(Framework);
    // event.setSubject(this);
    event.setClickEvent((e) => {
      if (!this._gameObject.hide && this.click)
        this._callEventFunction(this.checkClick(e), this.click.bind(this, e));
    });
    // event.setContextmenuEvent
    if (typeof this.mousemove === "function")
      event.setMouseMoveEvent((e) => {
        if (!this._gameObject.hide && this.mousemove)
          this._callEventFunction(this.checkMouseMove(e), this.mousemove.bind(this, e));
      });
    event.setMouseUpEvent((e) => {
        if (!this._gameObject.hide && this.mouseup)
          this._callEventFunction(this.checkMouseUp(e), this.mouseup.bind(this, e));
      });
    event.setMousedownEvent((e) => {
      if (!this._gameObject.hide && this.mousedown)
        this._callEventFunction(this.checkMouseDown(e), this.mousedown.bind(this, e));
    });
  }

  _initTouchEvent() {
    let event = Framework.TouchManager;
    
    // event.setSubject(this);
    event.setTouchendEvent(this.touchend);
    event.setTouchmoveEvent(this.touchmove);
    event.setTouchstartEvent(this.touchstart);
  }

  /**
   * 設定父元件，共用同一個 canvas view
   * @param {GameObject class} Object parent
   */
  setParent(parent) {
    if (parent.type === 'GameObject') {
      this._parentCanvas = parent._tmpCanvas.ctx()
      this._parent = parent
    }
    return this
  }

  /**
   * 提供外部調用 Event function
   *  @param {string} Event type
   *  @param {function} Custom function
   */
  setEvent(eventType, func) {
    this[eventType] = func;
    return this;
  }

  hide() {
    this._gameObject.hide = true;
    this.forceUpdate();
    return this;
  }

  show() {
    this._gameObject.hide = false;
    this.forceUpdate();
    return this;
  }

  //一般不直接使用它, 背景自動繪製
  draw(ctx) {
    let _ctx = this._parentCanvas || ctx;
    let offsetX = this.state.x, offsetY = this.state.y;
    _ctx.save()
    if(!this._gameObject.hide||this._firstRender) {
      if (this._stateUpdate) {
        this._tmpCanvas.ctx().clearRect(0, 0, this._tmpCanvas.element().width, this._tmpCanvas.element().height);
        this.render(this._tmpCanvas.ctx());
      }

      if (this._gameObject.align == 'center') {
        offsetX = this.state.x - this.state.width / 2;
        offsetY = this.state.y - this.state.height / 2;
      }
      if (this.state.scale != 1) {
        _ctx.scale(this.state.scale, this.state.scale)
        _ctx.translate(-this.state.scaleResolveX * this.state.scale, -this.state.scaleResolveY * this.state.scale);
      }
      _ctx.globalAlpha = this.state.opacity;
      _ctx.drawImage(this._tmpCanvas.element(), offsetX, offsetY);
      // 子元件更新時 繪製父元件 todo: 很多子元件時繪製優化
      if (this._parent && this._parent.draw) {
        this._parent.draw(ctx);
      }
      _ctx.restore()
    };
    if (this._stateUpdate)
      this._stateUpdate = false;
    if (this._firstRender)
      this._firstRender = false;
  }
  
  /**
   * 移除元件及相關綁定
   */
  remove() {
    let allElement = Framework.Game._currentLevel._allGameElement;
    let index = allElement.indexOf(this);
    if (index != -1)
      allElement.splice(index, 1);
  }

  /**
   * auto removed
   */
  teardown() {
    this.remove();
    this.mousedown = null;
    this.mouseup = null;
    this.mousedown = null;
    this.click = null;
  }

  /**
   * 共用畫布繪製功能
   */

  //一般可調用 func

  load() {

  }

  update() {
    
  }

  render(ctx) { 
    //this.rootScene.draw();一定要在第一行
    //this.rootScene.draw(parentCtx);
  }

  checkMouseUp(e) {
  }

  checkMouseDown(e) {
  }

  checkClick(e) {
  }

  checkMouseMove(e) {
  }

  checkTouchStart(e) {
  }

  checkTouchEnd(e) {
  }

  mouseup(e) {
  }

  mousedown(e) {
  }

  click(e){
  }

  mousemove(e) {        

  }

  mouseup(e) {
  }

  touchstart(e) {
    //為了要讓Mouse和Touch都有一樣的事件
    //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
    this.mousedown({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  }

  touchend(e) {
  }
  
  touchmove(e) {
  }
}

export default Framework.exClass(Framework.GameObject, new GameObject().transClass());
