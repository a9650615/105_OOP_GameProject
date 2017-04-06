import Framework, {ES6Trans} from './framework_es6';
import {Game} from './constant';
import DebugTest from './DebugTest';
import mainMenu from './mainMenu';
import beatsMapMaker from './beatsMapMaker';
import GamePlayScene from './GamePlayScene';

function uiResize() {
  let canvas = document.getElementById('__game_canvas__');/*Framework.Game._currentLevel.config;*/
  let canvasW = parseInt(canvas.style.width), canvasH = parseInt(canvas.style.height);
  let w = document.body.clientWidth, h = document.body.clientHeight;
  let config = Framework.Game._currentLevel.config;

  let scaleL = (w > canvasW)? (w - canvasW) / 2: 0;
  // let scaleW = (w > canvasW)? 1 : w/config.canvasWidth;
  // let scaleH = (h > canvasH)? 1 : h/config.canvasHeight;
  let scale = canvasW/config.canvasWidth;
  // document.getElementById('ui-wrapper').style.width = config.canvasWidth+'px';
  // document.getElementById('ui-wrapper').style.height = config.canvasHeight+'px';
  document.getElementById('ui-wrapper').style.transform = `scale(${scale*1.5})`;
  document.getElementById('ui-wrapper').style.left = `${scaleL}px`;
}
window.addEventListener("resize", uiResize);

// 場景管理部分
Framework.Game.addNewLevel({
  menu: new mainMenu(), 
  beatsMapMaker: (Game.client=='web')?{}:new beatsMapMaker(),
  GamePlayScene: new GamePlayScene()
});
//Framework.Game.addNewLevel({beatsMapMaker: new beatsMapMaker()});
Framework.Game.start();
Framework.Game.goToLevel("GamePlayScene");
global.Framework = Framework;
uiResize();