const toggle_button = document.querySelector(".toggle");
const body = document.body;

toggle_button.addEventListener("click", () => {
  console.log("hello");
  if (body.getAttribute("data-mode") === "light") {
    body.setAttribute("data-mode", "dark");
    document.querySelector(".circle").classList.add("circle-move");
    document.querySelector(".not-inverted").style.display = "none";
    document.querySelector(".inverted").style.display = "inline";
  } else {
    body.setAttribute("data-mode", "light");
    document.querySelector(".circle").classList.remove("circle-move");
    document.querySelector(".inverted").style.display = "none";
    document.querySelector(".not-inverted").style.display = "inline";
  }
});
