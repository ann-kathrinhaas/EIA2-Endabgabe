"use strict";
/*
Aufgabe: Endabgabe – Feuerwerk
Name: Ann-Kathrin Haas
Matrikel: 271111
Datum: XX.02.23
Quellen: Cindy Nguyen
*/
var Feuerwerk;
(function (Feuerwerk) {
    let SHAPE;
    (function (SHAPE) {
        SHAPE[SHAPE["CIRCLE"] = 0] = "CIRCLE";
        SHAPE[SHAPE["DROP"] = 1] = "DROP";
        SHAPE[SHAPE["LINE"] = 2] = "LINE";
    })(SHAPE = Feuerwerk.SHAPE || (Feuerwerk.SHAPE = {}));
    window.addEventListener("load", handleLoad);
    //let rockets: Rocket[] = [];
    let particles = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("#canvas");
        if (!canvas) // siehe Lektion
            return;
        Feuerwerk.crc2 = canvas.getContext("2d");
        console.log("Canvas");
        canvas.addEventListener("click", Rocket);
        window.setInterval(update, 20);
    }
    function update() {
        requestAnimationFrame(explosionAnimation);
    }
    function Rocket(_event) {
        let canvas = document.querySelector("#canvas");
        let rect = canvas.getBoundingClientRect();
        let positionX = _event.clientX - rect.left;
        let positionY = _event.clientY - rect.top;
        console.log(positionX, positionY);
        let rgba1 = Math.floor(Math.random() * 255);
        let rgba2 = Math.floor(Math.random() * 255);
        let rgba3 = Math.floor(Math.random() * 255);
        let color = "RGB" + "(" + rgba1 + "," + rgba2 + "," + rgba3 + ")";
        for (let i = 0; i <= 10; i++) {
            let position = { x: positionX, y: positionY };
            let dx = (Math.random() - 0.5) * (Math.random() * 6);
            let dy = (Math.random() - 0.5) * (Math.random() * 6);
            let size = 5;
            let circle = new Feuerwerk.Line(position, dx, dy, size, "testRocket", color, color);
            particles.push(circle);
        }
        console.log(particles);
    }
    function explosionAnimation() {
        // making particle Animation that it fades and splices from Array
        let canvas = document.querySelector("#canvas");
        Feuerwerk.crc2.clearRect(0, 0, canvas.width, canvas.height);
        for (let circle of particles) {
            if (circle.alpha <= 0) {
                let index = particles.indexOf(circle);
                particles.splice(index, 1);
            }
            else {
                circle.explode();
            }
        }
        //console.log(particles);
    }
    /* function drawCircle(_event: MouseEvent): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#canvas");

        //DomRect = getBoundingClientrect gibt wieder an welcher Position das Objekt ist, es auf dem HTML ist.
        //Bzw, Wo das Canvas im HTML ist. Positioniert dieses und somit kann man die x und y Werte vom Canvas lesen.
        let rect: DOMRect = canvas.getBoundingClientRect();
        let positionX: number = _event.clientX - rect.left;
        let positionY: number = _event.clientY - rect.top;

        let position: Vector = { x: positionX, y: positionY};
        console.log(position);

        rockets.push(new Circle(position, "Rocky", "red", "blue"));
    }

    function drawDrop(_event: MouseEvent) {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#canvas");

        let rect: DOMRect = canvas.getBoundingClientRect();
        let positionX: number = _event.clientX - rect.left;
        let positionY: number = _event.clientY  - rect.top;

        let position: Vector = { x: positionX, y: positionY };
        console.log(position);

        rockets.push(new Drop(position, "Rocky", "lightblue", "blue"));
    }

    function drawLine(_event: MouseEvent) {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#canvas");

        let rect: DOMRect = canvas.getBoundingClientRect();
        let positionX: number = _event.clientX - rect.left;
        let positionY: number = _event.clientY - rect.top;

        let position: Vector = { x: positionX, y: positionY };
        console.log(position);

        rockets.push(new Line(position, "Rocky", "lightblue", "blue"));
    } */
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Main.js.map