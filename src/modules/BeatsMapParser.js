import fs from 'fs';
import Framework from '../framework_es6';
import {Resource} from '../constant';

export default class BeatsMapParser {
  /**
   * 提供 BeatsMap 檔或者路徑提供解析
   * @param {string, object} pathOrObject 
   * @returns {Promise} Promise resolve data
   */
  constructor(pathOrObject) {
    let t = this;
    if (typeof pathOrObject === 'string') {
      // path type
      t._json = Object();
      return new Promise((resolve, reject) => {
        Framework.ResourceManager.loadJSON({id: 'BeatsMapParser', type: 'GET', url: pathOrObject}).then(() => {
          let data = Framework.ResourceManager.getResource('BeatsMapParser');
          this._json = data;
          resolve(data);
        });
  //       fs.readFile(pathOrObject, {encoding: 'utf-8'}, function(err,data){
  //         if (!err){
  //         if (data!='' && /^[\],:{}\s]*$/.test(data.replace(/\\["\\\/bfnrtu]/g, '@').
  // replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
  // replace(/(?:^|:|,)(?:\s*\[)+/g, '')))
  //           {
  //             t._json = JSON.parse(data);
  //             resolve(t._json);
  //           } /*else
  //             reject('json input type error.')*/
  //         }else{
  //           reject('Error when readfile! '+err);
  //           throw new Error('Error when readfile! '+err);
  //         }
  //       });
      });
    } else if(typeof pathOrObject === 'object') {
      this._json = pathOrObject;
    }
    return this;
  }

  parse(func) {
    return this._json;
  }
  
  _replace_path(path){
    return path.replace('/','').replace('.','').replace('\\','').replace(':','').replace('*','')
    .replace('?','').replace('"','').replace('<','').replace('>','').replace('|','').replace('。', '');
  };

  save(path, songName, difficult = 'default') {
    path = `${Resource.songs}${this._replace_path(path.split('.')[0])}/`;
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }
      if (!this._json.songFile) {
        fs.rename(`${Resource.songs}tmp/${this._json.tmpSongName}`, `${path}${songName}`, () => {
          this._json.songFile = `${songName}`;
          delete this._json.tmpSongName;
          //console.log(this._json);
          fs.writeFileSync(`${path}${this._replace_path(songName.split('.')[0])}[${difficult}].json`, JSON.stringify(this._json), 'utf-8'); // write song file
          this._json.path = `${path}${songName}`;
          resolve(this._json);
        }); // move song file
      }
    });
  }
}
