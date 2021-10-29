import { Player } from "./player.js";

const $arenas = document.querySelector("div.arenas");
const $formFight = document.querySelector(".control");

const getRandom = (number) => Math.ceil(Math.random() * number);

const normalizeTime = (num) => (num.toString().length > 1 ? num : `0${num}`);

const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
};

const createReloadButton = () => {
  const $reloadWrap = createElement("div", "reloadWrap");
  const $reloadButton = createElement("button", "button");
  $reloadButton.innerText = "restart";
  $reloadWrap.appendChild($reloadButton);
  $arenas.appendChild($reloadWrap);
  $reloadButton.addEventListener("click", function () {
    window.location = "./index.html";
  });
};

export {
  $arenas,
  $formFight,
  getRandom,
  createElement,
  normalizeTime,
  createReloadButton,
};
