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

    export let currentShape: Rocket;

    let particles: Rocket[] = [];

    window.addEventListener("load", handleLoad);

    export let crc2: CanvasRenderingContext2D;

    async function handleLoad(_event: Event): Promise<void> {

        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~haasannk/Database/?command=find&collection=Rocketlist");
        let offer: string = await response.text();
        //console.log(offer);
        let dataJson: DataEntries = JSON.parse(offer);
        console.log("hier startet data.json");
        console.log(dataJson.data);
        //console.log("Response", response);
        //console.log(dataJson);

        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("#canvas");

        if (!canvas) // siehe Lektion
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        console.log("Canvas");

        canvas.addEventListener("click", createRocket);

        let addButton: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#addRocket");
        addButton.addEventListener("click", addRocket);

        showSavedRockets(dataJson);

        window.setInterval(update, 20);
    }

    function update(): void {
        requestAnimationFrame(animateExplosion);
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
        let colorPicker2: string = <string>formData.get("Color2"); // get color 2

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

            let color: string;

            if (i < amount / 2) {
                color = colorPicker1;
            } else {
                color = colorPicker2;
            }

            let position: Vector = { x: positionX, y: positionY };

            let dx: number = (Math.random() - 0.5) * (Math.random() * 6);
            let dy: number = (Math.random() - 0.5) * (Math.random() * 6);

            switch (currentShape) {
                case "circle":
                    currentParticle = new Circle(position, dx, dy, lifetime, name, color);
                    break;
                case "drop":
                    currentParticle = new Drop(position, dx, dy, lifetime, name, color);
                    break;
                case "star":
                    currentParticle = new Star(position, dx, dy, lifetime, name, color);
                    break;
                default:
                return;
            }
            particles.push(currentParticle);
        }

    }

    function animateExplosion(): void {

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

    }
    
    function addRocket(_event: MouseEvent): void {
        let rocketList: HTMLElement = <HTMLElement>document.getElementById("list");
      
        let name: HTMLInputElement = <HTMLInputElement>document.querySelector("#name");
        
        let divRocket: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        divRocket.classList.add("divNewRocket");
        rocketList.appendChild(divRocket);

        let editButton: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        editButton.classList.add("fa-solid", "fa-pen-to-square","editbutton");
        divRocket.appendChild(editButton);

        let newRocket: HTMLParagraphElement = document.createElement("p");
        newRocket.classList.add("name");
        divRocket.appendChild(newRocket);
        newRocket.innerHTML = name.value;

        let deleteButton: HTMLDivElement = document.createElement("div");
        deleteButton.classList.add("deleteButton");
        deleteButton.innerHTML = '<i class = "trash fas fa-trash-alt"></i>';
        newRocket.appendChild(deleteButton);

        divRocket.addEventListener("click", deleteRocket);
        editButton.addEventListener("click", deleteRocket);

        sendItem();

        window.setInterval(function(): void {
            window.location.reload();
        },                 500);

    }

    export function deleteRocket(_event: MouseEvent): void {
        let target: HTMLElement = <HTMLElement>_event.target;
        let currentTarget: HTMLElement = <HTMLElement>_event.currentTarget;
        let parentElement: HTMLElement = <HTMLElement>currentTarget.parentElement;

        if (target.classList.contains("deleteButton") || target.classList.contains("trash") || target.classList.contains("editbutton")) {
            parentElement.removeChild(currentTarget);
        }
    }
      
}