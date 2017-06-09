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
        this._loadJson(pathOrObject, (data) => {
          this._json = data
          resolve(data)
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

  _loadJson(path, resolve = () => {}) {
    Framework.ResourceManager.loadJSON({id: `${path}_BeatsMapParser`, type: 'GET', url: path}).then(() => {
      let data = Framework.ResourceManager.getResource(`${path}_BeatsMapParser`);
      // this._json = data;
      resolve(data);
    });
  }

  parse(func) {
    return this._json;
  }
  
  _replace_path(path){
    return path.replace('/','').replace('.','').replace('\\','').replace(':','').replace('*','')
    .replace('?','').replace('"','').replace('<','').replace('>','').replace('|','').replace('。', '');
  };

  save(path, songName, difficult = 'default') {
    let folder = this._replace_path(path.split('.')[0])
    path = `${Resource.songs}${folder}/`;
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }

      this._loadJson(Resource.sontList, (data) => {
        let counter = 0
        let meta = {
          "difficulty": difficult,
          "songFile": `${folder}/${songName}`,
          "beatsFile": `${folder}[${difficult}].json`,
          "cover": cover?`${folder}/${cover}`:""
        }

        for(let i in data) {
          if (data.hasOwnProperty(i)) {
            if (data[i].songName === songName ) {
              data[i].songMeta.forEach((data) => {
                if (data.difficulty === difficult) {
                  counter ++
                }
              })

              if (counter === 0) { //沒找到添加
                data[i].songMeta.push(meta)
              }

              counter ++
              break // 找到匹配歌曲，添加在內部
            }
          }
        }

        if (counter === 0) {
          data = [{
            songName: folder,
            songMeta: [meta]
          }].concat(data)
        }

        fs.writeFileSync(Resource.sontList, JSON.stringify(data), 'utf-8');

        if (!this._json.songFile) {
          fs.rename(`${Resource.songs}tmp/${this._json.tmpSongName}`, `${path}${songName}`, () => {
            this._json.songFile = `${songName}`;
            this._json.songName = `${songName.split('.')[0]}`;
            delete this._json.tmpSongName;
            //console.log(this._json);
            fs.writeFileSync(`${path}${this._replace_path(songName.split('.')[0])}[${difficult}].json`, JSON.stringify(this._json), 'utf-8'); // write song file
            this._json.path = `${path}${songName}`;
            resolve(this._json);
          }); // move song file
        }
      })
      
    });
  }
}
