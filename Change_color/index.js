const circle = document.querySelector(".circle");
const shape = document.querySelector(".shape");
const color = document.querySelector(".color");

const colorOptions = [
  "#008000",
  "#EDADBC",
  "#79E388",
  "#075B60",
  "#15718D",
  "#8955B5",
  "#3BEA35",
  "#CB2876",
  "#9C1CCB",
  "#3D142B",
  "#8C70D7",
];

const shapeOption = [
  "square",
  "heptagon",
  "bevel",
  "rectangle",
  "rightpoint",
  "leftpoint",
  "star",
  "rightarrow",
  "leftarrow",
  "close",
  "message",
];

color.addEventListener("click", () => {
  const num = Math.trunc(Math.random() * 11);
  circle.style.backgroundColor = `${colorOptions[num]}`;
});

shape.addEventListener("click", () => {
  const num = Math.trunc(Math.random() * 11);
  const element = circle.children[0];
  element.removeAttribute("id");
  void element.offsetWidth;
  element.id = `${shapeOption[num]}`;
});
