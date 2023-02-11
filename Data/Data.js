"use strict";
var Feuerwerk;
(function (Feuerwerk) {
    //Funktion um die Datenbankliste anzeigen zu lassen
    function showSavedRockets(_data) {
        console.log(_data);
        // Neue Liste wird kreiert um die entries ID in einer seperaten Liste zu bekommen (Kannst du mit console.log(entries[x]) probieren)
        // x ist die Array stelle, falls man es überprüfen will
        let entries = [];
        // going through every key in the json.data and pushing it in the new created list - pushing in entries. Then they have the ID!
        //Typ: any = entry; // Modifying entry because Typescript is making things difficult with the types?
        for (let entry in _data.data) {
            entries.push(entry);
        }
        /* console.log("Hier ist entrie 1");
        console.log(entries[0]); */
        //Für jedes Element von entries werden ein neuer Rocket kreiert mit den jeweiligen HTMLelementen (also radio, deletebutton, Name)
        // mit entry.Name wird dann auf den Namen des jeweiligen Json Objekts zugegriffen, damit dieser Name angegeben wird
        for (let entryID of entries) {
            let entry = _data.data[entryID];
            let rocketList = document.getElementById("list");
            //let name: HTMLInputElement = <HTMLInputElement>document.querySelector("#name");
            let divRocket = document.createElement("div");
            divRocket.classList.add("divNewRocket");
            rocketList.appendChild(divRocket);
            let radiobutton = document.createElement("input");
            radiobutton.classList.add("radiobutton");
            radiobutton.type = "radio";
            radiobutton.name = "Rocket";
            divRocket.appendChild(radiobutton);
            let newRocket = document.createElement("p");
            newRocket.classList.add("name");
            divRocket.appendChild(newRocket);
            newRocket.innerHTML = entry.Name;
            let deleteButton = document.createElement("div");
            deleteButton.classList.add("deleteButton");
            deleteButton.innerHTML = '<i class = "trash fas fa-trash-alt"></i>';
            newRocket.appendChild(deleteButton);
            divRocket.addEventListener("click", Feuerwerk.deleteRocket);
            deleteButton.addEventListener("click", function () {
                removeFromDatalist(entryID);
            });
            /*    console.log("Hier ist entryID");
               console.log(entryID[12]); */
        }
    }
    Feuerwerk.showSavedRockets = showSavedRockets;
    async function sendItem() {
        console.log("Send to server");
        let formData = new FormData(document.forms[0]);
        let json = {};
        //Mit dem for loop werden alle Werte in der Form durchiteriert und aufgenommen, so dass man diese Eigenschaften bzw. Werte weitergeben kann
        // Anstatt, dass du formData.name hast, heißt es "key"
        //da es nicht nur durch den Wert vom Namen geht sondern von allen Werten, welche in der Form sind
        for (let key of formData.keys())
            if (!json[key]) {
                let values = formData.getAll(key); // get all elements
                json[key] = values.length > 1 ? values : values[0];
                console.log(values);
            }
        let query = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "Rocketlist");
        query.set("data", JSON.stringify(json));
        console.log(JSON.stringify(json));
        console.log("test");
        let url = "https:webuser.hs-furtwangen.de/~haasannk/Database/?";
        let response = await fetch(url + query.toString());
        console.log(response);
        console.log("data.sent");
    }
    Feuerwerk.sendItem = sendItem;
    async function removeFromDatalist(_dataID) {
        let query = new URLSearchParams();
        query.set("command", "delete");
        query.set("collection", "Rocketlist");
        query.set("id", _dataID.toString());
        let url = "https:webuser.hs-furtwangen.de/~haasannk/Database/?";
        let response = await fetch(url + query.toString());
        console.log(response);
        console.log("delete");
        console.log(_dataID);
    }
    Feuerwerk.removeFromDatalist = removeFromDatalist;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=Data.js.map