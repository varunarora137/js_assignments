"use strict";

const leadearboard_container = document.querySelector(".leaderboard-container");
const form = document.querySelector("form");
const submit = document.querySelector(".submit");
const required = document.querySelector(".required");
const plus = document.querySelectorAll(".plus");
const minus = document.querySelectorAll(".minus");
const del = document.querySelectorAll(".del");
let ct = 0;

setTimeout(
  () => (document.querySelector("h1").style.visibility = "visible"),
  500
);

activateBtns();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let first_name = document.querySelector(".first-name").value;
  let last_name = document.querySelector(".last-name").value;
  let country = document.querySelector(".country").value;
  let score = document.querySelector(".score").value;
  const date = new Date();

  if (first_name === "" || last_name === "" || country === "" || score === "")
    return (required.style.display = "block");

  required.style.display = "none";
  const new_div = document.createElement("div");
  new_div.classList.add("leaderboard-data");
  if (ct % 2 === 0) new_div.classList.add("animation-left");
  else new_div.classList.add("animation-right");
  new_div.innerHTML = `<div class="rank"></div>
          <div class="data1">
            <div>
              <p>${first_name} ${last_name}</p>
              <span class="time">${generateDateAndTime()}</span>
            </div>
            <p>${country}</p>
            <p class="scr">${score}</p>
          </div>
          <div class="data2">
            <div class="circle-div del" ><i class="fa-solid fa-trash-can"></i></div>
            <div class="circle-div plus">+5</div>
            <div class="circle-div minus">-5</div>
          </div>`;
  leadearboard_container.append(new_div);

  document.querySelector(".first-name").value = "";
  document.querySelector(".last-name").value = "";
  document.querySelector(".country").value = "";
  document.querySelector(".score").value = "";

  setTimeout(() => {
    new_div.classList.remove("animation-left", "animation-right");
  }, 300);
  sortContainer();
  activateBtns();
  ct++;
});

function activateBtns() {
  const btn_container = document.querySelectorAll(".data2");
  btn_container.forEach((btns) => {
    btns.addEventListener("click", (e) => {
      const list = e.target.classList;
      let temp_score = btns.parentElement
        .querySelector(".data1")
        .querySelector(".scr").textContent;
      if (list.contains("plus")) {
        temp_score = Number(temp_score) + 5;
        btns.parentElement
          .querySelector(".data1")
          .querySelector(".scr").textContent = temp_score;
      } else if (list.contains("minus")) {
        temp_score = Number(temp_score) - 5;
        btns.parentElement
          .querySelector(".data1")
          .querySelector(".scr").textContent = temp_score;
      } else {
        btns.parentElement.remove();
      }
      sortContainer();
    });
  });
}

function sortContainer() {
  const leaderboard_data = document.querySelectorAll(".leaderboard-data");
  let arrElements = [];
  leaderboard_data.forEach((el) => arrElements.push(el));
  let sortedData = arrElements.slice().sort((a, b) => {
    const num1 = a.children[1].children[2].textContent;
    const num2 = b.children[1].children[2].textContent;
    return num2 - num1;
  });
  sortedData.forEach((el, index) => {
    el.children[0].classList.remove(
      "rank-img-gold",
      "rank-img-silver",
      "rank-img-bronze",
      "rank-text"
    );
    if (index === 0) el.children[0].classList.add("rank-img-gold");
    else if (index === 1) el.children[0].classList.add("rank-img-silver");
    else if (index === 2) el.children[0].classList.add("rank-img-bronze");
    else {
      el.children[0].classList.add("rank-text");
      el.children[0].innerText = `${index + 1}.`;
    }
    leadearboard_container.append(el);
  });
}

function generateDateAndTime() {
  const dateObject = new Date();
  const month = dateObject.toLocaleString("default", { month: "long" });
  const year = dateObject.getFullYear();
  const time = dateObject.toLocaleTimeString().slice(0, 8);
  const generateResult = `${month} ${year}: ${time}`;
  return generateResult;
}

/* del.forEach((dele) => {
  dele.addEventListener("click", () => {
    dele.parentElement.parentElement.remove();
  });
});
plus.forEach((pl) => {
  pl.addEventListener("click", () => {
    const root_parent = pl.parentElement.parentElement;

    let temp_score = root_parent
      .querySelector(".data1")
      .querySelector(".scr").textContent;
    temp_score = Number(temp_score) + 5;
    root_parent.querySelector(".data1").querySelector(".scr").textContent =
      temp_score;
    console.log(temp_score);
    console.log(root_parent);
  });
});
minus.forEach((mi) => {
  mi.addEventListener("click", () => {
    const root_parent = mi.parentElement.parentElement;

    let temp_score = root_parent
      .querySelector(".data1")
      .querySelector(".scr").textContent;
    temp_score = Number(temp_score) - 5;
    root_parent.querySelector(".data1").querySelector(".scr").textContent =
      temp_score;
    console.log(temp_score);
    console.log(root_parent);
  });
});
 */
