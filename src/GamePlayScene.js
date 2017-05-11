import Framework, {ES6Trans} from './framework_es6';
import {Resource, Game} from './constant';
import BeatsMapParser from './modules/BeatsMapParser';
import SongParser from './modules/SongParser';
import Img from './components/Img';
import Sprite from './components/Sprite';
import Stage from './components/Stage';
import SilderStage from './components/SilderStage';
import Botton from './components/Button';
import devTools from './helper/devTool';
import StaticData from './helper/StaticData';
import Ani from './helper/Ani';

class GamePlayScene extends ES6Trans {
  initialize() {
    let preLoad = StaticData.load('playSceneData')
    let songFolder = Resource.songs+preLoad.songName+'/';
    // console.log(songFolder+preLoad.songMeta[0].beatsFile)
    this.ani = new Ani();
    new BeatsMapParser(songFolder+preLoad.songMeta[0].beatsFile).then((data) => {
      this.beatsMap = data;
      this.beatsMap.beatsMap = Object.keys(this.beatsMap.beatsMap).map((index) => {
        return this.beatsMap.beatsMap[index];
      });
      
      this.beatsMap.endStep = this.beatsMap.beatsMap[this.beatsMap.beatsMap.length - 1].startStep
      this.song.setUrl(songFolder+this.beatsMap.songFile, this.beatsMap.songFile, () => {
        this.setState({
          loaded: true,
          play: true
        });
        this.component.silderStage.loadbeatsMap(this.beatsMap);
        if (!Game.debug)
          this.playSong();
      });
    });
    this.beatsTypeImg = ['beats_miss','beats_crit_great', 'beats_great', 'beats_good', 'beats_bad'];
    Framework.ResourceManager.loadImage({id: 'beats_great',url: `${Resource.image}/Great.png`})
    Framework.ResourceManager.loadImage({id: 'beats_bad',url: `${Resource.image}/bad.png`})
    Framework.ResourceManager.loadImage({id: 'beats_crit_great',url: `${Resource.image}/Critical_Great.png`})
    Framework.ResourceManager.loadImage({id: 'beats_good',url: `${Resource.image}/good.png`})
    Framework.ResourceManager.loadImage({id: 'beats_miss',url: `${Resource.image}/miss.png`})
  }

  loadingProgress(ctx, requestInfo) {
    
  }

  characterUpdate() {
    let list = [1,2,3,4,5,6,4,3,2,1];
    this.setState({
      frame: this.state.frame+0.1
    });
    if(this.state.frame > list.length) 
      this.setState({
        frame: 1,
        characterFaceTo: (this.state.characterFaceTo)? 0: 1
      });
    this.component.character.flip(this.state.characterFaceTo);
    this.component.character.showPiece(list[parseInt(this.state.frame)]);
  }

  playSong() {
    if (this.song.getPlayer().paused)
      this.song.getPlayer().play(); // 播放歌曲
  }

  load() {
    this.state = {
      frame: 0,
      hp: 100, //百分比
      combo: 0, // 連擊
      loaded: false,
      play: false,
      currentStep: 0,
      hpWidth: 5,
      totalScore: 0,
      characterFaceTo: 0,
      stageOpacity: 1,
      endStateRange: 15,
      endTimeOut: 0, // 距離結束 beat 過了多久
    };

    this.beatsMap = {};
    this.song = new SongParser();
    
    let GameWidth = Game.window.width, GameHeight = Game.window.height;
   
    this.component = {
      background: new Img(this).set({
        url: Resource.image+'/background.jpg',
        x: 0,
        y: -200,
        width: 1920
      }),
      stage: new Stage(this).set({
        hpWidth: this.state.hpWidth
      }),
      silderStage: new SilderStage(this).set({
        x: 10,
        y: Game.window.height * 0.525,
        width: Game.window.width - 20,
        height: (Game.window.height*0.45),
        hpWidth: this.state.hpWidth
      }),
      character: new Sprite(this).set({
        url: Resource.image+'bisca_battler_rpg_maker_mv_by_retrospriteresources-dagd3xg.png',
        wPiece: 9,
        hPiece: 6,
        sprWidth: 120,
        sprHeight: 120,
        x: (Game.window.width-120)/2,
        y: GameHeight * 0.2
      }),
      debugText: new Botton(this).set({
        x: 100,
        y: 30,
        textColor: 'white',
        text: 'debbug text'
      }),
      scoreText: new Botton(this).set({
        x: 100,
        y: 50,
        textColor: 'white',
        text: 'debbug text'
      }),
      beatsType: new Img(this).set({
        width: 100,
        x: Game.window.width * 0.8,
        y: 50,
        scale: 1.2,
        scaleResolveX: 200,
        scaleResolveY: 10,
        // url: `${Resource.image}/Great.png`
      })
    };

    // if (Game.debug)
    //   this.devTools = new devTools(this);
  }

