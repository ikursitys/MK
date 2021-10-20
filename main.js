const player1 = {
  player: 1,
  name: "SCORPION",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: "Kunai",
  attack: function () {
    console.log(this.name + " Fight...");
  },
  changeHP: changeHP,
  renderHP: renderHP,
  elHP: elHP,
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
  changeHP: changeHP,
  renderHP: renderHP,
  elHP: elHP,
};

const $arenas = document.querySelector("div.arenas");
const $randomButton = document.querySelector(".button");

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

function changeHP(number) {
  if (this.hp > 0) {
    this.hp -= number;
  } else if (this.hp <= 0) {
    this.hp = 0;
  }
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

function playerWins(name) {
  const $winTitle = createElement("div", "loseTitle");
  if (name) {
    $winTitle.innerText = name + " wins!";
  } else $winTitle.innerText = "Draw";
  return $winTitle;
}

$randomButton.addEventListener("click", function () {
  player1.changeHP(getRandom(20));
  player1.renderHP();
  player2.changeHP(getRandom(20));
  player2.renderHP();

  if (player1.hp === 0 || player2.hp === 0) {
    $randomButton.disabled = true;
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
});

function createReloadButton() {
  const $reloadWrap = createElement("div", "reloadWrap");
  const $reloadButton = createElement("button", "button");
  $reloadButton.innerText = "restart";
  $reloadWrap.appendChild($reloadButton);
  $arenas.appendChild($reloadWrap);
  console.log($reloadButton);
  $reloadButton.addEventListener("click", function () {
    window.location.reload();
  });
}
