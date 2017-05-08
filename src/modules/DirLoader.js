import FileSystem from 'fs';
import {Resource} from '../constant';

const fileReg = /(.*)\[(.*)\].json$/g;

let songList = [];

export default class DirLoader {
    
  readFolder(path) {
    return new Promise((resolve, reject) => {
      FileSystem.readdir(
        path,
        (err, files) => {
          if (err)
            reject(err);
          resolve(files)
        }  
      );
    })
  }

  getBeatMapFile() {
    return new Promise((resolve, reject) => {
      let fileDirArray = {}, fileArray = [];
      this.readFolder(Resource.songs)
        .then((folders) => {
          let filtered = folders.filter((folder) => {
            let Path = `${Resource.songs}${folder}`;
            return FileSystem.statSync(Path).isDirectory();
          });
          filtered.forEach((folder, i) => {
            let Path = `${Resource.songs}${folder}/`; 
            let beatsMap = [];
            this.readFolder(Path)
              .then((files) => {
                files.forEach((file) => {
                  if (file.match(fileReg)) {
                    let files = {
                      path: `${Path}${file}`,
                      name: `${file}`
                    };
                    beatsMap.push(file);
                    fileArray.push(files);
                  }
                })
                fileDirArray[folder] = beatsMap;

                if (i === filtered.length-1)
                  resolve({fileDirArray, fileArray});
              })
          })
        })
        
        //reject('not finish!!');
    })
  }

}
