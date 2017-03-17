import Framework, {ES6Trans} from './framework_es6';
import {Resource} from './constant';
import BeatsMapParser from './modules/BeatsMapParser';
import Text from './components/Text';
import Botton from './components/Botton';
import Rectangle from './components/Rectangle';

class beatsMapMaker extends ES6Trans {
  initialize(prop) {
    this.state = {
      firstTop: 20,
      time: 0,
      play: false,
      testOffset: 10,
      testX: 200
    };
    
    this.timer = setInterval(this.songTimer.bind(this), 100);
  }

 //初始化loadingProgress需要用到的圖片
  initializeProgressResource() {             
  }

  //在initialize時會觸發的事件
  loadingProgress(ctx, requestInfo) {
  }

  songTimer() {
    if (this.state.play)
    this.setState({
      time: this.state.time + 1
    });
  }

  load(){
    new Rectangle(this).set({
      x: 0,
      y: 200,
      width: Framework.Game.getCanvasWidth(),
      height: Framework.Game.getCanvasHeight()-200,
      background: '#516060'
    });

    this.component.center = new Rectangle(this).set({
      x: this.state.testX,
      y: 200,
      width: 100,
      height: Framework.Game.getCanvasHeight()-200,
      background: '#845f4e'
    });

    this.component.play = new Botton(this).set(
        {
          text: "播放",
          x: 50,
          y: this.state.firstTop,
          textColor: 'black'
        }
      ).setEvent('click', (e) => {
        this.setState({
          play: !this.state.play
        });
      });

    new Botton(this).set(
        {
          text: "往前 10 秒",
          x: 120,
          y: this.state.firstTop,
          textColor: 'black'
        }
      ).setEvent('click', (e) => {
        this.setState({
          time: this.state.time - 10
        });
      });

   new Botton(this).set(
        {
          text: "往後 10 秒",
          x: 250,
          y: this.state.firstTop,
          textColor: 'black'
        }
      ).setEvent('click', (e) => {
        this.setState({
          time: this.state.time + 10
        });
      });

    new Botton(this).set(
        {
          text: "重置",
          x: 400,
          y: this.state.firstTop,
          textColor: 'black'
        }
      ).setEvent('click', (e) => {
        this.setState({
          time: 0
        });
      });

    this.component.timer = new Botton(this).set(
        {
          text: "00:00 / 00:00",
          x: 600,
          y: this.state.firstTop,
          textColor: 'black'
        }
      ).setEvent('click', (e) => {
        
      });
  }
  

  update(){
    this.rootScene.update();
    if (this.state.testX > Framework.Game.getCanvasWidth() - 100||this.state.testX <= 0) 
      this.setState({
        testOffset: this.state.testOffset * -1
      });
    if (this.state.play)
    this.setState({
      testX: this.state.testX + this.state.testOffset
    });
  }

  render(parentCtx) {
    this.component.center.set({
      x: this.state.testX
    });
    this.component.timer.set({
      text: this.state.time
    });
    this.component.play.set({
      text: this.state.play?'暫停':'播放'
    });
  }

  onkeydown(e) {
   
  }
}


export default Framework.exClass(Framework.Level , new beatsMapMaker().transClass());
