const circle = document.querySelector(".circle");
const toggle_div = document.querySelector(".toggle-div");
const card = document.querySelector(".card");
const clear = document.querySelector(".clear");
const theme = document.querySelector(".theme");
const textarea = document.querySelector("textarea");
const h1 = document.querySelector("h1");

const color_combinations = [
  ["#C83642", "#F4CCD2"],
  ["#396C2F", "#A3C664"],
  ["#735DA5", "#D3C5E5"],
  ["#F98866", "#FFF2D7"],
  ["#66A5AD", "#C4DFE5"],
  ["#31473A", "#EDF4F2"],
];
const text = localStorage.getItem("text");

if (text) textarea.innerText = text;
else {
  setValueInTextArea();
}

toggle_div.addEventListener("click", () => {
  if (circle.classList.contains("moveRight")) {
    circle.classList.remove("moveRight");
    document.body.style.backgroundColor = "#F0F0F0";
    card.style.backgroundColor = "white";
    h1.style.background =
      "linear-gradient(to right, #0d0d0e 30%, #55405e 50%, #d40423 100%)";
    h1.style.backgroundClip = "text";
  } else {
    circle.classList.add("moveRight");
    document.body.style.backgroundColor = "black";
    card.style.backgroundColor = "#222222";
    h1.style.background =
      "linear-gradient(to right, #dedee0 30%, #55405e 50%, #d40423 100%)";
    h1.style.backgroundClip = "text";
    console.log("hey");
  }
});

theme.addEventListener("click", () => {
  const num = Math.trunc(Math.random() * 5);
  document.body.style.backgroundColor = color_combinations[num][0];
  card.style.backgroundColor = color_combinations[num][1];
  if (circle.classList.contains("moveRight")) {
    circle.classList.remove("moveRight");
    h1.style.background =
      "linear-gradient(to right, #0d0d0e 30%, #55405e 50%, #d40423 100%)";
    h1.style.backgroundClip = "text";
  }
});

function setValueInTextArea() {
  textarea.addEventListener("keyup", (e) => {
    localStorage.setItem("text", e.target.value);
    console.log("hello");
  });
}

clear.addEventListener("click", () => {
  localStorage.removeItem("text");
  textarea.value = "";
  setValueInTextArea();
});
