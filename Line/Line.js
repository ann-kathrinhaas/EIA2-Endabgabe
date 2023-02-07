"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    class Line extends Feuerwerk.Rocket {
        //public linewidth: number = 0.5;
        constructor(_position, _name, _color1, _color2) {
            super(_position, _name, _color1, _color2);
            this.draw();
        }
        draw() {
            Feuerwerk.crc2.save();
            this.drawLine(this.position.x, this.position.y, this.position.x, this.position.y + 10, this.color1);
            Feuerwerk.crc2.restore();
        }
        drawLine(_x1, _y1, _x2, _y2, _color) {
            Feuerwerk.crc2.beginPath();
            Feuerwerk.crc2.moveTo(_x1, _y1);
            Feuerwerk.crc2.lineTo(_x2, _y2);
            Feuerwerk.crc2.strokeStyle = _color;
            //crc2.lineWidth = _lineWidth;
            Feuerwerk.crc2.stroke();
            Feuerwerk.crc2.closePath();
        }
    }
    Feuerwerk.Line = Line;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Line.js.map