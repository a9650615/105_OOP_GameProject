export default class devTool {
  constructor(prop) {
    this.config = {
      uiTarget: 'ui-wrapper',
      element: 'dev-tool'
    }
    this.hide = false
    this.element = {}
    this.data = prop
    this.delete = []
    console.log(prop)
    this.load()
  }

  createElement(child, id, parent) {
    let ele = document.createElement('ul')
    ele.id = id
    for (let i in child) {
      let child = document.createElement('li')
      child.innerHTML = `${i} - ${typeof child[i]}`
      ele.appendChild(child)
    }
    parent.appendChild(ele)
    return ele
  }

  findElement(id) {
    return document.getElementById(id)
  }

  dataParser(parent = this.data.component, parentId = this.config.element, level = 0) {
    let data = Object.assign({}, parent);
    let eleId = `${this.config.element}${(level)?'-'+level.toString():''}`;
    console.log(eleId)
    let parEle = this.findElement(parentId)
    if (!parEle) {
      parEle = this.createElement(parent, parentId, document.getElementById(this.config.element))
    }
    if (typeof data === 'object')
      for (let i in data) {
        if (level < 4 && data[i] && data.hasOwnProperty(i)) {
          if (data[i].type === 'GameObject') {
            this.dataParser(data[i], `${parentId}-${i}`, level + 1)
            delete data[i]._parent;
            console.log(parentId)
            this.createElement(data[i], `${parentId}-${i}`, parEle)
            // console.log(level + ':' + `${parentId}-${i}` , data[i]);
          }
        }
      }
    
  }

  load() {
    var body = document.createElement('div')
    body.id = this.config.element
    document.getElementById(this.config.uiTarget).appendChild(body)
    this.dataParser()
  }

  update() {

  }

  remove() {
    let data = this
    data = null
    delete this
  }
}
