const head_modified = document.querySelector(".head-modified");
const normal_aside = document.querySelector(".normal-aside");
const foot_modified = document.querySelector(".foot-modified");
const initial_foot = document.querySelector(".foot");
const initial_head = document.querySelector(".head");
const temp = document.querySelector(".temp");

document.querySelector(".bars-modified").addEventListener("click", () => {
  normal_aside.style.width = "68px";
  head_modified.style.display = "none";
  foot_modified.style.top = "750px";
  initial_head.style.display = "flex";
  initial_foot.style.display = "flex";
  temp.style.width = "68px";
});
document.querySelector(".bars").addEventListener("click", () => {
  normal_aside.style.width = "285px";
  initial_head.style.display = "none";
  initial_foot.style.display = "none";
  head_modified.style.display = "flex";
  foot_modified.style.top = "524px";
  temp.style.width = "285px";
});
