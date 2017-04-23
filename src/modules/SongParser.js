import fs from 'fs';
import mm from 'musicmetadata';
import {Game} from '../constant';

export default class SongParser {
  constructor() {
    this.audio = document.createElement('audio');
    this.audio.volume = 0.3;

    this.getPlayer.bind(this);
  }
  /**
   * 載入歌曲
   * @param {string} file_path 
   * @param {string} filename 
   * @param {func} func 
   */
  setUrl(file_path, filename = '', func = () => {}) {
    let t = this;
    if (Game.client != 'web')
      mm(fs.createReadStream(file_path), function (err, metadata) {
        if (err) throw err;
        t.info = metadata;
        t.info.name = filename;
        t.audio.src = file_path;
        t.audio.onloadedmetadata = t.onGetDuration.bind(t);
        // t.ctx = new AudioContext();
        // var audioSrc = t.ctx.createMediaElementSource(t.audio);
        // var analyser = ctx.createAnalyser();
        // audioSrc.connect(analyser);
        //t.audio.addEventListener('canplaythrough', func.bind(t), false);
        t.audio.addEventListener('loadedmetadata', func.bind(t), false);
      });
    else {
      t.audio.src = file_path;
      t.audio.onloadedmetadata = t.onGetDuration.bind(t);
      t.audio.addEventListener('loadedmetadata', func.bind(t), false);
    }

  }
  /**
   * 檢查是否已載入歌曲
   */
  hasSong() {
    return this.audio.src? true: false;
  }
  
  onGetDuration() {
    this.duration = this.audio.duration;
  }

  setCurrentTime(currentTime) {
    this.audio.currentTime = currentTime;
  }

  getDuration() {
    return this.duration;
  }
  
  getCurrentTime() {
    return this.audio.currentTime;
  }

  _format_number(number) {
    return number< 10 ? '0' + number : number;
  }

  getFormatCurrentTime(fix = 0) {
    if (this.audio)
      return `${Math.floor(this._format_number(this.getCurrentTime()/60))}:${this._format_number((this.getCurrentTime()%60).toFixed(fix))}`;
  }

  getDuration() {
    if (this.audio)
    return `${Math.floor(this._format_number(this.duration/60))}:${this._format_number(Math.floor(this.duration%60))}`;
  }

  getFormatTime() {
    return this.getFormatCurrentTime() + '/' + this.getDuration();
  }

  getPlayer() {
    return this.audio;
  }

  getMetaInfo() {
    return t.info;
  }
}
