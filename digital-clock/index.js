document.addEventListener("DOMContentLoaded", () => {
  const hour = document.querySelector(".hour");
  const minute = document.querySelector(".minute");
  const second = document.querySelector(".second");
  const night = document.querySelector(".night");
  const line3 = document.querySelector(".line-3");

  function getTime() {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    let pm = false;
    if (hours >= 12) {
      hours = hours - 12;
      pm = true;
    } else pm = false;
    hour.innerText = `${String(hours).padStart(2, "0")}`;
    minute.innerHTML = `${String(minutes).padStart(2, "0")}`;
    second.innerText = `${String(seconds).padStart(2, "0")}`;
    night.innerText = `${pm && "PM"}`;

    const secOffset = 1075 - seconds * 17.9; // 1075/60=17.9
    line3.style.strokeDashoffset = secOffset;

    const minOffset = 1306 * (1 - minutes / 60);
    document.querySelector(".line-2").style.strokeDashoffset = minOffset;

    const hourOffset = 1538 * (1 - hours / 12);
    document.querySelector(".line-1").style.strokeDashoffset = hourOffset;
  }
  setInterval(getTime, 1000);
});
