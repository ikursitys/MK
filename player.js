import { createElement } from "./utils.js";

const player1 = {
  player: 1,
  name: "SCORPION",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: "Kunai",
  attack: function () {
    console.log(this.name + " Fight...");
  },
  changeHP,
  renderHP,
  elHP,
};

const player2 = {
  player: 2,
  name: "KITANA",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  weapon: "Steel Fans",
  attack: function () {
    console.log(this.name + " Fight...");
  },
  changeHP,
  renderHP,
  elHP,
};

function elHP() {
  const $playerLife = document.querySelector(
    ".player" + this.player + " .life"
  );
  return $playerLife;
}

function renderHP() {
  this.elHP().style.width = this.hp + "%";
}

function changeHP(number) {
  if (this.hp > 0) {
    this.hp -= number;
  }
  if (this.hp <= 0) {
    this.hp = 0;
  }
}

const createPlayer = (object) => {
  const { player, name, hp, img } = object;

  const $player = createElement("div", "player" + player);
  const $progressBar = createElement("div", "progressbar");
  const $character = createElement("div", "character");
  const $life = createElement("div", "life");
  const $name = createElement("div", "name");
  const $img = createElement("img");

  $life.style.width = hp + "%";
  $name.innerText = name;

  $player.appendChild($progressBar);
  $player.appendChild($character);
  $progressBar.appendChild($life);
  $progressBar.appendChild($name);
  $character.appendChild($img);

  $img.id = "player" + player + "img";
  $img.src = img;

  return $player;
};

export { player1, player2, createPlayer };
