namespace Feuerwerk {
    export class Circle extends Rocket {

        public shape: SHAPE = SHAPE.CIRCLE;

        constructor(_position: Vector,  _dx: number, _dy: number, _size: number, _name: string, _color1: string, _color2: string) {
            super(_position, _dx, _dy, _size , _name, _color1, _color2);
        }

        public draw(): void {
            crc2.save();
            //crc2.translate(this.position.x, this.position.y);
            this.drawArc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, this.color1);
            crc2.restore();
            console.log("draw");
        }

        public explode(): void {
            this.draw();
            this.alpha -= 0.01;
            this.position.x += this.dx;
            this.position.y += this.dy;
        }

        private drawArc(_x: number, _y: number, _radius: number, _startAngle: number, _endAngle: number, _color: string): void {
            crc2.beginPath();
            crc2.arc(_x, _y, _radius, _startAngle, _endAngle * Math.PI);
            crc2.fillStyle = _color;
            crc2.fill();
            crc2.closePath();
            console.log("draw arc");
        }
    }
}