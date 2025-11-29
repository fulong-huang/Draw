import Rectangle from './shape/Rectangle.tsx'

export default class Manager{
  constructor(elements, setElements){
    this.elements = elements;
    this.setElements = setElements;
  }
  addShape(x, y, w, h){
    const newRect = new Rectangle(x, y, w, h);
    if(this.elements.length >= 5){
      const ele = this.elements
      ele.shift()
      this.setElements([...ele, newRect]);
    }
    else{
      this.setElements([...this.elements, newRect]);
    }
  }
}

