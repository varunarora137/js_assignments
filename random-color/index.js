const container = document.querySelector(".container");

for (let i = 0; i < 50; i++) {
  createDiv();
}

function colorGenerator() {
  const arr = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
  let str = ["#"];
  for (let i = 0; i < 6; i++) {
    const ind = Math.trunc(Math.random() * 16);
    str.push(arr[ind]);
  }
  return str.join("");
}

function createDiv() {
  const div = document.createElement("div");
  div.classList.add("div-color");
  let str = colorGenerator();
  div.innerText = `${str}`;
  div.style.backgroundColor = `${str}`;
  container.append(div);
}
