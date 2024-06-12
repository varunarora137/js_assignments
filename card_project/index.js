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

const color_combinations = [
  ["#C83642", "#F4CCD2"],
  ["#396C2F", "#A3C664"],
  ["#735DA5", "#D3C5E5"],
  ["#F98866", "#FFF2D7"],
  ["#66A5AD", "#C4DFE5"],
  ["#31473A", "#EDF4F2"],
];

const storedUserInfo = localStorage.getItem("userInformation");
let userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

if (!userInfo || !isValidUserInfo(userInfo)) {
  storeUserInfo();
} else {
  setFields(userInfo);
}

function isValidUserInfo(userInfo) {
  return (
    userInfo.fname &&
    userInfo.lname &&
    userInfo.country &&
    userInfo.number &&
    userInfo.state &&
    userInfo.city &&
    userInfo.village
  );
}

function storeUserInfo() {
  let fname, lname, country, number, state, city, village;
  do {
    fname = prompt("Enter your first name:");
  } while (!fname);

  do {
    lname = prompt("Enter your last name:");
  } while (!lname);

  do {
    country = prompt("Enter your country:");
  } while (!country);

  do {
    number = prompt("Enter your phone number:");
  } while (!number);

  do {
    state = prompt("Enter your state:");
  } while (!state);

  do {
    city = prompt("Enter your city:");
  } while (!city);

  do {
    village = prompt("Enter your village:");
  } while (!village);

  userInfo = {
    fname,
    lname,
    country,
    number,
    state,
    city,
    village,
  };

  localStorage.setItem("userInformation", JSON.stringify(userInfo));
  setFields(userInfo);
}

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

function setFields(obj) {
  fname.innerText = obj.fname;
  lname.innerText = obj.lname;
  country.innerText = obj.country;
  number.innerText = obj.number;
  state.innerText = obj.state;
  city.innerText = obj.city;
  village.innerText = obj.village;
}

clear.addEventListener("click", () => {
  localStorage.removeItem("userInformation");

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
