import { normalizeTime, getRandom } from "./utils.js";
import { logs } from "./logs.js";

const $chat = document.querySelector(".chat");

const generateLogs = (type, player1, player2, value) => {
  const date = new Date();
  const time = `${normalizeTime(date.getHours())}:${normalizeTime(
    date.getMinutes()
  )}`;
  let text;
  let log;
  const { start, end, hit, defence, draw } = logs;

  switch (type) {
    case "start":
      text = start
        .replace("[time]", time)
        .replace("[player1]", player1.name)
        .replace("[player2]", player2.name);
      break;

    case "hit":
      log = hit[getRandom(18) - 1]
        .replace("[playerKick]", player1.name)
        .replace("[playerDefence]", player2.name);
      text = `${time} - ${log} -${value} [${player2.hp}/100]`;
      break;

    case "defence":
      log = defence[getRandom(8) - 1]
        .replace("[playerKick]", player1.name)
        .replace("[playerDefence]", player2.name);
      text = `${time} - ${log}`;
      break;

    case "end":
      log = end[getRandom(3) - 1]
        .replace("[playerWins]", player1.name)
        .replace("[playerLose]", player2.name);
      text = `${time} - ${log}`;
      break;

    case "draw":
      text = draw;
      break;
  }
  console.log(text);
  const el = `<p>${text}</p>`;
  $chat.insertAdjacentHTML("afterbegin", el);
};

export { generateLogs };
