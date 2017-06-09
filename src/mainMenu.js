import Framework, {ES6Trans} from './framework_es6';
import { Resource , Game } from './constant';
import DirLoader from './modules/DirLoader';
import BeatsMapParser from './modules/BeatsMapParser';
import Text from './components/Text';
import Button from './components/Button';
import Img from './components/Img';
import Rect from './components/Rectangle'
import StaticData from './helper/StaticData';
import SelectCard from './components/SelectCard';
import Ani from './helper/Ani'

class menu extends ES6Trans {
  initialize() {
    
  }

 //初始化loadingProgress需要用到的圖片
  initializeProgressResource() {
    // this.loading = new Framework.Sprite(Resource.image + 'loading.jpg');
    // this.loading.position = {x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2};
    // console.log(this.loading)
      //為了或得到this.loading這個Sprite的絕對位置, 故需要先計算一次(在Game Loop執行時, 則會自動計算, 但因為loadingProgress只支援draw故需要自行計算)                  
  }

  //在initialize時會觸發的事件
  loadingProgress(ctx, requestInfo) {
    // this.loading.draw(ctx);
    ctx.font ='90px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.fillText(Math.round(requestInfo.percent) + '%' , ctx.canvas.width / 2 , ctx.canvas.height / 2 + 300);
  }

  load(){
    this.state = {
      loaded: false,
      positionY: 1,
      positionX: 100,
      selectIndex: 0,
      load: false,
      aniSelect: 0, // 動畫效果
      isPress: false
    };

    this.ani = new Ani()
    this.songMenu = [];
    this.songCover = [];
    this.component = {    
      background: new Img(this).set({
        url: Resource.image+'/menu_background.jpg',
        x: 0,
        y: 0  ,
        width: 1280,
        height: 720
      }),

      selectStage: new Button(this).set({
        text: "選擇關卡",
        x: 30,
        y: 30,
        textColor: 'white'
      }).setEvent('click', (e) => {
        // StaticData.set('playSceneData', {
        //   song: '123',
        //   dir: '321'
        // })
        // // console.log(StaticData.load('playSceneData'))
        // Framework.Game.goToLevel("GamePlayScene")
      }),
      selectCard: new SelectCard(this).set({
        width: Game.window.width * 0.3,
        height: Game.window.height - 20,
        x: 200,
        y: 10
      }),
      
      coverBackground: new Rect(this).set({
          width: 410,
          height: 410,
          x: Game.window.width * 0.5 - 5,
          y: Game.window.height * 0.5 - 205,
          // x: this.state.x,
          background: '#5F5F5F'
      }),
      
      cover: new Img(this).set({
        url: Resource.image+'/cover.jpg',
        x: Game.window.width * 0.5,
        y: Game.window.height * 0.5 - 200,
        width: 400,
        height: 400
      })
    }
    let t = this;

    if(Game.client === 'client'){
      this.component.goEditor = new Button(this).set({ 
          text: "編輯器", 
          x: 30, 
          y: 70, 
          textColor: 'black', 
          background: '#ccc', 
      }).setEvent('click', (e) => { 
        // StaticData.set('playSceneData', { 
        //   song: '123', 
        //   dir: '321' 
        // }) 
        // // console.log(StaticData.load('playSceneData')) 
        Framework.Game.goToLevel("beatsMapMaker") 
      }) 

    }

    if (StaticData.load('songMenu') && !StaticData.load('needMenuReload')){ // 快取系統
      setTimeout(() => {
        let lastSelect = StaticData.load('lastSelectIndex')
        this.songMenu = StaticData.load('songMenu')
        this.component.selectCard.loadFromList(this.songMenu)
        this.component.selectCard.set({offset: StaticData.load('lastSelectIndex')||0})
        this.setState({aniSelect: lastSelect, selectIndex: lastSelect})
        this.forceUpdate()
      }, 300) //不知道為何需要延遲
    }
    else
    // if (Game.client === 'web') {  
      new BeatsMapParser('./Songs/songList.json').then((data) => {
        this.component.selectCard.loadFromList(data)
        this.songMenu = data
        StaticData.set('songMenu', data)
        //   console.log('web load')
        this.setState({load: true})
        console.log(this.songMenu.length);
        for(let i = 0 ; i < this.songMenu.length;i++){
          this.songCover[i] = this.songMenu[i].songMeta[0].cover;
          console.log(this.songCover[i]);
        }
      })
    // } else {
    //   new DirLoader().getBeatMapFile().then((beatsMap) => {
    //     beatsMap.fileArray.forEach((val, i) => {
    //       this.songMenu[i] = val
    //       let meta = (/(.*)\[(.*)\].json$/g).exec(val.name)
    //       // console.log(meta)
    //       new BeatsMapParser(val.path).then((data) => {
    //         this.songMenu[i].songName = data.songName
    //         this.songMenu[i].songMeta = [{
    //           difficulty: meta[2],
    //           beatsFile: this.songMenu[i].name
    //         }]
    //         // console.log(this.songMenu[i])
    //         if (i === beatsMap.fileArray.length - 1) {
    //           StaticData.set('songMenu', this.songMenu)
    //           this.component.selectCard.set({offset: 0})
    //           this.component.selectCard.loadFromList(this.songMenu)
    //           setTimeout(() => {this.setState({load: true})}, 200);
    //           this.forceUpdate()
    //         }
    //       });
    //     }, this)
    //   })
    // }
  }
  

  fresh(){
    this.ani.update()
  }

  render(parentCtx) {
    // this.component.selectCard.set({
    //   offset: this.state.selectIndex,
    //   aniOffset: this.state.aniSelect
    // })
    
  }

  songMenuGo(selectIndex) {
    this.ani.fromTo({aniSelect: this.state.aniSelect}, {aniSelect: selectIndex}, 0.2, (data) => {
      this.setState(data)
       this.component.selectCard.set({
          offset: this.state.selectIndex,
          aniOffset: data.aniSelect
        })
    }, 'sildeTest')
  }

  keyEvent(e) {
    let length = this.songMenu.length
    let selectIndex = this.state.selectIndex
    
    switch(e.key) {
      case 'Up':
        if ((selectIndex - 1) >= 0) {
          this.songMenuGo(selectIndex - 1)
          if(this.songCover[selectIndex - 1] == "")
            this.component.cover.set({url: Resource.image+'/cover.jpg',}) 
          else this.component.cover.set({url: './Songs/'+ this.songCover[selectIndex - 1]});
          this.setState({
            selectIndex: selectIndex - 1
          })
        }
        break
      case 'Down':
        if ((selectIndex + 1) < length) {
          this.songMenuGo(selectIndex + 1)
          if(this.songCover[selectIndex + 1] == "")
            this.component.cover.set({url: Resource.image+'/cover.jpg',}) 
          else this.component.cover.set({url: './Songs/'+ this.songCover[selectIndex + 1]});
          this.setState({
            selectIndex: selectIndex + 1
          })
        }
        break
    }
  }

  onkeydown(e) {
    if (e.key === 'Enter') {
      StaticData.set('playSceneData', this.songMenu[this.state.selectIndex])
      StaticData.set('lastSelectIndex', this.state.selectIndex)
      Framework.Game.goToLevel("GamePlayScene")
    }
    // if (!this.state.isPress)
      this.keyEvent(e)
  }

  onkeypress(e) {
    // this.keyEvent(e)
    // this.setState({isPress: true})
    // setTimeout(() => {this.setState({isPress: false}), 500})
  }
  // autodelete() {
  //   // console.log('destructor');
  // }
}


export default Framework.exClass(Framework.GameMainMenu , new menu().transClass());
//Framework.GameMainMenu
