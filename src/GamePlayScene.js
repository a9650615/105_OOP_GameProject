import Framework, {ES6Trans} from './framework_es6';
import {Resource, Game} from './constant';
import BeatsMapParser from './modules/BeatsMapParser';
import SongParser from './modules/SongParser';
import Img from './components/Img';
import Sprite from './components/Sprite';
import Stage from './components/Stage';
import SilderStage from './components/SilderStage';
import Botton from './components/Botton';

class GamePlayScene extends ES6Trans {
  initializeProgressResource() {
    this.state = {
      frame: 0,
      hp: 100, //百分比
      loaded: false,
      play: false,
      currentStep: 0
    };

    this.beatsMap = {};
    this.song = new SongParser();
    let songFolder = Resource.songs+'沢井美空 - カラフル/';
    new BeatsMapParser(songFolder+'沢井美空 - カラフル[default].json').then((data) => {
      this.beatsMap = data;
      this.beatsMap.beatsMap = Object.keys(this.beatsMap.beatsMap).map((index) => {
        return this.beatsMap.beatsMap[index];
      });
      this.song.setUrl(songFolder+this.beatsMap.songFile, this.beatsMap.songFile, () => {
        this.setState({
          loaded: true,
          play: true
        });
        this.component.silderStage.loadbeatsMap(this.beatsMap);
        this.playSong();
      });
    });
  }

  characterUpdate() {
    let list = [1,2,3,4,5,6,4,3,2,1];
    this.setState({
      frame: this.state.frame+0.1
    });
    if(this.state.frame>list.length) 
      this.setState({
        frame: 1
      });
    this.component.character.showPiece(list[parseInt(this.state.frame)]);
  }

  playSong() {
    if (this.song.getPlayer().paused)
      this.song.getPlayer().play(); // 播放歌曲
  }

  load() {
    let GameWidth = Game.window.width, GameHeight = Game.window.height;
    new Img(this).set({
      url: Resource.image+'/background.jpg',
      x: 0,
      y: -200,
      width: 1920
    });
   
    this.component = {
      stage: new Stage(this),
      silderStage: new SilderStage(this).set({
        x: 10,
        y: Game.window.height * 0.525,
        width: Game.window.width - 20,
        height: (Game.window.height*0.45),
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
        textColor: 'red',
        text: 'debbug text'
      })
    };

  }

  update() {
    this.characterUpdate();
    if(this.state.hp>0) {
      // 扣血範例
      this.setState({
        hp: this.state.hp - 0.01
      });
    }
  }

  render() {
    this.component.stage.set({
      hp: this.state.hp
    });
    if (this.state.play) {
      let fixCurrentTime = this.song.getCurrentTime()-this.beatsMap.songOffset;
      let revertBpm = 60/this.beatsMap.bpm;
      let step = parseInt(fixCurrentTime / revertBpm);
      this.state.currentStep = step;
      this.component.debugText.set({
        text: 'step:'+step
      });
      this.component.silderStage.setCurrentTime(this.song.getCurrentTime());
    }
  }
}

export default Framework.exClass(Framework.Level , new GamePlayScene().transClass());
