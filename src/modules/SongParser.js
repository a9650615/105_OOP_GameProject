import fs from 'fs';
import mm from 'musicmetadata';

export default class SongParser {
  constructor(file_path, filename) {
    let t = this;
    mm(fs.createReadStream(file_path), function (err, metadata) {
      if (err) throw err;
      t.info = metadata;
      t.info.name = filename;
      t.audio = document.createElement('audio');
      t.audio.volume = 0.5;
      t.audio.src = file_path;
      t.audio.onloadedmetadata = t.onGetDuration.bind(t);
      // t.ctx = new AudioContext();
      // var audioSrc = t.ctx.createMediaElementSource(t.audio);
      // var analyser = ctx.createAnalyser();
      // audioSrc.connect(analyser);
    });

    this.getPlayer.bind(this);
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

  getFormatTime() {
    return `${Math.round(this._format_number(this.audio.currentTime/60))}:${this._format_number(Math.round(this.audio.currentTime%60))}/`+
            `${Math.round(this._format_number(this.duration/60))}:${this._format_number(Math.round(this.duration%60))}`;
  }

  getPlayer() {
    return this.audio;
  }

  getMetaInfo() {
    return t.info;
  }
}
