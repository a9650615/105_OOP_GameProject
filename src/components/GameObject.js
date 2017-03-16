import Framework, {ES6Trans} from '../framework_es6';
import {mouseManager} from '../../framework/MouseManager';
import Canvas from './Canvas';

class GameObject extends ES6Trans{
  __construct(prop) {
    this._tmpCanvas = new Canvas();
    this._tmpContent = this._tmpCanvas.ctx();
    
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
      this._callEventFunction(this.checkClick(e), this.click.bind(this, e));
    });
    // event.setContextmenuEvent
    if (typeof this.mousemove === "function")
      event.setMouseMoveEvent((e) => {
        this._callEventFunction(this.checkMouseMove(e), this.mousemove.bind(this, e));
      });
    event.setMouseUpEvent((e) => {
        this._callEventFunction(this.checkMouseUp(e), this.mouseup.bind(this, e));
      });
    event.setMousedownEvent((e) => {
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
   * 提供外部調用 Event function
   *  @param {string} Event type
   *  @param {function} Custom function
   */
  setEvent(eventType, func) {
    this[eventType] = func;
    return this;
  }

  //一般不直接使用它, 背景自動繪製
  draw(ctx) {
    this.render(ctx);
  }

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
