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

function enterQues() {
  question_asked.addEventListener("keyup", () => {
    send.style.display = "block";
    gallery.style.right = "120px";
    mic.style.right = "65px";
    if (question_asked.value === "") {
      send.style.display = "none";
      gallery.style.right = "65px";
      mic.style.right = "20px";
    }
  });

  send.addEventListener("click", () => {
    ques_by_prompt = question_asked.value;
    send.style.display = "none";
    gallery.style.right = "65px";
    mic.style.right = "20px";
    question_asked.value = "";
    content_main.style.display = "none";
    content_ans.style.display = "block";
    ques_text.innerText = ques_by_prompt;
    gemini_icon.classList.add("rotate360");
    run();
  });
}
enterQues();

async function run() {
  try {
    const result = await model.generateContent(ques_by_prompt);
    const response = await result.response;
    const text = await response.text();
    const modified_text = marked.parse(text);
    ans_text.innerHTML += modified_text;
    document.querySelector(".various-icons").style.display = "flex";
    document.querySelector(".speaker").style.visibility = "visible";
    gemini_icon.classList.remove("rotate360");
  } catch (error) {
    ans_text.innerText = "ERROR!!!";
  }
}
