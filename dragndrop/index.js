const container = document.querySelector(".container");
const input_color = document.querySelector("#color");
const submit = document.querySelector("#submit");
let flag = null;
let initialTop;
let initialLeft;
let currX;
let currY;

submit.addEventListener("click", () => {
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
        <span class="close">x</span>
        <textarea placeholder="Enter text..." rows="10" cols="30"></textarea>
      </div>`;
  div.style.borderColor = input_color.value;
  container.append(div);
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("close")) {
    e.target.parentElement.remove();
  }
});

document.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("card")) {
    flag = e.target;
    currX = e.clientX;
    currY = e.clientY;
    initialTop = flag.getBoundingClientRect().top;
    initialLeft = flag.getBoundingClientRect().left;
  }
});

document.addEventListener("mousemove", (e) => {
  if (flag !== null) {
    let newX = e.clientX;
    let newY = e.clientY;

    flag.style.top = initialTop + newY - currY + "px";
    flag.style.left = initialLeft + newX - currX + "px";

    flag.style.cursor = "grab";
  }
});

document.addEventListener("mouseup", (e) => {
  if (flag !== null) {
    flag.style.cursor = "auto";
    flag = null;
  }
});
