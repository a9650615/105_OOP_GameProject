import path from 'path';
let appDir = path.dirname(require.main.filename);

export const Resource = {
  image: `${appDir}/game_sample/image/`,
  songs: `${appDir}/Songs/`,
  sounds: `${appDir}/res/Sounds/`
};

export const Game = {
  debug: true,
  window: {
    width: 1350,
    height: 700
  }
};

export default {};
