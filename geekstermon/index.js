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

function pokeFront(poke_card_front, poke_card, data) {
  const poke_type = data.types[0].type.name;
  poke_card_front.innerHTML = `<div class="hp">HP <span class="hp-no">${data.stats[0].base_stat}</span></div>
              <img
                src=${data.sprites.other.dream_world.front_default}
                alt="pokemon"
              />
              <h2>${data.forms[0].name}</h2>
              <div class="type">${data.types[0].type.name}</div>
              <div class="features">
                <div>
                  <p>${data.stats[1].base_stat}</p>
                  <p>Attack</p>
                </div>
                <div>
                  <p>${data.stats[2].base_stat}</p>
                  <p>Defense</p>
                </div>
                <div>
                  <p>${data.stats[5].base_stat}</p>
                  <p>Speed</p>
                </div>
              </div>`;
  poke_card_front.querySelector(
    ".type"
  ).style.backgroundColor = `${backgroundColor(poke_type)}`;
  poke_card.style.background = `radial-gradient(
    circle at 50% 0%,
    ${backgroundColor(poke_type)} 36%,
    rgb(255, 255, 255) 36%
  )`;
}

function pokeBack(poke_card_back, data) {
  let abilities = [];
  for (const [index, arr] of data.abilities.entries()) {
    abilities.push(arr.ability.name);
  }
  const poke_type = data.types[0].type.name;
  poke_card_back.innerHTML = `<img
                src=${data.sprites.other.showdown.back_default}
                alt="pokemon"
              />
              <p>Abilities</p>
              <div class="abilities">
                <div class="ability">ELECTRIc</div>
                <div class="ability">ELECTRIc</div>
              </div>
              <div class="features-back">
                <div>
                  <p>Weight</p>
                  <p><span>${data.weight}</span>lb</p>
                </div>
                <div>
                  <p>Height</p>
                  <p><span>${data.height}</span>cm</p>
                </div>
              </div>`;
  poke_card_back.querySelectorAll(".ability").forEach((e, i) => {
    e.style.backgroundColor = `${backgroundColor(poke_type)}`;
    e.innerHTML = `${abilities[i]}`;
  });
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
    pokeFront(poke_card_front, poke_card, data);
    //poke-front-end

    //poke-back
    pokeBack(poke_card_back, data);
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
  // poke_container.textContent = "";
  // flag = 0;
  // const select = document.querySelector("select");
  // select.value = "types";
  // text.value = "";
  // mainArr.forEach((poke) => {
  //   poke_container.append(poke);
  // });

  location.reload();
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
