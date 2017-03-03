import Framework from './framework_es6';
import Level1 from './level1';

let path = 'game_sample/image/';
var isTry=false;    //決定是否為練習模式


var MyMenu = Framework.exClass(Framework.GameMainMenu , {
    //初始化loadingProgress需要用到的圖片
    initializeProgressResource: function() {
        this.loading = new Framework.Sprite(path + 'loading.jpg');
        this.loading.position = {x: Framework.Game.getCanvasWidth() / 2 , y: Framework.Game.getCanvasHeight() / 2};
        console.log('initializeProgressResource')
        //為了或得到this.loading這個Sprite的絕對位置, 故需要先計算一次(在Game Loop執行時, 則會自動計算, 但因為loadingProgress只支援draw故需要自行計算)                  
    },

    //在initialize時會觸發的事件
    loadingProgress: function(ctx, requestInfo) {
        console.log(Framework.ResourceManager.getFinishedRequestPercent())
        this.loading.draw(ctx);
        console.log('init')
        ctx.font ='90px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.fillText(Math.round(requestInfo.percent) + '%' , ctx.canvas.width / 2 , ctx.canvas.height / 2 + 300);
        this.pic = new Framework.Sprite(`${path}169.bmp`);
        this.pic.position = {
          x: 100,
          y: 100
        };
        console.log(this.pic);
        this.rootScene.attach(this.pic);
    },

    load: function(){   
        console.log('load')
        

        // ////////Load開始標語/////////
        // this.startpic = new StartSign();
        // this.startpic.load(Framework.Game.getCanvasWidth() / 2 , Framework.Game.getCanvasHeight() / 2);
        // this.rootScene.attach(this.startpic.startPic);

        // ////////Load選關按鈕/////////
        // this.select=new SelectSign();
        // this.select.load();
        // this.rootScene.attach(this.select.bottonPic);

        // ////////Load選關按鈕/////////
        // this.confling=new ConflingSign();
        // this.confling.load();
        // this.rootScene.attach(this.confling.bottonPic);

        // ////////Load模板/////////
        // this.board=new Board();
        // this.board.load();
        // this.rootScene.attach(this.board.boardPic);
        // this.rootScene.attach(this.board.mBotton.bottonPic);
        



    },
    
    initialize: function() {
        
    },

    update:function(){     

       // this.board.update(this.select,this.confling);

        
    },

    draw: function(parentCtx) { 
        //this.rootScene.draw();一定要在第一行
        this.rootScene.draw(parentCtx);
        //this.board.draw(parentCtx);

    },

    mouseup: function(e) {

    },

    mousedown: function(e) {
        
    },

    click:function(e){      

    },

    mousemove: function(e) {        
		  //console.log(e.x+", "+e.y);
    },

    mouseup: function(e) {

    },

    touchstart: function (e) {
        //為了要讓Mouse和Touch都有一樣的事件
        //又要減少Duplicated code, 故在Touch事件被觸發時, 去Trigger Mouse事件
        //this.mousedown({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    },

    touchend: function (e) {

    },
    
    touchmove: function (e) {

    }
});

Framework.Game.addNewLevel({menu: new Level1()});
Framework.Game.start();