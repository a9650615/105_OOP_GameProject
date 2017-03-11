import Framework, {ES6Trans} from './framework_es6';
import {Resource} from './constant';
import DirLoader from './modules/DirLoader';
import Text from './components/Text';
import Botton from './components/Botton';
import Image from './components/Image';

class menu extends ES6Trans {
  initialize() {
    this.state = {
      loaded: false,
      positionY: 1,
      positionX: 100
    };

    this.songMenu = [];
  }

 //初始化loadingProgress需要用到的圖片
  initializeProgressResource() {
    this.loading = new Framework.Sprite(Resource.image + 'loading.jpg');
    this.loading.position = {x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2};
      //為了或得到this.loading這個Sprite的絕對位置, 故需要先計算一次(在Game Loop執行時, 則會自動計算, 但因為loadingProgress只支援draw故需要自行計算)                  
  }

  //在initialize時會觸發的事件
  loadingProgress(ctx, requestInfo) {
    this.loading.draw(ctx);
    ctx.font ='90px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.fillText(Math.round(requestInfo.percent) + '%' , ctx.canvas.width / 2 , ctx.canvas.height / 2 + 300);
  }

  load(){
    let t = this;
    new DirLoader().getBeatMapFile().then((beatsMap) => {
      beatsMap.fileArray.forEach((val, i) => {
        let yTop = i * 40;

        t.songMenu.push(new Botton(this).set(
          {
            text: val,
            x: 100,
            y: yTop
          }
        ))
        
        t.setState({
          loaded: true
        });
      })
    });
    
    this.val = new Botton(this).set(
        {
          text: 'val',
          x: 600,
          y: 100,
          textColor: 'white'
        }
      );

    this.background = new Image(this);
  }
  

  update(){
    this.rootScene.update();
    if (this.state.positionX < 700)
    if (this.state.positionY < 500)
    this.setState({
      positionY: this.state.positionY+20
    });
    else 
    this.setState({
      positionY: 1,
      positionX: this.state.positionX + 50
    });
  }

  render(parentCtx) {
    this.val.set({
      text: 'val',
      y: this.state.positionY,
      x: this.state.positionX,
      background: `rgb(${this.state.positionX%255},${this.state.positionY%255},100)`
    });
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

  keydown(e) {
    console.log(e.key)
    if (e.key == "Left")
      this.setState({
        positionX: this.state.positionX - 30
      });
    if (e.key == "Right")
      this.setState({
        positionX: this.state.positionX + 30
      });
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


export default Framework.exClass(Framework.GameMainMenu , new menu().transClass());
