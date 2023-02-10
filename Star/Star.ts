namespace Feuerwerk {
    export class Star extends Rocket {

        constructor(_position: Vector, _dx: number, _dy: number, _alphaTime: number , _name: string, _color: string) {
            super(_position, _dx, _dy, _alphaTime , _name, _color);
        }

        public draw(): void {
            crc2.save();
            crc2.translate(-20, 180);
            this.drawTriangle(this.position.x + 7.5, this.position.y - 170, this.position.x + 15, this.position.y - 190, this.position.x + 22.5, this.position.y - 170); // oben
            this.drawTriangle(this.position.x + 7.5, this.position.y - 170, this.position.x + 15, this.position.y - 190, this.position.x + 22.5, this.position.y - 170); // oben
            this.drawTriangle(this.position.x + 7.5, this.position.y - 170, this.position.x + 0, this.position.y - 155, this.position.x + 22.5, this.position.y - 170); // unten links
            this.drawTriangle(this.position.x + 7.5, this.position.y - 170, this.position.x + 30, this.position.y - 155, this.position.x + 22.5, this.position.y - 170); // unten rechts
            this.drawTriangle(this.position.x + 15, this.position.y - 175, this.position.x + 15, this.position.y - 165, this.position.x - 7.5, this.position.y - 180); // links
            this.drawTriangle(this.position.x + 15, this.position.y - 175, this.position.x + 15, this.position.y - 165, this.position.x + 35, this.position.y - 180); // rechts 
            crc2.restore();
        }

        public explode(): void {
            this.draw();
            this.alpha -= this.alphaTime / 100;
            this.position.x += this.dx;
            this.position.y += this.dy;
        }

        public drawTriangle(_x1: number, _y1: number, _x2: number, _y2: number, _x3: number, _y3: number): void {
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