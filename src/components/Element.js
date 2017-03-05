export default class Element {
  constructor(prop) {
    
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