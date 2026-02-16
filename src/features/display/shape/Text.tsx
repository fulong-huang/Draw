import Shape from './Shape.tsx'
export default class Text extends Shape {
	text: string;
	font_size: number;
  color: string;
  constructor(x: number, y: number, text='Text', font=30, color = 'white') {
    super(x, y);
    this.text = text;
		this.font_size= font;
    this.color = color;

    this.bounds = {
      x1: x, y1: y,
      x2: x, y2: y,
    }
//     if (width < 0) {
//       this.bounds.x1 = x + width;
//       this.bounds.x2 = x;
//     }
//     if (height < 0) {
//       this.bounds.y1 = y + height;
//       this.bounds.y2 = y;
//     }
  }
  exist() {
    return this.text != '';
  }
	resizeFont(ctx: CanvasRenderingContext2D, scale: number){
		const width = ctx.measureText(this.text).width / scale;
		const height = ctx.measureText('M').width / scale;
    this.bounds = {
      x1: this.x - 8, y1: this.y - height - 5,
      x2: this.x + width + 8, y2: this.y + 5,
    }
	}
	addChar(ctx: CanvasRenderingContext2D, char: string, scale: number){
		this.text += char;
		this.resizeFont(ctx, scale);
	}
	removeChar(ctx: CanvasRenderingContext2D, scale: number){
		this.text = this.text.slice(0, -1);
		this.resizeFont(ctx, scale);
	}
	editText(ctx: CanvasRenderingContext2D,text: string, scale: number){
		this.text = text;
		this.resizeFont(ctx, scale);
	}
  moveTo(x: number, y: number, offset: [number, number] = [0, 0]) {
    const diffX = x - this.x - offset[0]
    const diffY = y - this.y - offset[1]
    this.x = x - offset[0]
    this.y = y - offset[1]
    this.bounds.x1 += diffX
    this.bounds.x2 += diffX
    this.bounds.y1 += diffY
    this.bounds.y2 += diffY
  }
  draw(ctx: CanvasRenderingContext2D, shiftedAmount: [number, number], scale: number) {
    const x = (this.x - shiftedAmount[0]) * scale;
    const y = (this.y - shiftedAmount[1]) * scale;
    const font = this.font_size * scale + 'px bold';
		ctx.font = font;
		ctx.textBaseline = 'bottom';
		ctx.fillStyle = this.color;
    ctx.fillText(this.text, x, y);
  }
};


