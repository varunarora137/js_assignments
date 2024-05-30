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
    new_div.classList.add("rotate");
    new_div.innerHTML = `<p>${str}</p> 
    <button class="close"><span class="close-X">X</span></button>`;
    new_div.style.backgroundColor = color.value;
    notes_container.append(new_div);
    text_area.value = "";
    text_area.parentElement.classList.remove("scale");
    void text_area.parentElement.offsetWidth;
    text_area.parentElement.classList.add("scale");
  }
});
notes_container.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("close-X") ||
    event.target.classList.contains("close")
  ) {
    const parentDiv = event.target.parentNode.parentNode;
    parentDiv.remove();
  }
});
