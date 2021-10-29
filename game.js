import { player1, player2 } from "./player.js";
import { generateLogs } from "./generate-logs.js";
import { getRandom, createReloadButton, createElement } from "./utils.js";

const $arenas = document.querySelector("div.arenas");
const $formFight = document.querySelector(".control");
const ATTACK = ["head", "body", "foot"];
const attack = {};
const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

class Game {
  enemyAttack = () => {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
      value: getRandom(HIT[hit]),
      hit,
      defence,
    };
  };

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

  fight = (player1, player2) => {
    const enemy = this.enemyAttack();
    const player = this.playerAttack();

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

  checkWinner = () => {
    if (player1.hp === 0 || player2.hp === 0) {
      createReloadButton();
      $formFight.style.display = "none";
    }
    if (player1.hp === 0 && player1.hp < player2.hp) {
      $arenas.appendChild(this.playerWins(player2.name));
      generateLogs("end", player2, player1);
      document.getElementById("player2img").src = "./assets/kitana-win.gif";
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
      $arenas.appendChild(this.playerWins(player1.name));
      generateLogs("end", player1, player2);
      document.getElementById("player1img").src = "./assets/scorpion-win.gif";
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

  start = () => {
    $arenas.appendChild(player1.create());
    $arenas.appendChild(player2.create());
    generateLogs("start", player1, player2);
    $formFight.addEventListener("submit", (e) => {
      e.preventDefault();
      this.fight(player1, player2);
      this.checkWinner();
    });
  };
}

export default Game;
