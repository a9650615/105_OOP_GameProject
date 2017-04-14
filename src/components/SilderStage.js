import GameObject from './GameObject';
import Rect from './Rectangle';

class SilderStage extends GameObject {
  constructor(prop) {
    super(prop);
    this._parent = prop;
    Object.assign(this.state, {
      currentStep: 0,
      range: 8, // 單邊五個 共 1o 個
      currentTime: 0,
      hpWidth: 10, // hp 條寬度
    });

    this.beatsMap = null;
  }
  /**
   * 載入地圖檔
   * @param {object} beatsObject
   */
  loadbeatsMap(beatsObject = {}) {
    this.beatsMap = beatsObject;
    let beatsMap = beatsObject.beatsMap;
    beatsMap.forEach((val, i) => {
      val.element = new Rect(this._parent).set({
        x: 0,
        y: this.state.y,
        width: this.state.width/(2*this.state.range), //*2 是因為畫面砍半
        height: this.state.height,
        background: '#d15169'
      }).hide();
    }) 
  }

  setCurrentTime(time = 0) {
    if (this.beatsMap) {
      let fixCurrentTime = time - this.beatsMap.songOffset;
      let revertBpm = 60/this.beatsMap.bpm;
      let step = parseInt(fixCurrentTime / revertBpm);
      this.setState({
        currentTime: time,
        currentStep: step
      });
    };
  }

  set(data) {
    this.setState(data);
    return this;
  }

  load() {
  }

  /**
   * 打擊判定
   * @param {int} type 
   */
  keyHit(type) {
    // let beatsMap = this.beatsMap.beatsMap;
    // beatsMap.forEach((val, i) => {
    //   val.element.hide();
    //   let eleWidth = width/(2*this.state.range) - 20;
    //   if (val.startStep >= currentStep-this.state.range && val.startStep <= (currentStep+this.state.range+1)) {
       
    //   };
    // });
  }

  render() {
    if (this.beatsMap) {
      let width = this.state.width;
      let beatsMap = this.beatsMap.beatsMap;
      let currentStep = this.state.currentStep;
      let currentTime = this.state.currentTime;
      let difference = this.beatsMap.difference;
      let rangeTime = difference * this.state.range; //只有一半
      if (beatsMap)
      beatsMap.forEach((val, i) => {
        val.element.hide();
        let eleWidth = width/(2*this.state.range) - 20;
        if (val.startStep >= currentStep-this.state.range && val.startStep <= (currentStep+this.state.range+1)) {
          let elementTime = 1-((val.startStep*difference)/2-currentTime)%rangeTime;
          let x = (val.align==0)?(width*(elementTime/rangeTime)):(width - width*(elementTime/rangeTime));
          if (val.align == 0 && (x+eleWidth)>width/2) {  // 左半部區塊寬度調整
            eleWidth = (((width-this.state.hpWidth)/2) - x);
          }
          if (val.align == 1 && x<width/2) {  // 右半部區塊寬度調整
            eleWidth = eleWidth - (((width-this.state.hpWidth)/2) - x) -20;
            // console.log(eleWidth);
            x = (width+this.state.hpWidth)/2;
          }
          val.element.set({
            x: x + 10,
            width: eleWidth
          }).show();
        };
      });
    };
  }
}

export default SilderStage;
