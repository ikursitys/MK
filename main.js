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
  fight,
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
  fight,
};

const logs = {
  start:
    "Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.",
  end: [
    "Результат удара [playerWins]: [playerLose] - труп",
    "[playerLose] погиб от удара бойца [playerWins]",
    "Результат боя: [playerLose] - жертва, [playerWins] - убийца",
  ],
  hit: [
    "[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.",
    "[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.",
    "[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.",
    "[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.",
    "[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.",
    "[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.",
    "[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.",
    "[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.",
    "[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.",
    "[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.",
    "[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.",
    "[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.",
    "[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.",
    "[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.",
    "[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.",
    "[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.",
    "[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.",
    "[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.",
  ],
  defence: [
    "[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.",
    "[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.",
    "[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.",
    "[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.",
    "[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
    "[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
  ],
  draw: "Ничья - это тоже победа!",
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

// Изменяем HP

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

// Вывод сообщения кто победил

function playerWins(name) {
  const $winTitle = createElement("div", "loseTitle");
  if (name) {
    $winTitle.innerText = name + " wins!";
  } else $winTitle.innerText = "Draw";
  return $winTitle;
}

// Кнопка Restart

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

const $chat = document.querySelector(".chat");

// Формируем значения атаки врага

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
}

const attack = {};

// Формируем значения атаки игрока

function playerAttack() {
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
}

// Генерируем логи

function generateLogs(type, player1, player2, value) {
  const date = new Date();
  const time = `${date.getHours()}:${date.getMinutes()}`;
  let text;
  let log;

  switch (type) {
    case "start":
      text = logs[type]
        .replace("[time]", time)
        .replace("[player1]", player1.name)
        .replace("[player2]", player2.name);
      break;

    case "hit":
      log = logs[type][getRandom(18) - 1]
        .replace("[playerKick]", player1.name)
        .replace("[playerDefence]", player2.name);
      text = `${time} - ${log} -${value} [${player2.hp}/100]`;
      break;

    case "defence":
      log = logs[type][getRandom(8) - 1]
        .replace("[playerKick]", player1.name)
        .replace("[playerDefence]", player2.name);
      text = `${time} - ${log}`;
      break;

    case "end":
      log = logs[type][getRandom(3) - 1]
        .replace("[playerWins]", player1.name)
        .replace("[playerLose]", player2.name);
      text = `${time} - ${log}`;
      break;

    case "draw":
      text = logs[type];
      break;
  }
  console.log(text);
  const el = `<p>${text}</p>`;
  $chat.insertAdjacentHTML("afterbegin", el);
}

generateLogs("start", player1, player2);

// Форма

$formFight.addEventListener("submit", function (e) {
  e.preventDefault();
  const enemy = enemyAttack();
  const player = playerAttack();

  fight(player, enemy);
});

// Деремся!

function fight(player, enemy) {
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
    generateLogs("hit", player2, player1, player.value);
  } else if (enemy.hit === player.defence) {
    generateLogs("defence", player2, player1);
  }

  checkWinner();
}

// Проверяем, кто победил

function checkWinner() {
  if (player1.hp === 0 || player2.hp === 0) {
    createReloadButton();
    $formFight.style.display = "none";
  }
  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWins(player2.name));
    generateLogs("end", player2, player1);
    document.getElementById("player2img").src =
      "https://www.mortalkombatwarehouse.com/umk3/animations/kitana-win.gif";
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWins(player1.name));
    generateLogs("end", player1, player2);
    document.getElementById("player1img").src =
      "https://www.mortalkombatwarehouse.com/umk3/animations/scorpion-win.gif";
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWins());
    generateLogs("draw");
  }
}
