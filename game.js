import { player1, player2 } from "./player.js";
import { Log } from "./logs.js";
import { getRandom, createReloadButton, createElement } from "./utils.js";

class Game {
  constructor() {
    this.$arenas = document.querySelector("div.arenas");
    this.$formFight = document.querySelector(".control");
    this.ATTACK = ["head", "body", "foot"];
    this.attack = {};
    this.HIT = {
      head: 30,
      body: 25,
      foot: 20,
    };
  }
  enemyAttack = () => {
    const hit = this.ATTACK[getRandom(3) - 1];
    const defence = this.ATTACK[getRandom(3) - 1];

    return {
      value: getRandom(this.HIT[hit]),
      hit,
      defence,
    };
  };

  playerAttack = () => {
    for (let item of this.$formFight) {
      if (item.checked && item.name === "hit") {
        this.attack.value = getRandom(this.HIT[item.value]);
        this.attack.hit = item.value;
      }

      if (item.checked && item.name === "defence") {
        this.attack.defence = item.value;
      }

      item.checked = false;
    }

    return this.attack;
  };

  fight = (player1, player2) => {
    const enemy = this.enemyAttack();
    const player = this.playerAttack();

    if (player.hit != enemy.defence) {
      player2.changeHP(player.value);
      player2.renderHP();
      Log.generateLogs("hit", player1, player2, player.value);
    } else if (player.hit === enemy.defence) {
      Log.generateLogs("defence", player1, player2);
    }

    if (enemy.hit != player.defence) {
      player1.changeHP(player.value);
      player1.renderHP();
      Log.generateLogs("hit", player2, player1, enemy.value);
    } else if (enemy.hit === player.defence) {
      Log.generateLogs("defence", player2, player1);
    }
  };

  checkWinner = () => {
    if (player1.hp === 0 || player2.hp === 0) {
      createReloadButton();
      this.$formFight.style.display = "none";
    }
    if (player1.hp === 0 && player1.hp < player2.hp) {
      this.$arenas.appendChild(this.playerWins(player2.name));
      Log.generateLogs("end", player2, player1);
      document.getElementById("player2img").src = "./assets/kitana-win.gif";
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
      this.$arenas.appendChild(this.playerWins(player1.name));
      Log.generateLogs("end", player1, player2);
      document.getElementById("player1img").src = "./assets/scorpion-win.gif";
    } else if (player1.hp === 0 && player2.hp === 0) {
      this.$arenas.appendChild(this.playerWins());
      Log.generateLogs("draw");
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
    this.$arenas.appendChild(player1.create());
    this.$arenas.appendChild(player2.create());
    Log.generateLogs("start", player1, player2);
    this.$formFight.addEventListener("submit", (e) => {
      e.preventDefault();
      this.fight(player1, player2);
      this.checkWinner();
    });
  };
}

export default Game;
