import GameObject from './GameObject';

export default class Text extends GameObject {
  constructor(props = {}) {
    super(props);
    this.state = {
      text: '',
      style: {
        textSize: 15,
        textColor: null
      },
      position: {
        x: 20,
        y: 20
      },
      textWidth: 0
    };
  }

  _getTextHeight(font, size) {
    // let text = document.createElement('span');
    // text.style['fontFamily'] = font ;
    // text.style['fontSize'] = size ;
    // text.innerHTML = "Hg";
    // let block = document.createElement('div') ;
    // block.style.display ="inline-block";
    // block.style.width = "1px" ;
    // block.style.height = "0px" ; 
    // let div = document.createElement('div');
    // div.appendChild(text);
    // div.appendChild(block)
    // document.body.appendChild(div);
    // let height = 0 ;
    // try {
    //   block.style.verticalAlign = "bottom" ;
    //   height = block.offsetTop - text.offsetTop;
    // } finally {
    //   div.remove();
    // }
    return size + 10;
  }
  
  setStyle(option) {
    this.setState({
      style: option
    });

    return this;
  }

  setText(text) {
    this._tmpContent.font = `${this.state.style.textSize||25}px ${this.state.style.font||'Arial'}`;
    let width = this._tmpContent.measureText(text).width;
    this.setState({
      text: text,
      textWidth: width
    });
    
    this._tmpCanvas.resize(width);

    return this;
  }

  render(ctx) {
    let painter = ctx || Framework.Game._context;
    let content = this._tmpContent;
    let style = this.state.style;
    content.textBaseline = 'top';
    content.font = `${style.textSize||25}px ${style.font||'Arial'}`;
    content.textAlign = style.textAlign || 'left';
    content.fillStyle = style.textColor || 'black';
    content.fillText(this.state.text, 0, 0);
    painter.drawImage(this._tmpCanvas.element(), style.x, style.y);
  }

  getWidth() {
    return this.state.textWidth;
  }
  
  getHeight() {
    let style = this.state.style;
    return this._getTextHeight(style.font||'Arial', style.textSize||25);
  }

}