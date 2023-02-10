namespace Feuerwerk {
    export class Drop extends Rocket {

        private radius: number;

        constructor(_position: Vector, _dx: number, _dy: number, _alphaTime: number , _name: string, _color: string) {
            super(_position, _dx, _dy, _alphaTime , _name, _color);

            this.radius = 5;
        }

        public draw(): void {
            crc2.save();
            this.drawArc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            this.drawTriangle(this.position.x - 3, this.position.y - 4, this.position.x + 3, this.position.y - 4, this.position.x + 0, this.position.y - 10);
            crc2.restore();
        }

        public explode(): void {
            super.explode();
        }

        private drawArc(_x: number, _y: number, _radius: number, _startAngle: number, _endAngle: number): void {
            crc2.beginPath();
            crc2.globalAlpha = this.alpha;
            crc2.arc(_x, _y, _radius, _startAngle, _endAngle * Math.PI);
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.closePath();
        }

        private drawTriangle(_x1: number, _y1: number, _x2: number, _y2: number, _x3: number, _y3: number): void {
            crc2.beginPath();
            crc2.globalAlpha = this.alpha;
            crc2.moveTo(_x1, _y1);
            crc2.lineTo(_x2, _y2);
            crc2.lineTo(_x3, _y3);
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.closePath();
        }
    }
}