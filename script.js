function randomID(min, max, list){
    let id = null;
    do{
        id = Math.floor(Math.random() * (max - min) + min) + 1;
    }while(list.includes(id));
    idList.push(id);
    return id;
}

function changeIcon(user, id){
    user.src = "./materials/" + id + ".png";
}

async function arrangeWinners(sortedPlayers){

    for(let player of sortedPlayers){
        player.div.classList.remove("first", "second", "third", "fourth");
    }
    if(sortedPlayers[3].score !== 0){
        sortedPlayers[3].div.classList.add("first");
        sortedPlayers[3].div.children[0].textContent = sortedPlayers[3].name + " " + sortedPlayers[3].score;
        sortedPlayers[2].div.classList.add("second");
        sortedPlayers[2].div.children[0].textContent = sortedPlayers[2].name + " " + sortedPlayers[2].score;
        sortedPlayers[1].div.classList.add("third");
        sortedPlayers[1].div.children[0].textContent = sortedPlayers[1].name + " " + sortedPlayers[1].score;
        sortedPlayers[0].div.classList.add("fourth");
        sortedPlayers[0].div.children[0].textContent = sortedPlayers[0].name + " " + sortedPlayers[0].score;
    }

}

async function getData(){
    let url = "https://sheets.googleapis.com/v4/spreadsheets/1ChUQiPVy96nn_m3Y0Kz-s6sNyBQT0vEK7bM4Sqljqks/"+
                "values/B1%3AB4?key=AIzaSyCHBc-YVniol4YHpcVGjv-CZ5aGITFlBaI";

    response = await fetch(url);
    if (response.ok){
        let json = await response.json();
        return json.values;
    }else {
        alert("Error HTTP: " + response.status);
        return;
    }
    
}

async function distributeScores(people){
    let scores = await getData();
    people[0].score = +scores[0][0];
    people[1].score = +scores[1][0];
    people[2].score = +scores[2][0];
    people[3].score = +scores[3][0];
    
}

async function displayPlayers(){
    changeIcon(daud.div.children[1], daud.id);
    changeIcon(zagid.div.children[1], zagid.id);
    changeIcon(abdul.div.children[1], abdul.id);
    changeIcon(mate.div.children[1], mate.id);

    await distributeScores(players);
    

    let sortedByScores = players.sort((a, b) => (a.score > b.score) ? 1 : -1); 

    arrangeWinners(sortedByScores);
}


function Player(name){
    this.name = name;
    this.id = 0;
    this.score = 0;
}

let daud = new Player("Daud");
let zagid = new Player("Zagid");
let abdul = new Player("Abdul");
let mate = new Player("Mate");

let players = [daud, zagid, abdul, mate];

daud.div  = document.querySelector("#daud");
zagid.div = document.querySelector("#zagid");
abdul.div = document.querySelector("#abdul");
mate.div  = document.querySelector("#mate");

let idList  = [];
daud.id  = randomID(1, 25, idList);
zagid.id = randomID(1, 25, idList);
abdul.id = randomID(1, 25, idList);
mate.id  = randomID(1, 25, idList);

displayPlayers();