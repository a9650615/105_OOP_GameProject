import path from 'path';
let appDir = path.dirname(require.main.filename);

export const Resource = {
  image: `${appDir}/res/Image/`,
  songs: `${appDir}/Songs/`,
  sounds: `${appDir}/res/Sounds/`
};

export const Game = {
  debug: true,
  client: 'desktop',
  window: {
    width: 1280,
    height: 720
  }
};

export default {};
