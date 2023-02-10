/*
Aufgabe: Endabgabe – Feuerwerk
Name: Ann-Kathrin Haas
Matrikel: 271111
Datum: XX.02.23
Quellen: Cindy Nguyen
*/

namespace Feuerwerk {

    export interface Vector {
        x: number;
        y: number;
    }

    export enum SHAPE {
        CIRCLE = "circle",
        DROP = "drop",
        STAR = "star"
    }

    export let currentShape: Rocket;

    let particles: Rocket[] = [];

    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#canvas");

        if (!canvas) // siehe Lektion
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        console.log("Canvas");

        canvas.addEventListener("click", createRocket);

        let addButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#addRocket");
        addButton.addEventListener("click", addRocket);

        /* let addButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addRocket");
        addButton.addEventListener("click", addRocket); */

        window.setInterval(update, 20);
    }

    function update(): void {
        requestAnimationFrame(explosionAnimation);
    }

    function createRocket(_event: MouseEvent): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#canvas");

        //DomRect = getBoundingClientrect gibt wieder an welcher Position das Objekt ist, es auf dem HTML ist.
        //Bzw, Wo das Canvas im HTML ist. Positioniert dieses und somit kann man die x und y Werte vom Canvas lesen.
        let rect: DOMRect = canvas.getBoundingClientRect();

        let positionX: number = _event.clientX - rect.left;
        let positionY: number = _event.clientY - rect.top;
        console.log(positionX, positionY);

        let formData: FormData = new FormData(document.forms[0]); // get form elements

        let name: string = <string>formData.get("Name"); // get name
        
        let colorPicker1: string = <string>formData.get("Color1"); // get color 1
        //let colorPicker2: string = <string>formData.get("Color2"); // get color 2

        let lifetimeString: string = <string>formData.get("Lifetime"); // get alphatime/lifetime
        let lifetime: number = parseInt(lifetimeString);

        let amountString: string = <string>formData.get("Amount"); // get amount
        let amount: number = parseInt(amountString);

        let targetShape: string = <string>formData.get("Shape"); // get string from formdata
        console.log(targetShape);

        let currentShape: string = <string>targetShape;

        let currentParticle: Rocket;

        // particles color 1
        for (let i: number = 0; i <= amount; i++) {

            let position: Vector = { x: positionX, y: positionY };

            let dx: number = (Math.random() - 0.5) * (Math.random() * 6);
            let dy: number = (Math.random() - 0.5) * (Math.random() * 6);

            switch (currentShape) {
                case SHAPE.CIRCLE:
                    currentParticle = new Circle(position, dx, dy, lifetime, name, colorPicker1);
                    break;
                case SHAPE.DROP:
                    currentParticle = new Drop(position, dx, dy, lifetime, name, colorPicker1);
                    break;
                case SHAPE.STAR:
                    currentParticle = new Star(position, dx, dy, lifetime, name, colorPicker1);
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
    

    function explosionAnimation(): void {

        // making particle Animation that it fades and splices from Array

        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#canvas");

        crc2.clearRect(0, 0, canvas.width, canvas.height);

        for (let particle of particles) {
            if (particle.alpha <= 0) {
                let index: number = particles.indexOf(particle);
                particles.splice(index, 1);
            }
            else {
                particle.explode();
            }
        }

        //console.log(particles);
    }
    
    function addRocket(_event: MouseEvent): void {
        let rocketList: HTMLElement = <HTMLElement>document.getElementById("list");
        /* let formData: FormData = new FormData(document.forms[0]); // get form elements
        let name: string = <string>formData.get("Name"); // get name */

        let name: HTMLInputElement = <HTMLInputElement>document.querySelector("#name");
        
        let divRocket: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        divRocket.classList.add("divRocket");
        rocketList.appendChild(divRocket);
        //divRocket.style.position = "relative";
        //divRocket.style.top = "20px";

        let radiobutton: HTMLButtonElement = <HTMLButtonElement>document.createElement("input");
        radiobutton.classList.add("radiobutton");
        radiobutton.type = "radio";
        divRocket.appendChild(radiobutton);

        let newRocket: HTMLParagraphElement = document.createElement("p");
        newRocket.classList.add("name");
        rocketList.appendChild(newRocket);
        newRocket.innerHTML = name.value;
        //console.log("added: " + name.value);
        alert("added: " + name.value);

        let deleteButton: HTMLButtonElement = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.innerHTML = '<i class = "trash fas fa-trash-alt"></i>';
        divRocket.appendChild(deleteButton);
    }
      
}