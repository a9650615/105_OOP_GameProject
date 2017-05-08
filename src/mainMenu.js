import Framework, {ES6Trans} from './framework_es6';
import { Resource , Game } from './constant';
import DirLoader from './modules/DirLoader';
import BeatsMapParser from './modules/BeatsMapParser';
import Text from './components/Text';
import Button from './components/Button';
import Img from './components/Img';
import StaticData from './helper/StaticData';
import SelectCard from './components/SelectCard';

class menu extends ES6Trans {
  initialize() {
    this.state = {
      loaded: false,
      positionY: 1,
      positionX: 100,
      selectIndex: 0
    };
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
    let t = this;
    this.songMenu = [];

    this.component = {
      // playButton: new Button(this).set(
      //   {
      //     text: "進入遊戲",
      //     x: (Framework.Game.getCanvasWidth()/2)-100,
      //     y: Framework.Game.getCanvasHeight()/2,
      //     textColor: 'black'
      //   }
      // ).setEvent('click', (e) => {
      //   StaticData.set('playSceneData', {
      //     song: '123',
      //     dir: '321'
      //   })
      //   // console.log(StaticData.load('playSceneData'))
      //   Framework.Game.goToLevel("GamePlayScene")
      // }),
      selectCard: new SelectCard(this).set({
        width: Game.window.width * 0.3,
        height: Game.window.height - 20,
        x: 200,
        y: 10
      })
    }

    if (Game.client === 'web') {
      new BeatsMapParser('./Songs/songList.json').then((data) => {
        this.component.selectCard.loadFromList(data)
        this.songMenu = data
      })
    } else {
      new DirLoader().getBeatMapFile().then((beatsMap) => {
        beatsMap.fileArray.forEach((val, i) => {
          this.songMenu[i] = val
          let meta = (/(.*)\[(.*)\].json$/g).exec(val.name)
          // console.log(meta)
          new BeatsMapParser(val.path).then((data) => {
            this.songMenu[i].songName = data.songName
            this.songMenu[i].songMeta = [{
              difficulty: meta[2],
              beatsFile: this.songMenu[i].name
            }]
            // console.log(this.songMenu[i])
            if (i === beatsMap.fileArray.length - 1) {
              // console.log(this.songMenu)
              this.component.selectCard.loadFromList(this.songMenu)
              this.forceUpdate()
            }
          });
        }, this)
      })
    }
    // new DirLoader().getBeatMapFile().then((beatsMap) => {
    //   beatsMap.fileArray.forEach((val, i) => {
    //     let yTop = i * 40;
    //     new BeatsMapParser(val.path).then((data) => {
          
    //     });
    //     t.songMenu.push(new Button(this).set(
    //         {
    //           text: val.name,
    //           x: 100,
    //           y: yTop
    //         }
    //       ).setEvent('click', (e) => {
    //         console.log('按到 Button' + i)
    //         Framework.Game.goToLevel("beatsMapMaker")
    //       })
    //     )
        
    //     t.setState({
    //       loaded: true
    //     });
    //   })
    // });
  }
  

  fresh(){
    // if(this.state.positionY < 500)
    // this.setState({
    //   positionY: this.state.positionY+5
    // })
    // if (this.state.positionX < 700)
    // if (this.state.positionY < 500)
    // this.setState({
    //   positionY: this.state.positionY+20
    // });
    // else 
    // this.setState({
    //   positionY: 1,
    //   positionX: this.state.positionX + 50
    // });
  }

  render(parentCtx) {
    this.component.selectCard.set({
      offset: this.state.selectIndex
    })
    // this.component.testCard.set({
    //   y: this.state.positionY
    // })
    // this.component.playButton.draw(parentCtx)
    // this.val.set({
    //   text: 'val',
    //   y: this.state.positionY,
    //   x: this.state.positionX,
    //   background: `rgb(${this.state.positionX%255},${this.state.positionY%255},100)`
    // });
  }

  onkeydown(e) {
    let length = this.songMenu.length
    let selectIndex = this.state.selectIndex
    
    switch(e.key) {
      case 'Enter':
        StaticData.set('playSceneData', this.songMenu[selectIndex])
        Framework.Game.goToLevel("GamePlayScene")
        break
      case 'Up':
        if ((selectIndex - 1) >= 0) 
          this.setState({
            selectIndex: selectIndex - 1
          })
        break
      case 'Down':
        if ((selectIndex + 1) < length)
          this.setState({
            selectIndex: selectIndex + 1
          })
        break
    }
  }

  // autodelete() {
  //   // console.log('destructor');
  // }
}


export default Framework.exClass(Framework.GameMainMenu , new menu().transClass());
