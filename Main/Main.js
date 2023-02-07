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
    window.addEventListener("load", handleLoad);
    let background;
    let rockets = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("#canvas");
        if (!canvas) // siehe Lektion
            return;
        Feuerwerk.crc2 = canvas.getContext("2d");
        console.log("Canvas");
        background = Feuerwerk.crc2.getImageData(0, 0, canvas.width, canvas.height);
        canvas.addEventListener("click", drawLine);
        //window.setInterval(update, 20);
    }
    function drawCircle(_event) {
        let canvas = document.querySelector("#canvas");
        //DomRect = getBoundingClientrect gibt wieder an welcher Position das Objekt ist, es auf dem HTML ist.
        //Bzw, Wo das Canvas im HTML ist. Positioniert dieses und somit kann man die x und y Werte vom Canvas lesen.
        let rect = canvas.getBoundingClientRect();
        let positionX = _event.clientX - rect.left;
        let positionY = _event.clientY - rect.top;
        let position = { x: positionX, y: positionY };
        console.log(position);
        rockets.push(new Feuerwerk.Circle(position, "Rocky", "red", "blue"));
    }
    function drawDrop(_event) {
        let canvas = document.querySelector("#canvas");
        let rect = canvas.getBoundingClientRect();
        let positionX = _event.clientX - rect.left;
        let positionY = _event.clientY - rect.top;
        let position = { x: positionX, y: positionY };
        console.log(position);
        rockets.push(new Feuerwerk.Drop(position, "Rocky", "lightblue", "blue"));
    }
    function drawLine(_event) {
        let canvas = document.querySelector("#canvas");
        let rect = canvas.getBoundingClientRect();
        let positionX = _event.clientX - rect.left;
        let positionY = _event.clientY - rect.top;
        let position = { x: positionX, y: positionY };
        console.log(position);
        rockets.push(new Feuerwerk.Line(position, "Rocky", "lightblue", "blue"));
    }
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Main.js.map