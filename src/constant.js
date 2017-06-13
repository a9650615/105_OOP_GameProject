import path from 'path';
// import {remote} from 'electron'
let appDir = path.dirname(require.main.filename);
let basepath = appDir

if(process.env.RUN_ENVIRON === 'product') {
  basepath = window.require('electron').remote.require('electron').app.getAppPath()+'/../../' // build fail
}

export const Resource = {
  sontList: `${basepath}/Songs/songList.json`,
  image: `${basepath}/res/Image/`,
  songs: `${basepath}/Songs/`,
  sounds: `${basepath}/res/Sounds/`,
  character: `${basepath}/res/Character/`
};

export const Game = {
  debug: false,
  client: process.env.RUN_ENVIRON,
  window: {
    width: 1280,
    height: 720
  },
  keyCode: {
    leftHit: 81,
    rightHit: 69
  }
};
console.log(process.env.RUN_ENVIRON);
console.log(Resource)
export default {};
