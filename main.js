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

const arenas = document.querySelector("div.arenas");

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

  img.src = object.img;
  return player;
};

arenas.appendChild(createPlayer("player1", player1));
arenas.appendChild(createPlayer("player2", player2));
