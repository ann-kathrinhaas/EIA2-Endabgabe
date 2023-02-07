"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    class Circle extends Feuerwerk.Rocket {
        constructor(_position, _name, _color1, _color2) {
            super(_position, _name, _color1, _color2);
            this.draw();
        }
        draw() {
            Feuerwerk.crc2.save();
            //crc2.translate(this.position.x, this.position.y);
            this.drawArc(this.position.x, this.position.y, 5, 0, 2 * Math.PI, this.color1);
            Feuerwerk.crc2.restore();
            console.log("draw");
        }
        drawArc(_x, _y, _radius, _startAngle, _endAngle, _color) {
            Feuerwerk.crc2.beginPath();
            Feuerwerk.crc2.arc(_x, _y, _radius, _startAngle, _endAngle * Math.PI);
            Feuerwerk.crc2.fillStyle = _color;
            Feuerwerk.crc2.fill();
            Feuerwerk.crc2.closePath();
            console.log("draw arc");
        }
    }
    Feuerwerk.Circle = Circle;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Circle.js.map