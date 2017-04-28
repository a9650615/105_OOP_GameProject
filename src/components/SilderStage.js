import GameObject from './GameObject';
import Rect from './Rectangle';

class SilderStage extends GameObject {
  constructor(prop) {
    super(prop);
    this._parent = prop;
    Object.assign(this.state, {
      currentStep: 0,
      range: 5, // 單邊五個 共 1o 個
      currentTime: 0,
      hpWidth: 12, // hp 條寬度
      difference: [0.050, 0.075, 0.1],
      percent: [101, 100, 50, 25, 0]
    });

    this.hit = [0, 0, 0, 0, 0];
    this.beatsMap = null;
    this.onHitType = () => {};
  }
  /**
   * 載入地圖檔
   * @param {object} beatsObject
   */
  loadbeatsMap(beatsObject = {}) {
    let beatsMap = beatsObject.beatsMap;
    this.beatsMap = beatsObject;
    this.beatsMap.difference = 60 / this.beatsMap.bpm;
    this.beatsMap.totalStep = beatsObject.beatsMap.length
    this.beatsMap.currentScore = 0;
    beatsMap.forEach((val, i) => {
      val.status = 0; // 目前狀態 失敗 -1 , 成功 > 0
      let color = '#d15169';
      if(i != 0)
        if (beatsMap[i-1].startStep == beatsMap[i].startStep || beatsMap[i+1].startStep == beatsMap[i].startStep){
          color = '#EAC100';
        }
      val.element = new Rect(this._parent).set({
        x: 0,
        y: this.state.y,
        width: this.state.width/(2*this.state.range), //*2 是因為畫面砍半
        height: this.state.height,
        background: color
        
      }).hide();
    }) 
  }

  /**
   * 設定 hit call function
   */
  setHitEvent(func = () => {}) {
    this.onHitType = func;
  }

  countPercent () {
    let score = 0;
    this.hit.forEach((val, i) => {
      score += this.state.percent[i] * val ;
    })
    return score;
  }

  setCurrentTime(time = 0, step = 0) {
    if (this.beatsMap) {
      // let fixCurrentTime = time + this.beatsMap.songOffset;
      // let revertBpm = 60/this.beatsMap.bpm;
      // console.log(this.beatsMap.bpm, revertBpm, this.beatsMap.difference);
      // let step = parseInt(fixCurrentTime / revertBpm);
      // let step = (time != Math.abs(this.beatsMap.songOffset))? 0: parseInt(fixCurrentTime / this.beatsMap.difference);
      this.setState({
        currentTime: time,
        currentStep: Number(step)
      });
    };
  }

  set(data) {
    this.setState(data);
    return this;
  }

  load() {
  }

  _checkRangeType(difference = 0) {
    difference = Math.abs(difference)
    let data = this.state.difference.findIndex((val) => { return difference < val })
    return (data!=-1)?data+1:false
  }

  /**
   * 檢查是否 Block 是否已經在計算區域內
   * @param {float} currentStep nowPlayStep
   * @param {int} nowBlockStep beatsmap block step
   * @return {bool} isInBlock
   */
  _checkIsInBlock(currentStep, nowBlockStep) {
    if (nowBlockStep == Math.round(currentStep)) 
      return true;
    return false;
  }

  /**
   * 打擊判定
   * @param {int} type 
   */
  keyHit(type, callback = () => {}) {
    let beatsMap = this.beatsMap.beatsMap;
    let currentStep = this.state.currentStep;
    let hitTypeName = ["Critical Perfect","Perfect","Good","Bad","Miss"];  
    let hitType = -1;
    beatsMap.forEach((val, i) => {
      if (this._checkIsInBlock(currentStep, val.startStep) && type === val.align) { //節拍數進入範圍時
        let difference = this.state.currentTime - val.startStep * this.beatsMap.difference;
        hitType = this._checkRangeType(difference);
        console.log(difference, this._checkRangeType(difference));
        if(val.status == 0)   {
           if (hitType) { //在判斷範圍內
            val.status = hitType;
            this.hit[hitType-1] += 1;
          } else {  //範圍外
            hitType = 4;
            val.status = -1;
            this.hit[3] += 1;
          }  
        }      
        console.log(this.countPercent(), "/", this.beatsMap.totalStep * 100, hitTypeName[hitType-1]);
        console.log(Math.round((this.countPercent() * 1000000) / (this.beatsMap.totalStep * 100)));
        console.log("Critical Perfect:",this.hit[0],"Perfect:",this.hit[1],"Good:",this.hit[2],"Bad:",this.hit[3],"Miss:",this.hit[4]);
        val.element.hide();
      }
    });
    callback.call(this, hitType)
  }

  _checkSilderInSpace(step, func = () => {}) {
    let currentStep = this.state.currentStep;
    let range = this.state.range;
    if (step > (currentStep-range) && step <= (currentStep+range)) {
      func.call();
    }
  }

  getScore() {
    return this.countPercent() / (this.beatsMap.totalStep * 100);
  }

  render() {
    if (this.beatsMap) {
      let width = this.state.width;
      let beatsMap = this.beatsMap.beatsMap;
      let currentStep = this.state.currentStep;
      let currentTime = this.state.currentTime;
      let difference = this.beatsMap.difference;
      let rangeTime = difference * this.state.range; //只有一半
      let maxDifference = this.state.difference[this.state.difference.length-1];
      if (beatsMap)
      beatsMap.forEach((val, i) => {
        val.element.hide();
        // let eleWidth = width/(2*this.state.range) - 20;
        let eleWidth = (width/2) * (maxDifference/this.beatsMap.difference) / this.state.range;
        //console.log(eleWidth)
        this._checkSilderInSpace(val.startStep, () => {
          let elementTime = 1-((val.startStep*difference)-currentTime)%rangeTime;
          let x = (val.align==0)?(width*(elementTime/rangeTime) - eleWidth):(width - width*(elementTime/rangeTime));
          if (val.align == 0 && (x+eleWidth)>(width-this.state.hpWidth)/2) {  // 左半部區塊寬度調整
            eleWidth = (((width)/2) - x) - this.state.hpWidth/2;
          }
          if (val.align == 1 && x<(width+this.state.hpWidth)/2) {  // 右半部區塊寬度調整
            eleWidth = eleWidth - (((width)/2) - x) - this.state.hpWidth/2;
            x = (width+this.state.hpWidth)/2;
          }
          if (rangeTime - elementTime * 1.5 <= 0 && val.status === 0) { //滑塊 miss
            val.status = -1;
            this.hit[4] += 1;
            console.log(this.countPercent(), "/", this.beatsMap.totalStep * 100, "Miss");
            console.log("Critical Perfect:",this.hit[0],"Perfect:",this.hit[1],"Good:",this.hit[2],"Bad:",this.hit[3],"Miss:",this.hit[4]);
          }
          if (val.status === 0)
            val.element.set({
              x: x + 10,
              width: eleWidth
            }).show();
        });
      });
    };
  }
}

export default SilderStage;
