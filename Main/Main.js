"use strict";
/*
Aufgabe: Endabgabe – Feuerwerk
Name: Ann-Kathrin Haas
Matrikel: 271111
Datum: 12.02.23
Quellen: Cindy Nguyen
*/
var Feuerwerk;
(function (Feuerwerk) {
    let particles = [];
    window.addEventListener("load", handleLoad);
    async function handleLoad() {
        let response = await fetch("https://webuser.hs-furtwangen.de/~haasannk/Database/?command=find&collection=Rocketlist");
        let offer = await response.text();
        let dataJson = JSON.parse(offer);
        let canvas = document.querySelector("#canvas");
        if (!canvas)
            return;
        Feuerwerk.crc2 = canvas.getContext("2d");
        canvas.addEventListener("click", createRocket);
        let addButton = document.querySelector("#addRocket");
        addButton.addEventListener("click", addRocket);
        Feuerwerk.showSavedRockets(dataJson);
        window.setInterval(update, 20);
    }
    function update() {
        requestAnimationFrame(animateExplosion);
    }
    function createRocket(_event) {
        let canvas = document.querySelector("#canvas");
        let rect = canvas.getBoundingClientRect();
        let positionX = _event.clientX - rect.left;
        let positionY = _event.clientY - rect.top;
        let formData = new FormData(document.forms[0]);
        let name = formData.get("Name");
        let colorPicker1 = formData.get("Color1");
        let colorPicker2 = formData.get("Color2");
        let lifetimeString = formData.get("Lifetime");
        let lifetime = parseInt(lifetimeString);
        let amountString = formData.get("Amount");
        let amount = parseInt(amountString);
        let targetShape = formData.get("Shape");
        let currentShape = targetShape;
        let currentParticle;
        for (let i = 0; i <= amount; i++) {
            let color;
            if (i < amount / 2) {
                color = colorPicker1;
            }
            else {
                color = colorPicker2;
            }
            let position = { x: positionX, y: positionY };
            let dx = (Math.random() - 0.5) * (Math.random() * 6);
            let dy = (Math.random() - 0.5) * (Math.random() * 6);
            switch (currentShape) {
                case "circle":
                    currentParticle = new Feuerwerk.Circle(position, dx, dy, lifetime, name, color);
                    break;
                case "drop":
                    currentParticle = new Feuerwerk.Drop(position, dx, dy, lifetime, name, color);
                    break;
                case "star":
                    currentParticle = new Feuerwerk.Star(position, dx, dy, lifetime, name, color);
                    break;
                default:
                    return;
            }
            particles.push(currentParticle);
        }
    }
    function animateExplosion() {
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
    }
    function addRocket(_event) {
        let rocketList = document.getElementById("list");
        let name = document.querySelector("#name");
        let divRocket = document.createElement("div");
        divRocket.classList.add("divNewRocket");
        rocketList.appendChild(divRocket);
        let editButton = document.createElement("div");
        editButton.classList.add("fa-solid", "fa-pen-to-square", "editbutton");
        divRocket.appendChild(editButton);
        let newRocket = document.createElement("p");
        newRocket.classList.add("name");
        divRocket.appendChild(newRocket);
        newRocket.innerHTML = name.value;
        let deleteButton = document.createElement("div");
        deleteButton.classList.add("deleteButton");
        deleteButton.innerHTML = '<i class = "trash fas fa-trash-alt"></i>';
        newRocket.appendChild(deleteButton);
        divRocket.addEventListener("click", deleteRocket);
        editButton.addEventListener("click", deleteRocket);
        Feuerwerk.sendItem();
        window.setInterval(function () {
            window.location.reload();
        }, 500);
    }
    function deleteRocket(_event) {
        let target = _event.target;
        let currentTarget = _event.currentTarget;
        let parentElement = currentTarget.parentElement;
        if (target.classList.contains("deleteButton") || target.classList.contains("trash") || target.classList.contains("editbutton")) {
            parentElement.removeChild(currentTarget);
        }
    }
    Feuerwerk.deleteRocket = deleteRocket;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Main.js.map