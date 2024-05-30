const add_btn = document.querySelector(".btn");
const text_area = document.querySelector("textarea");
const notes_container = document.querySelector(".notes-container");
const color = document.querySelector(".color");
const close = document.querySelectorAll(".close");

add_btn.addEventListener("click", () => {
  if (text_area.value.length === 0) {
    alert("Enter Some Text");
    text_area.classList.add("shake");
    setTimeout(() => text_area.classList.remove("shake"), 500);
  } else {
    const temp_text = document.querySelector(".temp-text");
    const str = text_area.value;
    temp_text.style.display = "none";
    const new_div = document.createElement("div");
    new_div.classList.add("notes");
    new_div.innerHTML = `<p>${str}</p> 
    <button class="close">X</button>`;
    new_div.style.backgroundColor = color.value;
    notes_container.append(new_div);
    text_area.value = "";
  }
});
notes_container.addEventListener("click", (event) => {
  console.log(event);
  if (event.target.classList.contains("close")) {
    const parentDiv = event.target.parentNode;
    parentDiv.remove();
  }
});

/* close.forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    const parentDiv = closeButton.parentNode;
    parentDiv.style.display = "none";
  });
});
 */
/* close.addEventListener("click", () => {
  const parent = close.parentNode;
  parent.remove();
});
 */
