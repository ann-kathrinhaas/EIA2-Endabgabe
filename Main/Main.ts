/*
Aufgabe: Endabgabe – Feuerwerk
Name: Ann-Kathrin Haas
Matrikel: 271111
Datum: 12.02.23
Quellen: Cindy Nguyen
*/

namespace Feuerwerk {

    export interface Vector {
        x: number;
        y: number;
    }

    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;

    let background: ImageData;

    let rockets: Rocket[] = [];

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#canvas");

        if (!canvas) // siehe Lektion
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        console.log("Canvas");

        background = crc2.getImageData(0, 0, canvas.width, canvas.height);

        canvas.addEventListener("click", drawLine);

        //window.setInterval(update, 20);
    }

   

    function drawCircle(_event: MouseEvent): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#canvas");

        //DomRect = getBoundingClientrect gibt wieder an welcher Position das Objekt ist, es auf dem HTML ist.
        //Bzw, Wo das Canvas im HTML ist. Positioniert dieses und somit kann man die x und y Werte vom Canvas lesen.
        let rect: DOMRect = canvas.getBoundingClientRect();
        let positionX: number = _event.clientX - rect.left;
        let positionY: number = _event.clientY - rect.top;

        let position: Vector = { x: positionX, y: positionY };
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
    }
}