const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const miliseconds = document.querySelector(".miliseconds");
const play = document.querySelector(".circle1");
const pause = document.querySelector(".circle2");
const stop = document.querySelector(".circle3");
const laps = document.querySelector(".circle4");
const reset = document.querySelector(".circle5");
const lap_content = document.querySelector(".lap-time");
const shareButton = document.querySelector(".share");

let min = 0;
let sec = 0;
let milisec = 0;
let interval;
let lap = false;

function myFunction() {
  milisec++;
  if (milisec === 100) {
    sec++;
    milisec = 0;
  }
  if (sec === 60) {
    min++;
    sec = 0;
  }
  if (min === 60) {
    min = 0;
    sec = 0;
    milisec = 0;
  }

  minutes.innerText = `${String(min).padStart(2, "0")}`;
  seconds.innerText = `${String(sec).padStart(2, "0")}`;
  miliseconds.innerText = `${String(milisec).padStart(2, "0")}`;
}

play.addEventListener("click", () => {
  stop.classList.remove("disabled");
  laps.classList.remove("disabled");
  play.style.display = "none";
  pause.style.display = "block";
  if (!interval) {
    interval = setInterval(myFunction, 10);
  }
});

stop.addEventListener("click", () => {
  laps.classList.add("disabled");
  clearInterval(interval);
  interval = null;
  min = 0;
  sec = 0;
  milisec = 0;
  minutes.innerText = "00";
  seconds.innerText = "00";
  miliseconds.innerText = "00";
  play.style.display = "block";
  pause.style.display = "none";
  stop.classList.add("disabled");
});

pause.addEventListener("click", () => {
  pause.style.display = "none";
  play.style.display = "block";
  clearInterval(interval);
  interval = null;
});

let ind = 0;

laps.addEventListener("click", () => {
  if (milisec > 0 || sec > 0 || min > 0) {
    reset.classList.remove("disabled");
    lap_content.style.display = "block";
    ind++;
    if (ind > 5) {
      lap_content.innerHTML = "";
      ind = 1;
    }
    const divv = document.createElement("div");
    divv.classList.add("lap-inside");
    divv.innerHTML = `<p class="lap-name">LAP ${ind}</p><p class="timer">${String(
      min
    ).padStart(2, "0")}:${String(sec).padStart(2, "0")}:${String(
      milisec
    ).padStart(2, "0")}</p>`;
    lap_content.append(divv);
  }
});

reset.addEventListener("click", () => {
  lap_content.innerHTML = "";
  clearInterval(interval);
  interval = null;
  min = 0;
  sec = 0;
  milisec = 0;
  minutes.innerText = "00";
  seconds.innerText = "00";
  miliseconds.innerText = "00";
  ind = 0;
  lap_content.style.display = "none";
  play.style.display = "block";
  pause.style.display = "none";
  reset.classList.add("disabled");
  stop.classList.add("disabled");
  laps.classList.add("disabled");
});

function shareContent() {
  if (navigator.share) {
    navigator
      .share({
        title: "StopWatch",
        text: min + ":" + sec + ":" + milisec,
      })
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.error("Error sharing:", error));
  } else {
    alert("Sharing is not supported in this browser.");
  }
}

shareButton.addEventListener("click", shareContent);
