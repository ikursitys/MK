import { createElement } from "./utils.js";

class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.weapon = props.weapon;
  }
  elHP = () => {
    const $playerLife = document.querySelector(`.player${this.player} .life`);
    return $playerLife;
  };

  renderHP = () => {
    this.elHP().style.width = this.hp + "%";
  };

  changeHP = (number) => {
    if (this.hp > 0) {
      this.hp -= number;
    }
    if (this.hp <= 0) {
      this.hp = 0;
    }
  };

  attack = () => {
    console.log(`${this.name} Fight...`);
  };

  create = () => {
    const $player = createElement("div", `player${this.player}`);
    const $progressBar = createElement("div", "progressbar");
    const $character = createElement("div", "character");
    const $life = createElement("div", "life");
    const $name = createElement("div", "name");
    const $img = createElement("img");

    $life.style.width = `${this.hp}%`;
    $name.innerText = this.name;

    $player.appendChild($progressBar);
    $player.appendChild($character);
    $progressBar.appendChild($life);
    $progressBar.appendChild($name);
    $character.appendChild($img);

    $img.id = `player${this.player}img`;
    $img.src = this.img;

    return $player;
  };
}

const player1 = new Player({
  player: 1,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: "Kunai",
});

const player2 = new Player({
  player: 2,
  name: "Kitana",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  weapon: "Steel Fans",
});

export { player1, player2 };
