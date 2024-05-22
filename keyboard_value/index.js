const code_div = document.querySelector(".text_code");
const text_div = document.querySelector(".text_box");

window.addEventListener("keyup", (e) => {
  console.log(e);
  code_div.style.display = "flex";
  text_div.innerHTML = `You pressed&nbsp<span class="key">${e.key}</span>`;
  code_div.innerText = `${e.keyCode}`;
});
