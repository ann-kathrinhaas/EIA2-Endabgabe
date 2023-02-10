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
        SHAPE[SHAPE["STAR"] = 2] = "STAR";
    })(SHAPE = Feuerwerk.SHAPE || (Feuerwerk.SHAPE = {}));
    /*
        let circleButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("particle1");
        circleButton.addEventListener("click", shootRocket);
    
        let dropButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("particle2");
        dropButton.addEventListener("click", shootRocket);
    
        let starButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("particle3");
        starButton.addEventListener("click", shootRocket); */
    window.addEventListener("load", handleLoad);
    let particles = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("#canvas");
        if (!canvas) // siehe Lektion
            return;
        Feuerwerk.crc2 = canvas.getContext("2d");
        console.log("Canvas");
        canvas.addEventListener("click", shootRocket);
        window.setInterval(update, 20);
    }
    function update() {
        requestAnimationFrame(explosionAnimation);
    }
    function shootRocket(_event) {
        let canvas = document.querySelector("#canvas");
        let rect = canvas.getBoundingClientRect();
        let positionX = _event.clientX - rect.left;
        let positionY = _event.clientY - rect.top;
        console.log(positionX, positionY);
        let formData = new FormData(document.forms[0]); // get form elements
        let name = formData.get("Name"); // get name
        let colorPicker1 = formData.get("Color1"); // get color 1
        let colorPicker2 = formData.get("Color2"); // get color 2
        let lifetimeString = formData.get("Lifetime"); // get lifetime
        let lifetime = parseInt(lifetimeString);
        let amountString = formData.get("Amount"); // get amount
        let amount = parseInt(amountString);
        // particles color 1
        for (let i = 0; i <= amount; i++) {
            let position = { x: positionX, y: positionY };
            let dx = (Math.random() - 0.5) * (Math.random() * 6);
            let dy = (Math.random() - 0.5) * (Math.random() * 6);
            let circle = new Feuerwerk.Circle(position, dx, dy, lifetime, name, colorPicker1);
            //let circle: Rocket = new Circle(position, dx, dy, lifetime, name, colorPicker1);
            particles.push(circle);
        }
        // particles color 2
        for (let i = 0; i <= amount; i++) {
            let position = { x: positionX, y: positionY };
            let dx = (Math.random() - 0.5) * (Math.random() * 6);
            let dy = (Math.random() - 0.5) * (Math.random() * 6);
            let circle = new Feuerwerk.Circle(position, dx, dy, lifetime, name, colorPicker2);
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