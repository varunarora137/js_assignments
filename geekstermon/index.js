const poke_container = document.querySelector(".poke-cards-container");
const text = document.querySelector(".text");
const reset = document.querySelector(".reset");
const filter = document.querySelector(".filter");

let mainArr = [];
let flag = 0;
let tempArr = [];

function backgroundColor(type) {
  if (type === "grass") return "#A0CF59";
  else if (type === "fire") return "#FD842F";
  else if (type === "water") return "#4E98C7";
  else if (type === "bug") return "#79A449";
  else if (type === "normal") return "#A9B0B3";
  else if (type === "poison") return "#BD85CC";
  else if (type === "electric") return "#EFD73F";
  else if (type === "ground") return "#F7E049";
  else if (type === "fairy") return "#EFD73F";
  else if (type === "fighting") return "#D76F2E";
  else if (type === "psychic") return "#F46EBD";
  else if (type === "rock") return "#A8922C";
  else if (type === "ghost") return "#826AA8";
  else if (type === "ice") return "#5AC7E8";
  else if (type === "dragon") return "#DCAA2B";
}

function pokeFront(poke_card_front, poke_card, data, i) {
  const heading = document.createElement("div");
  heading.classList.add("heading");
  heading.innerText = `#${i}`;
  const img = document.createElement("img");
  img.setAttribute("src", `${data.sprites.front_default}`);
  img.setAttribute("alt", `${data.forms[0].name}`);
  const h2 = document.createElement("h2");
  h2.innerHTML = `${data.forms[0].name}`;
  const type = document.createElement("div");
  type.classList.add("type");
  const poke_type = data.types[0].type.name;
  type.innerHTML = `${poke_type}`;
  poke_card.style.backgroundColor = `${backgroundColor(poke_type)}`;
  poke_card_front.append(heading);
  poke_card_front.append(img);
  poke_card_front.append(h2);
  poke_card_front.append(type);
}

function pokeBack(poke_card_back, data, i) {
  const heading_back = document.createElement("div");
  heading_back.classList.add("heading");
  heading_back.innerText = `#${i}`;
  const img_back = document.createElement("img");
  img_back.setAttribute("src", `${data.sprites.back_default}`);
  img_back.setAttribute("alt", `${data.forms[0].name}`);
  const h2_back = document.createElement("h2");
  h2_back.innerHTML = `${data.forms[0].name}`;
  let abilities = "";
  for (const arr of data.abilities) {
    abilities += arr.ability.name + ",";
  }
  const modAbilities = abilities.slice(0, abilities.length - 1);
  const p = document.createElement("p");
  p.innerHTML = `Abilities:<br/>${modAbilities}`;
  poke_card_back.append(heading_back);
  poke_card_back.append(img_back);
  poke_card_back.append(h2_back);
  poke_card_back.append(p);
}

async function showAll() {
  for (let i = 1; i <= 151; i++) {
    const url = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    const data = await url.json();
    const poke_card_frame = document.createElement("div");
    poke_card_frame.classList.add("poke-card-frame");
    const poke_card = document.createElement("div");
    poke_card.classList.add("poke-card");
    const poke_card_front = document.createElement("div");
    poke_card_front.classList.add("poke-card-front");
    const poke_card_back = document.createElement("div");
    poke_card_back.classList.add("poke-card-back");

    //poke-front
    pokeFront(poke_card_front, poke_card, data, i);
    //poke-front-end

    //poke-back
    pokeBack(poke_card_back, data, i);
    //poke-back-end

    poke_card.append(poke_card_front);
    poke_card.append(poke_card_back);
    poke_card_frame.append(poke_card);
    poke_container.append(poke_card_frame);
  }
  mainArr = document.querySelectorAll(".poke-card-frame");
}
document.addEventListener("DOMContentLoaded", showAll);

function reRender() {
  poke_container.textContent = "";
  flag = 0;
  const select = document.querySelector("select");
  select.value = "types";
  text.value = "";
  mainArr.forEach((poke) => {
    poke_container.append(poke);
  });
}

function showByType(e) {
  text.value = "";
  const newArr = [];
  flag = 1;
  mainArr.forEach((pok) => {
    const type = pok.children[0].children[0].children[3].textContent;
    if (type === e.value) {
      newArr.push(pok);
    }
  });
  poke_container.textContent = "";
  newArr.forEach((pokemon) => {
    poke_container.append(pokemon);
  });
  tempArr = newArr;
}

filter.addEventListener("click", () => {
  console.log("hello");
  const select = document.querySelector("select");
  if (select.value === "types") reRender();
  else showByType(select);
});

reset.addEventListener("click", reRender);

text.addEventListener("keyup", (e) => {
  const target = e.target.value.toLowerCase();
  const newArr = [];
  if (flag === 0) {
    mainArr.forEach((pok) => {
      const pokemon_name =
        pok.children[0].children[0].children[2].textContent.toLowerCase();
      if (pokemon_name.includes(target)) {
        newArr.push(pok);
      }
    });
  } else {
    tempArr.forEach((pok) => {
      const pokemon_name =
        pok.children[0].children[0].children[2].textContent.toLowerCase();
      if (pokemon_name.includes(target)) {
        newArr.push(pok);
      }
    });
  }
  poke_container.textContent = "";
  newArr.forEach((pokemon) => {
    poke_container.append(pokemon);
  });
});
