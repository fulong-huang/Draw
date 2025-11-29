export default class Rectangle{
  constructor(x, y, w=50, h=20, color = 'grey', stroke=true){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.stroke = stroke;
  }
  draw(ctx){
    ctx.fillStyle=this.color;
    if(this.stroke){
      ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
    else{
      ctx.fillRect(this.x, this.y, this.w, this.h);
    }
  }
};

