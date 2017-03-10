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

  _initMouseEvent() {
    let event = new mouseManager(Framework);
    // event.setSubject(this);
    event.setClickEvent(this.click.bind(this));
    // event.setContextmenuEvent
    if (typeof this.mousemove === "function")
      event.setMouseMoveEvent(this.mousemove.bind(this));
    event.setMouseUpEvent(this.mouseup.bind(this));
    event.setMousedownEvent(this.mousedown.bind(this));
  }

  _initTouchEvent() {
    let event = Framework.TouchManager;
    
    // event.setSubject(this);
    event.setTouchendEvent(this.touchend);
    event.setTouchmoveEvent(this.touchmove);
    event.setTouchstartEvent(this.touchstart);
  }

  load() {

  }

  update() {
    
  }

  render(ctx) { 
    //this.rootScene.draw();一定要在第一行
    //this.rootScene.draw(parentCtx);
  }

  mouseup(e) {

  }

  mousedown(e) {
      
  }

  click(e){
  }

  // mousemove(e) {        

  // }

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
