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

const $arenas = document.querySelector("div.arenas");

function createElement(tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
}

function createPlayer(object) {
  const $player = createElement("div", "player" + object.player);
  const $progressBar = createElement("div", "progressbar");
  const $character = createElement("div", "character");
  const $life = createElement("div", "life");
  const $name = createElement("div", "name");
  const $img = createElement("img");

  $life.style.width = object.hp + "%";
  $name.innerText = object.name;

  $player.appendChild($progressBar);
  $player.appendChild($character);
  $progressBar.appendChild($life);
  $progressBar.appendChild($name);
  $character.appendChild($img);

  $img.id = "player" + object.player + "img";
  $img.src = object.img;

  return $player;
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function getRandom(number) {
  return Math.ceil(Math.random() * number);
}

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
  this.renderHP();
}

function playerWins(name) {
  const $winTitle = createElement("div", "loseTitle");
  if (name) {
    $winTitle.innerText = name + " wins!";
  } else $winTitle.innerText = "Draw";
  return $winTitle;
}

function createReloadButton() {
  const $reloadWrap = createElement("div", "reloadWrap");
  const $reloadButton = createElement("button", "button");
  $reloadButton.innerText = "restart";
  $reloadWrap.appendChild($reloadButton);
  $arenas.appendChild($reloadWrap);

  $reloadButton.addEventListener("click", function () {
    window.location.reload();
  });
}

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ["head", "body", "foot"];

const $formFight = document.querySelector(".control");

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
}

$formFight.addEventListener("submit", function (e) {
  e.preventDefault();
  const enemy = enemyAttack();

  const attack = {};

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
  fight(attack, enemy);
});

function fight(attack, enemy) {
  if (attack.hit != enemy.defence) {
    player2.changeHP(attack.value);
  }
  if (enemy.hit != attack.defence) {
    player1.changeHP(enemy.value);
  }

  checkWinner();
}

function checkWinner() {
  if (player1.hp === 0 || player2.hp === 0) {
    createReloadButton();
  }
  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWins(player2.name));
    document.getElementById("player2img").src =
      "https://www.mortalkombatwarehouse.com/umk3/animations/kitana-win.gif";
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWins(player1.name));
    document.getElementById("player1img").src =
      "https://www.mortalkombatwarehouse.com/umk3/animations/scorpion-win.gif";
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWins());
  }
}
