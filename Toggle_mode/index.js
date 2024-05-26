const circle = document.querySelector(".circle");
const toggle_div = document.querySelector(".toggle-div");
const text = document.querySelector("p");
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");

toggle_div.addEventListener("click", () => {
  if (circle.classList.contains("moveRight")) {
    sun.classList.remove("sun-down");
    moon.classList.remove("moon-up");
    circle.classList.remove("moveRight");
    document.body.style.backgroundColor = "white";
    text.style.color = "black";
    // sun.style.opacity = "1";
  } else {
    circle.classList.add("moveRight");
    document.body.style.backgroundColor = "black";
    text.style.color = "White";
    // sun.style.opacity = "0";
    moon.classList.add("moon-up");
    sun.classList.add("sun-down");
  }
});
