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
        SHAPE["CIRCLE"] = "circle";
        SHAPE["DROP"] = "drop";
        SHAPE["STAR"] = "star";
    })(SHAPE = Feuerwerk.SHAPE || (Feuerwerk.SHAPE = {}));
    let particles = [];
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        let canvas = document.querySelector("#canvas");
        if (!canvas) // siehe Lektion
            return;
        Feuerwerk.crc2 = canvas.getContext("2d");
        console.log("Canvas");
        canvas.addEventListener("click", createRocket);
        let addButton = document.querySelector("#addRocket");
        addButton.addEventListener("click", addRocket);
        /* let addButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addRocket");
        addButton.addEventListener("click", addRocket); */
        window.setInterval(update, 20);
    }
    function update() {
        requestAnimationFrame(explosionAnimation);
    }
    function createRocket(_event) {
        let canvas = document.querySelector("#canvas");
        //DomRect = getBoundingClientrect gibt wieder an welcher Position das Objekt ist, es auf dem HTML ist.
        //Bzw, Wo das Canvas im HTML ist. Positioniert dieses und somit kann man die x und y Werte vom Canvas lesen.
        let rect = canvas.getBoundingClientRect();
        let positionX = _event.clientX - rect.left;
        let positionY = _event.clientY - rect.top;
        console.log(positionX, positionY);
        let formData = new FormData(document.forms[0]); // get form elements
        let name = formData.get("Name"); // get name
        let colorPicker1 = formData.get("Color1"); // get color 1
        //let colorPicker2: string = <string>formData.get("Color2"); // get color 2
        let lifetimeString = formData.get("Lifetime"); // get alphatime/lifetime
        let lifetime = parseInt(lifetimeString);
        let amountString = formData.get("Amount"); // get amount
        let amount = parseInt(amountString);
        let targetShape = formData.get("Shape"); // get string from formdata
        console.log(targetShape);
        let currentShape = targetShape;
        let currentParticle;
        // particles color 1
        for (let i = 0; i <= amount; i++) {
            let position = { x: positionX, y: positionY };
            let dx = (Math.random() - 0.5) * (Math.random() * 6);
            let dy = (Math.random() - 0.5) * (Math.random() * 6);
            switch (currentShape) {
                case SHAPE.CIRCLE:
                    currentParticle = new Feuerwerk.Circle(position, dx, dy, lifetime, name, colorPicker1);
                    break;
                case SHAPE.DROP:
                    currentParticle = new Feuerwerk.Drop(position, dx, dy, lifetime, name, colorPicker1);
                    break;
                case SHAPE.STAR:
                    currentParticle = new Feuerwerk.Star(position, dx, dy, lifetime, name, colorPicker1);
                    break;
                default:
                    return;
            }
            particles.push(currentParticle);
        }
    }
    // particles color 2
    /* for (let i: number = 0; i <= amount; i++) {

        let position: Vector = { x: positionX, y: positionY };

        let dx: number = (Math.random() - 0.5) * (Math.random() * 6);
        let dy: number = (Math.random() - 0.5) * (Math.random() * 6);

        let circle: Rocket = new Star(position, dx, dy, lifetime, name, colorPicker2);
        particles.push(circle);
    }

    console.log(particles); */
    function explosionAnimation() {
        // making particle Animation that it fades and splices from Array
        let canvas = document.querySelector("#canvas");
        Feuerwerk.crc2.clearRect(0, 0, canvas.width, canvas.height);
        for (let particle of particles) {
            if (particle.alpha <= 0) {
                let index = particles.indexOf(particle);
                particles.splice(index, 1);
            }
            else {
                particle.explode();
            }
        }
        //console.log(particles);
    }
    function addRocket(_event) {
        let rocketList = document.getElementById("list");
        /* let formData: FormData = new FormData(document.forms[0]); // get form elements
        let name: string = <string>formData.get("Name"); // get name */
        let name = document.querySelector("#name");
        let divRocket = document.createElement("div");
        divRocket.classList.add("divRocket");
        rocketList.appendChild(divRocket);
        //divRocket.style.position = "relative";
        //divRocket.style.top = "20px";
        let radiobutton = document.createElement("input");
        radiobutton.classList.add("radiobutton");
        radiobutton.type = "radio";
        divRocket.appendChild(radiobutton);
        let newRocket = document.createElement("p");
        newRocket.classList.add("name");
        rocketList.appendChild(newRocket);
        newRocket.innerHTML = name.value;
        //console.log("added: " + name.value);
        alert("added: " + name.value);
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.innerHTML = '<i class = "trash fas fa-trash-alt"></i>';
        divRocket.appendChild(deleteButton);
    }
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Main.js.map