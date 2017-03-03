import Framework from './framework_es6';
let imgPath = 'game_sample/image/';
var define ={}, mainPath = 'game_sample/';
Object.defineProperties(define, {
    'mainPath': {
        value: mainPath,
        writable: false
    },
    'jsPath': {
        value: mainPath + 'js/',
        writable: false
    },
    'musicPath': {
        value: mainPath + 'music/',
        writable: false
    },
    'imagePath': {
        value: mainPath + 'image/',
        writable: false
    }

});


export default function() {
    //圖片長寬
    this.MW = 32;
    this.MH = 32;

    this.position = {
        x:200,
        y:500
    };

    this.map = [[1,2,2,1,2,2,2,2],[2,1,1,2,2,1,1,2],
                [2,1,1,2,1,1,1,2],[1,2,2,1,1,1,2,1],
                [2,1,1,2,1,1,2,1],[2,1,1,2,1,2,1,1],
                [1,2,2,1,1,2,1,1]];
    
    this.load = function(){
        this.floor1Pic = new Framework.Sprite(define.imagePath + 'floor1.png');
        this.floor2Pic = new Framework.Sprite(define.imagePath + 'floor2.png');        
    };

    this.initialize = function(){

    };

    this.update = function(){

    };

    this.draw = function(ctx){
        for(let i=0;i<7;i++){
            for(let j=0;j<8;j++){
                let picPosition = {
                    x: this.position.x + (this.MW*j) + this.MH/2,
                    y: this.position.y + (this.MH*i) + this.MH/2,
                }

                switch(this.map[i][j]){
                    case 0:
                        break;
                    case 1:
                        this.floor1Pic.position = picPosition;
                        this.floor1Pic.draw(ctx);
                        break;
                    case 2:
                        this.floor2Pic.position = picPosition;
                        this.floor2Pic.draw(ctx);
                        break;

                }
            }
        }
    };
}


