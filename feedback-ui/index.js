"use strict";

/* function onEmojisContainerHover() {
  const emojis = document.querySelectorAll(".emojis-container");
  emojis.forEach(function (emoji, index) {
    const emoji_id = emoji.id - 1;
    if (index == emoji_id) {
      emoji.addEventListener("mouseover", () =>
        emoji.classList.add("emojis-container-hover")
      );
      emoji.addEventListener("mouseout", () =>
        emoji.classList.remove("emojis-container-hover")
      );
    }
  });
}
onEmojisContainerHover(); */
/* function onButtonHover() {
  const button_hover = document.querySelector(".btn");
  button_hover.addEventListener("mouseover", () =>
    button_hover.classList.add("btn-hover")
  );
  button_hover.addEventListener("mouseout", () =>
    button_hover.classList.remove("btn-hover")
  );
}
onButtonHover(); */

/* function onEmojisContainerClick() {
  const emojis = document.querySelectorAll(".emojis-container");
  emojis.forEach(function (emoji, index) {
    emoji.addEventListener("click", () => {
      const emoji_id = parseInt(emoji.id) - 1;
      if (index === emoji_id) {
        emoji.classList.add("emojis-container-hover");
        isEmojiClicked = true;
        mood = emoji.querySelector("p").textContent;
      }
      emojis.forEach(function (otherEmoji, otherIndex) {
        if (otherIndex !== emoji_id) {
          otherEmoji.classList.remove("emojis-container-hover");
        }
      });
    });
  });
}
onEmojisContainerClick(); */

let isEmojiClicked = false;
let mood = "";
const emoji_container = document.querySelector(".emojis");
const emojis = document.querySelectorAll(".emojis-container");

function onEmojisContainerClick() {
  emojis.forEach(function (emoji, index) {
    emoji.addEventListener("click", () => {
      emojis.forEach(function (otherEmoji) {
        otherEmoji.classList.remove("emojis-container-hover");
      });
      emoji.classList.add("emojis-container-hover");
      isEmojiClicked = true;
      mood = emoji.querySelector("p").textContent;
    });
  });
}
onEmojisContainerClick();

const visibleContainer = document.querySelector(".visible-container");
const hiddenContainer = document.querySelector(".hidden-container");
const button_click = document.querySelector(".btn");
const before_mood = document.getElementById("before-mood");
button_click.addEventListener("click", () => {
  if (isEmojiClicked) {
    visibleContainer.style.display = "none";
    hiddenContainer.style.display = "flex";
    before_mood.insertAdjacentHTML(
      "afterend",
      `<h3 class="feed">Feedback: ${mood}</h3>`
    );
    hiddenContainer.classList.remove("rotate");
    void hiddenContainer.offsetWidth;
    hiddenContainer.classList.add("rotate");
  } else {
    visibleContainer.classList.remove("rotate");
    visibleContainer.classList.remove("shake");
    void visibleContainer.offsetWidth;
    visibleContainer.classList.add("shake");
    alert("Please Select Emoji First.");
  }
});

const back = document.querySelector(".back");

back.addEventListener("click", () => {
  hiddenContainer.style.display = "none";
  visibleContainer.style.display = "flex";
  isEmojiClicked = false;
  document.querySelector(".feed").remove();
  emojis.forEach(function (otherEmoji) {
    otherEmoji.classList.remove("emojis-container-hover");
  });
  visibleContainer.classList.remove("shake");
  visibleContainer.classList.remove("rotate");
  void visibleContainer.offsetWidth;
  visibleContainer.classList.add("rotate");
});
