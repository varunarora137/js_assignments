const circle = document.querySelector(".circle");
const toggle_div = document.querySelector(".toggle-div");
const card = document.querySelector(".card");
const print = document.querySelector(".print");
const clear = document.querySelector(".clear");
const theme = document.querySelector(".theme");
const fname = document.querySelector(".fname span");
const lname = document.querySelector(".lname span");
const country = document.querySelector(".country span");
const number = document.querySelector(".number span");
const state = document.querySelector(".state span");
const city = document.querySelector(".city span");
const village = document.querySelector(".village span");

let input_fname = "",
  input_lname = "",
  input_country = "",
  input_number = "",
  input_state = "",
  input_city = "",
  input_village = "";

const color_combinations = [
  ["#C83642", "#F4CCD2"],
  ["#396C2F", "#A3C664"],
  ["#735DA5", "#D3C5E5"],
  ["#F98866", "#FFF2D7"],
  ["#66A5AD", "#C4DFE5"],
  ["#31473A", "#EDF4F2"],
];

toggle_div.addEventListener("click", () => {
  if (circle.classList.contains("moveRight")) {
    circle.classList.remove("moveRight");
    document.body.style.backgroundColor = "#F0F0F0";
    card.style.backgroundColor = "white";
    card.style.color = "black";
  } else {
    circle.classList.add("moveRight");
    document.body.style.backgroundColor = "black";
    card.style.backgroundColor = "#222222";
    card.style.color = "white";
  }
});

theme.addEventListener("click", () => {
  const num = Math.trunc(Math.random() * 5);
  document.body.style.backgroundColor = color_combinations[num][0];
  card.style.backgroundColor = color_combinations[num][1];
  if (circle.classList.contains("moveRight")) {
    circle.classList.remove("moveRight");
    card.style.color = "black";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  input_fname = prompt("Enter your first name:");
  input_lname = prompt("Enter your last name:");
  input_country = prompt("Enter your country:");
  input_number = prompt("Enter your phone number:");
  input_state = prompt("Enter your state:");
  input_city = prompt("Enter your city:");
  input_village = prompt("Enter your village:");

  if (
    input_fname !== "" &&
    input_lname !== "" &&
    input_city !== "" &&
    input_country !== "" &&
    input_number !== "" &&
    input_village !== "" &&
    input_state !== ""
  ) {
    localStorage.setItem("fname", input_fname);
    localStorage.setItem("lname", input_lname);
    localStorage.setItem("country", input_country);
    localStorage.setItem("number", input_number);
    localStorage.setItem("state", input_state);
    localStorage.setItem("city", input_city);
    localStorage.setItem("village", input_village);
    setFields();
  } else {
    alert("Please fill all the fields");
    location.reload();
  }
});

function setFields() {
  fname.innerText = localStorage.getItem("fname");
  lname.innerText = localStorage.getItem("lname");
  country.innerText = localStorage.getItem("country");
  number.innerText = localStorage.getItem("number");
  state.innerText = localStorage.getItem("state");
  city.innerText = localStorage.getItem("city");
  village.innerText = localStorage.getItem("village");
}

clear.addEventListener("click", () => {
  localStorage.removeItem("fname");
  localStorage.removeItem("lname");
  localStorage.removeItem("country");
  localStorage.removeItem("number");
  localStorage.removeItem("state");
  localStorage.removeItem("city");
  localStorage.removeItem("village");

  fname.innerText = "";
  lname.innerText = "";
  country.innerText = "";
  number.innerText = "";
  state.innerText = "";
  city.innerText = "";
  village.innerText = "";

  (() => {
    location.reload();
  })();
});

print.addEventListener("click", () => {
  window.print();
});
