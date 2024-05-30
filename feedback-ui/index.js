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

function onEmojisContainerClick() {
  const emojis = document.querySelectorAll(".emojis-container");
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

function onButtonClick() {
  const visibleContainer = document.querySelector(".visible-container");
  const hiddenContainer = document.querySelector(".hidden-container");
  const button_click = document.querySelector(".btn");
  const before_mood = document.getElementById("before-mood");
  button_click.addEventListener("click", () => {
    if (isEmojiClicked) {
      visibleContainer.style.display = "none";
      hiddenContainer.style.display = "flex";
      before_mood.insertAdjacentHTML("afterend", `<h3>Feedback: ${mood}</h3>`);
    }
  });
}
onButtonClick();
