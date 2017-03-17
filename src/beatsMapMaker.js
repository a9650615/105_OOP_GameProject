import fs from 'fs';
import Framework, {ES6Trans} from './framework_es6';
import {Resource, Game} from './constant';
import BeatsMapParser from './modules/BeatsMapParser';
import Text from './components/Text';
import Botton from './components/Botton';
import Rectangle from './components/Rectangle';
import SongParser from './modules/SongParser';

class beatsMapMaker extends ES6Trans {
  initialize(prop) {
    this.state = {
      firstTop: 20,
      showTime: '0 : 00',
      play: false,
      testOffset: 10,
      testX: 200,
      time: 0,
      songBpm: null
    };
    
    this.timer = setInterval(this.sTimer.bind(this), 100);
    this.songFile = null;
    this.song = {};
  }

 //初始化loadingProgress需要用到的圖片
  initializeProgressResource() {             
  }

  //在initialize時會觸發的事件
  loadingProgress(ctx, requestInfo) {
  }

  sTimer(needUpdate) {
    if (this.state.play||needUpdate)
      this.setState({
        showTime: this.song.getFormatTime()
      });
  }

  load(){
    new Rectangle(this).set({
      x: 0,
      y: Game.window.height * 0.5,
      width: Game.window.width,
      height: Game.window.height * 0.5,
      background: '#222222'
    });

    new Rectangle(this).set({
      x: 0,
      y: Game.window.height * 0.2,
      width: Game.window.width,
      height: Game.window.height * 0.3,
      background: '#d3d3d3'
    });

    this.component.track1 = new Rectangle(this).set({
      x: 10,
      y: Game.window.height * 0.54,
      width: Game.window.width-20,
      height: Game.window.height * 0.2,
      background: '#cdd4d8'
    });

    this.component.track2 = new Rectangle(this).set({
      x: 10,
      y: Game.window.height * 0.77,
      width: Game.window.width-20,
      height: Game.window.height * 0.2,
      background: '#cdd4d8'
    });

    new Rectangle(this).set({
      x: (Game.window.width - 4)/2,
      y: Game.window.height*0.2,
      width: 4,
      height: Game.window.height,
      background: '#000'
    });

    this.component.showTimeCenter = new Botton(this).set(
        {
          text: "00:00",
          x: (Game.window.width - 50) / 2,
          y: Game.window.height*0.2 - 50,
          textColor: 'black'
        }
      );

    this.component.play = new Botton(this).set(
        {
          text: "播放",
          x: 50,
          y: this.state.firstTop,
          textColor: 'black'
        }
      ).setEvent('click', (e) => {
        if (!this.state.play) {
          this.song.getPlayer().play();
        } else {
          this.song.getPlayer().pause();
        };
        this.setState({
          play: !this.state.play
        });
      }).hide();

    this.component.turnBack = new Botton(this).set(
        {
          text: "往前 10 秒",
          x: 120,
          y: this.state.firstTop,
          textColor: 'black'
        }
      ).setEvent('click', (e) => {
        this.song.setCurrentTime(this.song.getCurrentTime()-10);
        this.sTimer(true);
      }).hide();

   this.component.fastForward = new Botton(this).set(
        {
          text: "往後 10 秒",
          x: 250,
          y: this.state.firstTop,
          textColor: 'black'
        }
      ).setEvent('click', (e) => {
         this.song.setCurrentTime(this.song.getCurrentTime()+10);
         this.sTimer(true);
      }).hide();

    this.component.reset = new Botton(this).set(
        {
          text: "重置",
          x: 400,
          y: this.state.firstTop,
          textColor: 'black'
        }
      ).setEvent('click', (e) => {
        this.song.setCurrentTime(0);
        this.sTimer(true);
        // this.setState({
        //   time: 0
        // });
      }).hide();

    this.component.timer = new Botton(this).set(
        {
          text: "00:00 / 00:00",
          x: 550,
          y: this.state.firstTop,
          textColor: 'black'
        }
      ).hide();
    
    this.component.uploader = new Botton(this).set(
        {
          text: "選擇歌曲",
          x: 700,
          y: this.state.firstTop,
          textColor: 'black'
        }
      ).setEvent('click', (e) => {
        let file = document.createElement('input');
        file.setAttribute("type", "file");
        file.addEventListener("change", () => {
          let dir = `${Resource.songs}tmp/`;
          let files = file.files[0];
          this.songFile = files;

          if (!fs.existsSync(dir)){
              fs.mkdirSync(dir);
          }
          var t = this;
          let fileReader = new FileReader();
          fileReader.onload = function() {
            fs.writeFileSync(dir+'song', Buffer.from(new Uint8Array(this.result)));
            t.song = new SongParser(dir+'song', files.name, () => {
              t.sTimer(true);
            });
            t.forceUpdate();
          };
          fileReader.readAsArrayBuffer(files);
        }, false);
        file.click();
      });
      
     this.component.songName = new Botton(this).set(
        {
          text: "尚未選擇歌曲",
          x: 850,
          y: this.state.firstTop,
          textColor: 'black'
        }
      )
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
    if (this.songFile) {
      this.component.play.show();
      this.component.turnBack.show();
      this.component.fastForward.show();
      this.component.reset.show();
      this.component.timer.show();
    }
    this.component.songName.set({
      text: this.songFile?this.songFile.name:"尚未選擇歌曲"
    });
    
    this.component.timer.set({
      text: this.state.showTime
    });
    this.component.play.set({
      text: this.state.play?'暫停':'播放'
    });
    if (this.song.getCurrentTime)
      this.component.showTimeCenter.set({
        text: this.song.getFormatCurrentTime(),
        width: (Game.window.width-this.component.showTimeCenter.getWidth())/2
      });
  }

  onkeydown(e) {
   
  }
}


export default Framework.exClass(Framework.Level , new beatsMapMaker().transClass());
