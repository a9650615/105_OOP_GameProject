import GameObject from './GameObject';
import Rect from './Rectangle';

class SilderStage extends GameObject {
  constructor(prop) {
    super(prop);
    this._parent = prop;
    Object.assign(this.state, {
      currentStep: 0,
      range: 5, // 單邊五個 共 1o 個
      currentTime: 0
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
        background: '#'+Math.floor(16207872).toString(16) 
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

  render() {
    if (this.beatsMap) {
      let width = this.state.width / 2;
      let beatsMap = this.beatsMap.beatsMap;
      let currentStep = this.state.currentStep;
      let currentTime = this.state.currentTime;
      let rangeTime = this.beatsMap.difference * this.state.range;
      if (beatsMap)
      beatsMap.forEach((val, i) => {
        val.element.hide();
        if (val.startStep > currentStep && val.startStep < (currentStep+this.state.range)) {
          let x = (val.align==0)?(width*(currentTime%rangeTime)):(width*2 - width*(currentTime%rangeTime));
          val.element.set({
            x: x
          }).show();
        };
      });
    };
  }
}

export default SilderStage;