  onBeat(returnKey) {
    if (returnKey > -1) {
      this.component.beatsType.changeImg(this.beatsTypeImg[returnKey])
      this.ani.fromTo({opacity: 0, scale: 1},{opacity: 1, scale: 1.2}, 0.3, (data) => {
        this.component.beatsType.set(data)
      }, 'beat').then(() => {
        this.ani.fromTo({opacity: 1},{opacity: 0}, 0.5, (data) => {
          this.component.beatsType.set(data)
        }, 'fade', 1)
      })
    }
  }
  
  onkeydown(e) {
    let keyCode = Game.keyCode;
    switch(e.keyCode) {
      case keyCode.leftHit:
        this.component.silderStage.keyHit(0, (returnKey) => {
          this.onBeat(returnKey)
          console.log(returnKey);
        });
        this.component.stage.clickEffect(0)
        this.component.stage.component.stageLeftClick.show()
        break;
      case keyCode.rightHit:
        this.component.silderStage.keyHit(1, (returnKey) => {
          this.onBeat(returnKey)
          console.log(returnKey);
        });
        this.component.stage.clickEffect(1)
        this.component.stage.component.stageRightClick.show()
        break;
      case 32:
        let player = this.song.getPlayer();
        if (Game.debug) {
          if (player.paused) {
            player.play()
            this.setState({play: true})
          }
          else {
            player.pause()
            this.setState({play: false})
          }
        }
        break;
    }
  }

  onkeyup(e) {
    let keyCode = Game.keyCode;
    switch(e.keyCode) {
      case keyCode.leftHit:
        this.component.stage.clickEffect(0)
        this.component.stage.component.stageLeftClick.hide()
        break;
      case keyCode.rightHit:
        this.component.stage.clickEffect(1)
        this.component.stage.component.stageRightClick.hide()
    }
  }

  fresh() {
    this.characterUpdate();
    // if (this.devTools) {
    //   this.devTools.update();
    // }
    if (this.state.play) {
      if(this.state.hp>0) {
        // 扣血範例
        // this.setState({
        //   hp: this.state.hp - 0.01
        // });
      }
      let silder = this.component.silderStage;
      this.state.totalScore = Math.round(1000000 * (silder.getScore()));
    }

    this.ani.update()
  }

  render() {
    this.component.stage.set({
      hp: this.state.hp
    });
    if (this.state.play) {
      let fixCurrentTime = this.song.getCurrentTime()-this.beatsMap.songOffset;
      let revertBpm = 60/this.beatsMap.bpm;
      let step = (fixCurrentTime / revertBpm).toFixed(2);
      this.state.currentStep = step;
      this.component.silderStage.setCurrentTime(fixCurrentTime, step);
      this.component.debugText.set({
        text: 'step:'+step
      });
      this.component.scoreText.set({
        text: 'score:'+this.state.totalScore
      });
      if (step > this.beatsMap.endStep + this.state.endStateRange) {
        this.ani.fromTo({stageOpacity: 1},{stageOpacity: 0}, 0.5, (data) => {
          this.setState(data)
        }, 'beat').then(() => {
          this.song.getPlayer().pause()
          Framework.Game.goToLevel("selectMusic")
        })
        this.setState({play: false})
      }
    } else {
      this.component.stage.set({
        opacity: this.state.stageOpacity
      })
      this.component.silderStage.set({
        opacity: this.state.stageOpacity
      })
      this.component.character.set({
        opacity: this.state.stageOpacity
      })
      this.component.debugText.set({opacity: this.state.stageOpacity})
      this.component.scoreText.set({opacity: this.state.stageOpacity})
      this.component.background.set({opacity: this.state.stageOpacity})
    }
  }
}

export default Framework.exClass(Framework.Level, new GamePlayScene().transClass());
