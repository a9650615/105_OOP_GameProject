import {ES6Trans} from '../framework_es6';

export default class Element extends ES6Trans {
  constructor(prop) {
    super(prop);
    // prop.update = () => {
    // //   max call stack 
    // //  TODO: Fix IT
    //   prop.update();
    //   this.update();
    // }
    
   this.super = prop;
   this.initialize();
   prop.rootScene.attach(this);
   this.load.call(this, prop);
   return this;
  }

  initialize() {

  }

  load() {
    
  }

  draw(ctx) {
    
  }

  update() {

  }

  click(e) {
    
  }
}