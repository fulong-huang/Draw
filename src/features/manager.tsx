class Rectangle{
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  draw(ctx){
    ctx.fillStyle='green';
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
};

export default class Manager{
  defineElements(elements, setElements){
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

