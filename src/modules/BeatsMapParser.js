import fs from 'fs';

export default class BeatsMapParser {
  constructor(path) {
    let t = this;
    t._json = Object();
    return new Promise((resolve, reject) => {
      fs.readFile(path, {encoding: 'utf-8'}, function(err,data){
        if (!err){
         if (data!='' && /^[\],:{}\s]*$/.test(data.replace(/\\["\\\/bfnrtu]/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, '')))
          {
            t._json = JSON.parse(data);
            resolve(t._json);
          } /*else
            reject('json input type error.')*/
        }else{
          reject('Error when readfile! '+err);
          throw new Error('Error when readfile! '+err);
        }
      });
    });
  }

  parser(func) {
    return this._json;
  }
}
