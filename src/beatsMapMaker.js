import fs from 'fs';
import Framework, {ES6Trans} from './framework_es6';
import {Resource, Game} from './constant';
import BeatsMapParser from './modules/BeatsMapParser';
import Text from './components/Text';
import Botton from './components/Button';
import TextInput from './components/TextInput';
import Rectangle from './components/Rectangle';
import SongParser from './modules/SongParser';
import StaticData from './helper/StaticData'

class beatsMapMaker extends ES6Trans {
  load(){
    this.state = {
      firstTop: 20,
      showTime: '0 : 00',     
      play: false,
      time: 0,
      offset: 0.5,
      timeLine: 5,//切成幾單位, 但會根據 bpm 加線
      currentStep: 0, // 目前播放節拍介於
      loaded: false
    };
    
    this.audio = new Framework.Audio({
      clap:{
        wav: Resource.sounds+'clap.wav'
      }
    });

   /* this.audio.setVolume('clap', 0.5);*/

    this.component.timeLine = [];
    //this.timeStamp = null;
    this.songFile = null;
    this.song = new SongParser();
    this.mapSetting = {
      difference: 0.39, //誤差值 一般好像是 60/BPM
      bpm: 170, // 範例歌曲 カラフル。
      songOffset: 0,
      isClapOn: false,
      tmpSongName: null
    };
    this.beatsMap = [
      // {
      //   align: 0,
      //   time: 12.00,
      //   type: 0,// or1
      //   endTime:14.00
      // }
    ];     
  }

  initializeProgressResource(prop) {
    
  }

