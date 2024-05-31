const text_search = document.querySelector(".txt");
const search_btn = document.querySelector(".srch");

function searchEmoji(e) {
  e.preventDefault();
  const txt = text_search.value;
  console.log(txt);
  showEmoji(txt);
}
function autoSearch() {
  const txt = text_search.value;
  console.log(txt);
  showEmoji(txt);
}

function showEmoji(searchText = "") {
  const emojiArr = emojiList.filter((emj) => {
    const matchText = emj.tags.join(" ").includes(searchText);
    if (matchText === true) return true;
  });
  console.log(emojiArr);
  const emojee_container = document.querySelector(".emojee-container");
  emojee_container.innerHTML = "";
  emojiArr.forEach((emo) => {
    const new_div = document.createElement("div");
    new_div.classList.add("emojee");
    new_div.innerHTML = `<div class="img-title">
            <div class="img">${emo.emoji}</div>
            <div class="title">${emo.aliases
              .join(", ")
              .split("_")
              .join(" ")}</div>
          </div>
          <div class="about">${emo.description}</div>
          <div class="emojee-line"></div>`;
    emojee_container.append(new_div);
  });
}
showEmoji();

document.querySelector(".frm").addEventListener("submit", searchEmoji);
text_search.addEventListener("keyup", autoSearch);
