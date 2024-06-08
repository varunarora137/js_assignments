import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDw18JFSzEgbPcK0MOO8SnQPQ_xvWhU6Gg";

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const bars = document.querySelector(".bars");
const bars_modified = document.querySelector(".bars-modified");
const normal_aside = document.querySelector(".normal-aside");
const modified_aside = document.querySelector(".aside-modified");
const gemini_modified = document.querySelector(".gemini");
const gemini_dropdown = document.querySelector(".gemini-dropdown");
const question_asked = document.querySelector(".type-ques");
const send = document.querySelector(".send");
const gallery = document.querySelector("#gallery");
const mic = document.querySelector("#mic");
const content_main = document.querySelector(".content-main");
const content_ans = document.querySelector(".content-ans");
const ans_text = document.querySelector(".ans");
const ques_text = document.querySelector(".ques-txt");
const gemini_icon = document.querySelector(".gemini-icon");
const main_div = document.querySelector(".content-main-outer");

let i = 0;
let ques_by_prompt = "";

bars.addEventListener("click", () => {
  normal_aside.style.display = "none";
  modified_aside.style.display = "flex";
  document.querySelector("main").style.width = "calc(100vw - 285px)";
});
bars_modified.addEventListener("click", () => {
  normal_aside.style.display = "flex";
  modified_aside.style.display = "none";
  document.querySelector("main").style.width = "calc(100vw - 68px)";
});
gemini_modified.addEventListener("click", () => {
  if (gemini_dropdown.style.display === "none") {
    gemini_dropdown.style.display = "block";
  } else {
    gemini_dropdown.style.display = "none";
  }
});

function ansDivCreation() {
  ques_by_prompt = question_asked.value;
  send.style.display = "none";
  gallery.style.right = "65px";
  mic.style.right = "20px";
  question_asked.value = "";
  content_main.style.display = "none";
  i++;
  const ans_div = `<div class="content-ans">
            <div class="ques">
              <div class="circle"></div>
              <p class="ques-txt">${ques_by_prompt}</p>
            </div>
            <div class="speaker speaker-${i}">
              <button>Show drafts<i class="fa-solid fa-caret-down"></i></button>
              <div><i class="fa fa-volume-up" aria-hidden="true"></i></div>
            </div>
            <div class="ans-icon">
              <div class="gemini-icon gemini-icon-${i}">
                <img src="images/google-gemini-icon.png" alt="gemini" />
              </div>
              <div class="ans ans-${i}"></div>
            </div>
            <div class="various-icons  various-icons-${i}">
              <div class="outer-circle-icon">
                <i class="fa-solid fa-thumbs-up"></i>
              </div>
              <div class="outer-circle-icon">
                <i class="fa-solid fa-thumbs-down"></i>
              </div>
              <div class="outer-circle-icon"><i class="fas fa-edit"></i></div>
              <div class="outer-circle-icon">
                <i class="fas fa-share-alt"></i>
              </div>
              <div class="outer-circle-icon">
                <i class="fa-brands fa-google"></i>
              </div>
              <div class="outer-circle-icon three-dots">
                <i class="fas fa-ellipsis-v"></i>
              </div>
            </div>
          </div>`;
  main_div.innerHTML += ans_div;
  document.querySelector(`.gemini-icon-${i}`).classList.add("rotate360");
  run(i);
}

function enterQues() {
  question_asked.addEventListener("keyup", (e) => {
    send.style.display = "block";
    gallery.style.right = "120px";
    mic.style.right = "65px";
    if (question_asked.value === "") {
      send.style.display = "none";
      gallery.style.right = "65px";
      mic.style.right = "20px";
    }
    if (e.key === "Enter" && question_asked.value !== "") {
      ansDivCreation();
    }
  });

  send.addEventListener("click", () => ansDivCreation);
}
enterQues();

async function run(i) {
  try {
    const result = await model.generateContent(ques_by_prompt);
    const response = await result.response;
    const text = await response.text();
    const modified_text = marked.parse(text);
    document.querySelector(`.ans-${i}`).innerHTML = modified_text;
    document.querySelector(`.various-icons-${i}`).style.display = "flex";
    document.querySelector(`.speaker-${i}`).style.visibility = "visible";
    document.querySelector(`.gemini-icon-${i}`).classList.remove("rotate360");
  } catch (error) {
    ans_text.innerText = "ERROR!!!";
  }
}
