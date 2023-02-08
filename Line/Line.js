"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    class Line extends Feuerwerk.Rocket {
        //public linewidth: number = 0.5;
        constructor(_position, _dx, _dy, _size, _name, _color1, _color2) {
            super(_position, _dx, _dy, _size, _name, _color1, _color2);
        }
        draw() {
            Feuerwerk.crc2.save();
            this.drawLine(this.position.x, this.position.y, this.position.x, this.position.y + 10, this.color1);
            Feuerwerk.crc2.restore();
        }
        explode() {
            this.draw();
            this.alpha -= 0.01;
            this.position.x += this.dx;
            this.position.y += this.dy;
        }
        drawLine(_x1, _y1, _x2, _y2, _color) {
            Feuerwerk.crc2.beginPath();
            Feuerwerk.crc2.moveTo(_x1, _y1);
            Feuerwerk.crc2.lineTo(_x2, _y2);
            Feuerwerk.crc2.strokeStyle = _color;
            Feuerwerk.crc2.stroke();
            Feuerwerk.crc2.closePath();
        }
    }
    Feuerwerk.Line = Line;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Line.js.map