  //初始化loadingProgress需要用到的圖片
  initialize() {
    let Scene = this;
    //下半塊背景
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
    
    this.component.bpmLabel = new Botton(this).set(
        {
          text: "bpm 速度:",
          x:  30,
          y: this.state.firstTop+50,
          textColor: 'black'
        }
      ).hide();
    
    this.component.bpmSelector = new TextInput(this).setStyle({
        x: 100,
        y: this.state.firstTop+25,
        borderBottom: '1px solid #ccc',
        width: 40
      }).set({
        attr:{
          type: 'number',
          min: 1,
          max: 400
        }
      }).setEvent('change', (e, t) => {
        Scene.mapSetting.bpm = t.value();
        Scene.mapSetting.difference = 60/t.value();
        Scene.forceUpdate();
      }).value(this.mapSetting.bpm).hide();

      this.component.stepLabel = new Botton(this).set(
        {
          text: "畫面節拍數:",
          x:  250,
          y: this.state.firstTop+50,
          textColor: 'black'
        }
      ).hide();

      this.component.stepSelector = new TextInput(this).setStyle({
        x: 260,
        y: this.state.firstTop+25,
        borderBottom: '1px solid #ccc',
        width: 40
      }).set({
        attr:{
          type: 'number',
          min: 1,
          max: 27,
          step: 2
        }
      }).setEvent('change', (e, t) => {
        /*Scene.state.timeLine = t.value();
        Scene.forceUpdate();*/
        this.loadStepLine(t.value());
      }).value(this.state.timeLine).hide();
      
      this.component.offsetLabel = new Botton(this).set(
        {
          text: "開始時間:",
          x:  Game.window.width * 0.55,
          y: this.state.firstTop+50,
          textColor: 'black'
        }
      ).hide();

      this.component.offsetSelector = new TextInput(this).setStyle({
        x: 550,
        y: this.state.firstTop+25,
        borderBottom: '1px solid #ccc',
        width: 40
      }).set({
        attr:{
          type: 'number',
        }
      }).setEvent('change', (e, t) => {
        /*Scene.state.timeLine = t.value();
        Scene.forceUpdate();*/
        this.mapSetting.songOffset = Number(t.value())
      }).hide()

      this.loadStepLine(this.state.timeLine, true);

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
            x: 380,
            y: this.state.firstTop,
            textColor: 'black'
          }
        ).setEvent('click', (e) => {
          this.song.setCurrentTime(0);
          this.sTimer(true);
          this.update();
          // this.setState({
          //   time: 0
          // });
        }).hide();
  //
        this.component.clapswitch = new Botton(this).set(
          {
            text: "節拍音",
            x: 445,
            y: this.state.firstTop,
            textColor: 'black'
          }
        ).setEvent('click', (e) => {
          this.mapSetting.isClapOn= !this.mapSetting.isClapOn;
          this.forceUpdate();
        }).hide();
  //

    this.component.timer = new Botton(this).set({
        text: "00:00 / 00:00",
        x: 550,
        y: this.state.firstTop,
        textColor: 'black'
      }).hide();
        
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
              t.mapSetting.tmpSongName = 'song'+ Math.random();
              fs.writeFileSync(dir+t.mapSetting.tmpSongName, Buffer.from(new Uint8Array(this.result)));
              t.song.setUrl(dir+t.mapSetting.tmpSongName, files.name, () => {
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

    this.component.save = new Botton(this).set(
      {
        text: "儲存",
        x: Game.window.width * 0.85,
        y: this.state.firstTop + 50,
        textColor: 'black'
      }
    ).setEvent('click', this.saveBeatsMap.bind(this)).hide();

    // this.component.saveAndBack = new Botton(this).set(
    //   {
    //     text: "儲存回選單",
    //     x: Game.window.width * 0.9,
    //     y: this.state.firstTop + 50,
    //     textColor: 'black'
    //   }
    // ).setEvent('click', (() => {
    //   this.saveBeatsMap()
    //   StaticData.set('needMenuReload', true)
    //   this.song.getPlayer().pause()
    //   this.exit()
    //   Framework.Game.goToLevel("selectMusic")
    // }).bind(this)).hide();

    this.component.exit = new Botton(this).set(
      {
        text: "離開",
        x: Game.window.width * 0.8,
        y: this.state.firstTop + 50,
        textColor: 'black'
      }
    ).setEvent('click', (() => {
      this.exit()
      Framework.Game.goToLevel("selectMusic")
    }).bind(this));
      
    this.setState({loaded: true})
  }

  saveBeatsMap() {
    let tmpData = Object.assign({}, this.mapSetting);
    let currentTime = this.song.getCurrentTime();
    tmpData.beatsMap = {};
    this.beatsMap.forEach((val, i) => {
      tmpData['beatsMap'][i] = Object.assign({}, val);
      delete tmpData['beatsMap'][i]['element'];
    });
    new BeatsMapParser(tmpData).save(this.songFile.name, this.songFile.name).then((object) => {
      this.song.setUrl(object.path, object.songFile, () => {
        // t.sTimer(true);
        this.song.setCurrentTime(currentTime);
        (this.state.play) ? this.song.getPlayer().play(): this.song.getPlayer().pause();
      });
      
      this.exit()
    });
  }

  //在initialize時會觸發的事件
  loadingProgress(ctx, requestInfo) {
  }

  // update show timer
  sTimer(needUpdate) {
    if (this.state.play||needUpdate) {
      this.setState({
        showTime: this.song.getFormatTime()
      });
      //this.timeStamp = (new Date()).getTime();
    }
    this.state.time = this.song.getCurrentTime();
  }

  setBeatMapBlock(align, type, time = {}) {
    let i, error = 0, beatsMap = this.beatsMap;
    let elementHeight = Game.window.height * 0.2;
    for (i = 0;i<beatsMap.length;i++) {
      if (beatsMap[i].time > time.start) {
        break;
      } else if(beatsMap[i].time == time.start && beatsMap[i].align == align && beatsMap[i].type == type) {
        console.log('好像有一樣的');
        error = 1;
      }
    }
    if(!error)
      beatsMap.splice(i, 0, {
        align: align,
        type: type,
        time: time.start,
        endTime: time.end,
        startStep: this.state.currentStep,
        endStep: 0,
        element:  
          new Rectangle(this).set({
            x: 0,
            y: Game.window.height * ((align==0)? 0.54: 0.77),
            width: Game.window.width/(this.state.timeLine * 2),
            height: elementHeight,
            /*background: '#'+Math.floor(Math.random()*16777215).toString(16)//'#708ebf'*/
           background: '#'+Math.floor(16207872).toString(16) 
          }).hide()
      });
    this.forceUpdate();
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
    
    if(song.hasSong())
    switch(e.keyCode) {
      case 38: //up
          song.setCurrentTime(currentTime + 10);
        break;
      case 40: //down
          song.setCurrentTime(currentTime - 10);
        break;
      case 37: //left
          song.setCurrentTime(currentTime - 60/this.mapSetting.bpm);
          this.update();
          this.forceUpdate();
        break;
      case 39: //right
          song.setCurrentTime(currentTime + 60/this.mapSetting.bpm);
          this.update();
          this.forceUpdate();
        break;
      case 32: //space
         this.togglePlay();
        break;
      case 81: //Q 左區塊單點
         this.setBeatMapBlock(0, 0, {start: this.state.currentStep * (60/this.mapSetting.bpm)});
         console.log(this.song.getCurrentTime())
        break;
      case 69: //E 右區塊單點
         this.setBeatMapBlock(1, 0, {start: this.state.currentStep * (60/this.mapSetting.bpm)});
        break;
      case 65: //A 左區塊長擊
        break;
      case 68: //D 右區塊長擊
        break;
      case 83: //S 左右連擊
        break;
    }
  }

  loadStepLine(number, force = false){
    if(number>this.state.timeLine || force)
    for(let i = (force)?0:this.state.timeLine; i <= (number+this.mapSetting.bpm/60+1); i++) {
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
    if(number<this.state.timeLine)
    for(let i = this.state.timeLine; i <= (number+this.mapSetting.bpm/60+1); i++) {
      if (this.component.timeLine[i])
      this.component.timeLine[i].hide();
    }
    this.setState({
      timeLine: number
    });
  }
  
  fresh(){
    let fixCurrentTime = this.song.getCurrentTime()-this.mapSetting.songOffset;
    let revertBpm = 60/this.mapSetting.bpm;
    let step = parseInt(fixCurrentTime / revertBpm);
    //console.log((this.song.getCurrentTime()-this.mapSetting.songOffset)%(60/this.mapSetting.bpm));
    // update current step
    this.sTimer();
    if (this.state.play && fixCurrentTime % revertBpm <= revertBpm && step != this.state.currentStep && this.mapSetting.isClapOn){
      this.audio.play({name: 'clap', loop: false});
    }
    this.state.currentStep = step;
  }

  render(parentCtx) {
    if (this.state.loaded) {
      if (this.songFile) {
        this.component.play.show();
        this.component.turnBack.show();
        this.component.fastForward.show();
        this.component.reset.show();
        this.component.clapswitch.show();
        this.component.timer.show();
        this.component.bpmSelector.show();
        this.component.bpmLabel.show();
        this.component.stepLabel.show();
        this.component.stepSelector.show();
        this.component.save.show();
        this.component.offsetLabel.show()
        this.component.offsetSelector.show()
        // this.component.saveAndBack.show()
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
      this.component.clapswitch.set({
        textColor: this.mapSetting.isClapOn?'#c43427': '#000'
      });

      let parts = (this.state.timeLine+this.mapSetting.bpm/60+1);
      let speed = this.state.offset-(this.song.getCurrentTime()%(60/this.mapSetting.bpm))*(this.mapSetting.bpm/60);
      for(let i = 0; i <= (this.state.timeLine+this.mapSetting.bpm/60+1); i++) {
        if (this.component.timeLine[i])
        this.component.timeLine[i].set({
          x: ((Game.window.width - 22)/this.state.timeLine)*(i+speed)+10
        });
      }

      this.beatsMap.forEach((val, i) => {
        if (val.startStep > (this.state.currentStep-parts/2) && val.startStep < (this.state.currentStep+parts/2)) {
          let nowInScreenStep = val.startStep - this.state.currentStep + parseInt(this.state.timeLine/2);
          
          val.element.set({
            x: ((Game.window.width - 22)/this.state.timeLine)*(nowInScreenStep+speed)+10,
            width: Game.window.width/(this.state.timeLine * 2)
          }).show();
        } else {
          val.element.hide();
        }
      });

      if (this.song)
        this.component.showTimeCenter.set({
          text: this.song.getFormatCurrentTime(2),
          width: (Game.window.width-this.component.showTimeCenter.getWidth())/2
        });
    }
  }

  exit() {
    this.component.bpmSelector.remove();
    this.component.stepSelector.remove();
    this.component.offsetSelector.remove();
  }
  
  // autodelete() {
  //   //臨時移除方式
    
  // }
}


export default Framework.exClass(Framework.Level , new beatsMapMaker().transClass());
