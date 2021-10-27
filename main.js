import { player1, player2, createPlayer } from "./player.js";
import { $arenas, $formFight } from "./utils.js";
import { generateLogs } from "./generate-logs.js";
import { checkWinner, fight } from "./fight.js";

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

generateLogs("start", player1, player2);

$formFight.addEventListener("submit", function (e) {
  e.preventDefault();

  fight(player1, player2);

  checkWinner();
});
