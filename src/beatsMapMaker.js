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
    // framework 太廢 不穩定 改到 initializeProgressResource 去
  }

  //初始化loadingProgress需要用到的圖片
  initializeProgressResource() {
     this.state = {
      firstTop: 20,
      showTime: '0 : 00',     
      play: false,
      tmpSongName: '',
      testX: 200,
      time: 0,
      offset: 0.5,
      timeLine: 5//以秒為單位  整個畫面要包含幾秒 有bug 不是３的時候會算不準
    };
    
    this.timeStamp = null;
    this.songFile = null;
    this.song = new SongParser();
    this.mapSetting = {
      difference: 0.39, //誤差值 一般好像是 60/BPM
      bpm: 170, // 範例歌曲 カラフル。
      songOffset: 5
    };
    this.beatsMap = {};          
  }

  //在initialize時會觸發的事件
  loadingProgress(ctx, requestInfo) {
  }

  // update show timer
  sTimer(needUpdate) {
    if (this.state.play||needUpdate) {
      this.setState({
        showTime: this.song.getFormatTime(),
        time: this.song.getCurrentTime()
      });
      this.timeStamp = (new Date()).getTime();
    }
  }

  setBeatMapBlock(type, time = {}) {

  }

  togglePlay() {
    if (!this.state.play) {
      this.song.getPlayer().play();
    } else {
      this.song.getPlayer().pause();
    };
    this.setState({
      play: !this.state.play
    });
  }

  onkeydown(e) {
    let song = this.song;
    let currentTime = song.getCurrentTime();
    
    if(song)
    switch(e.keyCode) {
      case 38: //up
          song.setCurrentTime(currentTime + 10);
        break;
      case 40: //down
          song.setCurrentTime(currentTime - 10);
        break;
      case 37: //left
          song.setCurrentTime(currentTime - 60/this.mapSetting.bpm);
        break;
      case 39: //right
          song.setCurrentTime(currentTime + 60/this.mapSetting.bpm);
        break;
      case 32: //space
         this.togglePlay();
        break;
      case 81: //Q 左區塊單點
          
        break;
      case 69: //E 右區塊單點
        break;
      case 65: //A 左區塊長擊
        break;
      case 68: //D 右區塊長擊
        break;
      case 83: //S 左右連擊
        break;
    }
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

    this.component.timeLine = [];

    for(let i = 0; i <= (this.state.timeLine+this.mapSetting.bpm/60+1); i++) {
      this.component.timeLine.push(
        new Rectangle(this).set({
          x: ((Game.window.width - 24)/this.state.timeLine)*(i)+10,
          y: Game.window.height*0.5,
          width: 2,
          height: Game.window.height*0.5,
          background: '#c5eae8'
        })
      );
    }
    
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
       this.togglePlay();
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
          if (file.files.length) {
            this.songFile = files;

            if (!fs.existsSync(dir)){
              fs.mkdirSync(dir);
            } else {
              fs.readdir(dir, function(err, files) {
                files.forEach((file) => {
                  fs.unlinkSync(dir+file);
                })
              });
            }
            var t = this;
            let fileReader = new FileReader();
            fileReader.onload = function() {
              t.state.tmpSongName = 'song'+ Math.random();
              fs.writeFileSync(dir+t.state.tmpSongName, Buffer.from(new Uint8Array(this.result)));
              t.song.setUrl(dir+t.state.tmpSongName, files.name, () => {
                t.sTimer(true);
              });
              t.forceUpdate();
            };
            fileReader.readAsArrayBuffer(files);
          };
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
    this.sTimer();
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
    let speed = this.state.offset-(this.song.getCurrentTime()%(1*60/this.mapSetting.bpm))*(this.mapSetting.bpm/60);
    for(let i = 0; i <= (this.state.timeLine+this.mapSetting.bpm/60+1); i++) {
      this.component.timeLine[i].set({
        x: ((Game.window.width - 22)/this.state.timeLine)*(i+speed)+10
      });
    }

    if (this.song)
      this.component.showTimeCenter.set({
        text: this.song.getFormatCurrentTime(2),
        width: (Game.window.width-this.component.showTimeCenter.getWidth())/2
      });
  }
}


export default Framework.exClass(Framework.Level , new beatsMapMaker().transClass());
