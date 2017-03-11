import path from 'path';
let appDir = path.dirname(require.main.filename);

export const Resource = {
  image: `${appDir}/game_sample/image/`,
  songs: `${appDir}/Songs/`
};

export const Game = {
  debug: true
};

export default {};
