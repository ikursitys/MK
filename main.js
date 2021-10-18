const player1 = {
  player: 1,
  name: "SCORPION",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: "Kunai",
  attack: function () {
    console.log(this.name + " Fight...");
  },
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

function randomHP(number) {
  return Math.ceil(Math.random() * number);
}

function changeHP(player) {
  const $playerLife = document.querySelector(
    ".player" + player.player + " .life"
  );
  player.hp -= randomHP(20);
  console.log(player.hp);

  if (player.hp <= 0) {
    $playerLife.style.width = 0 + "%";
  } else {
    $playerLife.style.width = player.hp + "%";
  }

  if (player1.hp <= 0) {
    $arenas.appendChild(playerWins(player2.name));
    $randomButton.disabled = true;
    document.getElementById("player2img").src =
      "https://www.mortalkombatwarehouse.com/umk3/animations/kitana-win.gif";
  } else if (player2.hp <= 0) {
    $arenas.appendChild(playerWins(player1.name));
    $randomButton.disabled = true;
    document.getElementById("player1img").src =
      "https://www.mortalkombatwarehouse.com/umk3/animations/scorpion-win.gif";
  } else if (player1.hp == 0 && player2.hp == 0) {
  }
}

function playerWins(name) {
  const $winTitle = createElement("div", "loseTitle");
  $winTitle.innerText = name + " wins!";
  return $winTitle;
}

function nobodyWins() {
  const $nobodyWinsTitle = createElement("div", "loseTitle");
  $nobodyWinsTitle.innerText = "Nobody wins!";
  return $nobodyWinsTitle;
}

$randomButton.addEventListener("click", function () {
  changeHP(player1);
  changeHP(player2);
});
