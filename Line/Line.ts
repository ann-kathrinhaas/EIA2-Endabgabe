namespace Feuerwerk {
    export class Line extends Rocket {

        //public linewidth: number = 0.5;

        constructor(_position: Vector, _dx: number, _dy: number, _size: number , _name: string, _color1: string, _color2: string) {
            super(_position, _dx, _dy, _size , _name, _color1, _color2);
        }

        public draw(): void {
            crc2.save();
            this.drawLine(this.position.x, this.position.y, this.position.x, this.position.y + 10, this.color1);
            crc2.restore();
        }

        public explode(): void {
            this.draw();
            this.alpha -= 0.01;
            this.position.x += this.dx;
            this.position.y += this.dy;
        }

        private drawLine(_x1: number, _y1: number, _x2: number, _y2: number, _color: string): void {
            crc2.beginPath();
            crc2.moveTo(_x1, _y1);
            crc2.lineTo(_x2, _y2);
            crc2.strokeStyle = _color;
            crc2.stroke();
            crc2.closePath();
        }
        
    }
}