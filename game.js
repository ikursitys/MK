import { Player } from "./player.js";
import { generateLogs } from "./generate-logs.js";
import { getRandom, createReloadButton, createElement } from "./utils.js";

const $arenas = document.querySelector("div.arenas");
const $formFight = document.querySelector(".control");
//const ATTACK = ["head", "body", "foot"];
const attack = {};
const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

let player1;
let player2;

class Game {
  playerAttack = () => {
    for (let item of $formFight) {
      if (item.checked && item.name === "hit") {
        attack.value = getRandom(HIT[item.value]);
        attack.hit = item.value;
      }

      if (item.checked && item.name === "defence") {
        attack.defence = item.value;
      }

      item.checked = false;
    }

    return attack;
  };

  fight = (player, enemy) => {
    if (player.hit != enemy.defence) {
      player2.changeHP(player.value);
      player2.renderHP();
      generateLogs("hit", player1, player2, player.value);
    } else if (player.hit === enemy.defence) {
      generateLogs("defence", player1, player2);
    }

    if (enemy.hit != player.defence) {
      player1.changeHP(player.value);
      player1.renderHP();
      generateLogs("hit", player2, player1, enemy.value);
    } else if (enemy.hit === player.defence) {
      generateLogs("defence", player2, player1);
    }
  };

  getMyPlayer = async () => {
    const player = JSON.parse(localStorage.getItem("player1"));
    return player;
  };

  checkWinner = () => {
    if (player1.hp === 0 || player2.hp === 0) {
      createReloadButton();
      $formFight.style.display = "none";
    }
    if (player1.hp === 0 && player1.hp < player2.hp) {
      $arenas.appendChild(this.playerWins(player2.name));
      generateLogs("end", player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
      $arenas.appendChild(this.playerWins(player1.name));
      generateLogs("end", player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
      $arenas.appendChild(this.playerWins());
      generateLogs("draw");
    }
  };

  playerWins = (name) => {
    const $winTitle = createElement("div", "loseTitle");
    if (name) {
      $winTitle.innerText = name + " wins!";
    } else $winTitle.innerText = "Draw";
    return $winTitle;
  };

  getPlayers = async () => {
    const body = fetch(
      "https://reactmarathon-api.herokuapp.com/api/mk/players"
    ).then((res) => res.json());
    return body;
  };

  getComputerPlayer = async () => {
    const body = fetch(
      "https://reactmarathon-api.herokuapp.com/api/mk/player/choose"
    ).then((res) => res.json());
    console.log(body);
    return body;
  };

  getEnemy = async (player) => {
    const r = fetch(
      "http://reactmarathon-api.herokuapp.com/api/mk/player/fight",
      {
        method: "POST",
        body: JSON.stringify({
          hit: player.hit,
          defence: player.defence,
        }),
      }
    ).then((res) => res.json());
    console.log(444, r);
    return r;
  };

  start = async () => {
    const players = await this.getPlayers();

    //const p1 = players[getRandom(players.length - 1)];
    const p2 = await this.getComputerPlayer();
    const p1 = await this.getMyPlayer();

    player1 = new Player({
      ...p1,
      player: 1,
    });

    player2 = new Player({
      ...p2,
      player: 2,
    });

    $arenas.appendChild(player1.create());
    $arenas.appendChild(player2.create());
    generateLogs("start", player1, player2);

    $formFight.addEventListener("submit", async (e) => {
      e.preventDefault();

      const player = this.playerAttack();
      const fightValues = await this.getEnemy(player);

      this.fight(fightValues.player1, fightValues.player2);

      this.checkWinner();
    });
  };
}

export default Game;
