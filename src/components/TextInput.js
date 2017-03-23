import GameObject from './GameObject';

/**
 * 文字輸入框 ( 希望是第一個也是最後一個不是用 canvas 畫的元素 )
 */
export default class TextInput extends GameObject {
  constructor(props = {}) {
    super(props);
    this.state = {
      value: '',
      style: {
        fontSize: 15,
        color: null,
        border: 'none',
        position: 'absolute',
        padding: '0px 5px',
        outline: 'none',
        width: '100px',
        height: '30px',
        background: 'Transparent'
      },
      attr: {
        type: 'text'
      },
      textWidth: 0
    };

    this.textInput = document.createElement('input');
    //change event inject
    this['change'] = () => {};
    this.draw = this.draw.bind(this);
    this.textInput.onchange = (e) => {
      this.state.value = this.textInput.value;
      this['change'].call(this, e, this);
    };
  }

  load() {
    document.body.appendChild(this.textInput);
    this.draw();
  }

  setStyle(style = {}) {
    let tmp = {};
    for(let i in style) {
      let val = isNaN(style[i])?style[i]:`${style[i]}px`;
      if(i == 'x') {tmp['left'] = val;}
      else if(i == 'y') {tmp['top'] = val;}
      else tmp[i] = val; 
    }
    this.setState({style: Object.assign(this.state.style, tmp)});
    return this;
  }

  value(val = null) {
    if(val)
      this.setState({value: val});
    else 
      return this.state.value;
    return this;
  }

  set(option = {}) {
    for(let i in option.attr) {
      this.textInput[i] = option.attr[i];
    }
    this.state.attr = Object.assign(this.state.attr, option.attr);
    return this;
  }
  // 不受到 render hide 限制, 但是仍然有沒必要的重複更新問題
  draw() {
    this.textInput.value = this.state.value;
    this.textInput.style.display = this._gameObject.hide?'none':'block';
    for(let i in this.state.style) {
      this.textInput.style[i] = this.state.style[i];
    }
  }

  remove() {
    this.textInput.remove();
  }
}