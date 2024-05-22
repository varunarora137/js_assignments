const circle = document.querySelector(".circle");
const toggle_div = document.querySelector(".toggle-div");
const text = document.querySelector("p");

toggle_div.addEventListener("click", () => {
  if (circle.classList.contains("moveRight")) {
    circle.classList.remove("moveRight");
    document.body.style.backgroundColor = "white";
    text.style.color = "black";
  } else {
    circle.classList.add("moveRight");
    document.body.style.backgroundColor = "black";
    text.style.color = "White";
  }
});
