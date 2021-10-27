import { getRandom } from "./utils.js";
import { player1, player2 } from "./player.js";
import { createReloadButton, $arenas, createElement } from "./utils.js";
import { generateLogs } from "./generate-logs.js";

const $formFight = document.querySelector(".control");

const ATTACK = ["head", "body", "foot"];
const attack = {};

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const enemyAttack = () => {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
};

const playerAttack = () => {
  //let { value, hit, defence } = attack;

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

const checkWinner = () => {
  if (player1.hp === 0 || player2.hp === 0) {
    createReloadButton();
    $formFight.style.display = "none";
  }
  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWins(player2.name));
    generateLogs("end", player2, player1);
    document.getElementById("player2img").src = "./assets/kitana-win.gif";
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWins(player1.name));
    generateLogs("end", player1, player2);
    document.getElementById("player1img").src = "./assets/scorpion-win.gif";
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWins());
    generateLogs("draw");
  }
};

const playerWins = (name) => {
  const $winTitle = createElement("div", "loseTitle");
  if (name) {
    $winTitle.innerText = name + " wins!";
  } else $winTitle.innerText = "Draw";
  return $winTitle;
};

const fight = () => {
  const enemy = enemyAttack();
  const player = playerAttack();

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

export { checkWinner, fight };
