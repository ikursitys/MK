//Task 0
const player1 = {
  name: "SCORPION",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: "Kunai",
  attack: function () {
    console.log(this.name + " Fight...");
  },
};

const player2 = {
  name: "KITANA",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  weapon: "Steel Fans",
  attack: function () {
    console.log(this.name + " Fight...");
  },
};

//Task 1

// const createPlayer = (pClass, pName, hp) => {
//   const player = document.createElement("div");
//   const progressBar = document.createElement("div");
//   const character = document.createElement("div");
//   const life = document.createElement("div");
//   const name = document.createElement("div");
//   const img = document.createElement("img");
//   const arenas = document.querySelector("div.arenas");

//   player.classList.add(pClass);
//   progressBar.classList.add("progressbar");
//   character.classList.add("character");
//   life.classList.add("life");
//   name.classList.add("name");

//   life.style.width = hp + "%";
//   name.innerText = pName;

//   player.appendChild(progressBar);
//   player.appendChild(character);
//   progressBar.appendChild(life);
//   progressBar.appendChild(name);
//   character.appendChild(img);
//   arenas.appendChild(player);

//   img.src = "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif";
// };

//Task 2

// createPlayer("player1", "SCOPRPION", 100);
// createPlayer("player2", "SCORPION", 80);

// Task 3

const createPlayer = (pClass, object) => {
  const player = document.createElement("div");
  const progressBar = document.createElement("div");
  const character = document.createElement("div");
  const life = document.createElement("div");
  const name = document.createElement("div");
  const img = document.createElement("img");
  const arenas = document.querySelector("div.arenas");

  player.classList.add(pClass);
  progressBar.classList.add("progressbar");
  character.classList.add("character");
  life.classList.add("life");
  name.classList.add("name");

  life.style.width = object.hp + "%";
  name.innerText = object.name;

  player.appendChild(progressBar);
  player.appendChild(character);
  progressBar.appendChild(life);
  progressBar.appendChild(name);
  character.appendChild(img);
  arenas.appendChild(player);

  img.src = object.img;
};

createPlayer("player1", player1);
createPlayer("player2", player2);
