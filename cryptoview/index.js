const toggle_button = document.querySelector(".toggle");
const body = document.body;
const main1 = document.querySelector(".main-1");
const main2 = document.querySelector(".main-2");
const search = document.querySelector(".search");
const heading = document.querySelector(".heading h1");
const modal_outer_div = document.querySelector(".modal-outer-div");
const text = document.querySelector(".text");
const query_search = document.querySelector(".query-search");
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": "CG-mB7bFM62ME3JNqF9bkMfTW4L",
  },
};

const data_mode = localStorage.getItem("data-mode") || "light";
if (data_mode === "dark") {
  document.querySelector(".circle").classList.add("circle-move");
}
localStorage.setItem("data-mode", data_mode);
document.body.setAttribute("data-mode", data_mode);

async function fetchData() {
  try {
    const fetch_data = await fetch(
      "https://api.coingecko.com/api/v3/search/trending",
      options
    );
    const data = fetch_data.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

async function fetchPrice(coin_name, currency) {
  try {
    const fetch_data = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coin_name}&vs_currencies=${currency}`,
      options
    );
    const data = await fetch_data.json();
    return data[coin_name][currency];
  } catch (e) {
    console.log(e);
  }
}

async function showTrending() {
  document.querySelector(".loading-screen").style.display = "block";
  const data = await fetchData();
  document.querySelector(".trending-container").innerHTML = "";
  const price = [];
  for (let i = 0; i < 7; i++) {
    const pr = await fetchPrice(data.coins[i].item.id, "inr");
    price.push(pr);
  }
  document.querySelector(".loading-screen").style.display = "none";
  for (let i = 0; i < 7; i++) {
    const trending = `<div class="trending">
            <img
              src=${data.coins[i].item.thumb}
              alt="img"
            />
            <div class="content">
              <h2>${data.coins[i].item.name} (${data.coins[i].item.symbol})</h2>
              <p>₹<span>${price[i]}</span></p>
            </div>
          </div>`;
    document.querySelector(".trending-container").innerHTML += trending;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showTrending();
});

async function showAllCoins(txt) {
  const fetch_data = await fetch(
    `https://api.coingecko.com/api/v3/search?query=${txt}`,
    options
  );
  const data = await fetch_data.json();
  return data;
}

async function searchCoins() {
  const txt = text.value;
  if (txt.length > 0) {
    document.querySelector(".loading-screen").style.display = "block";
    document.querySelector(".main-2-search-container").innerHTML = "";
    const arr = await showAllCoins(txt);
    document.querySelector(".loading-screen").style.display = "none";
    arr.coins.forEach((el, index) => {
      const res_div = `<div class="res-div" data-id=${el.id}>
          <div class="res-content">
            <p>${index + 1}</p>
            <img
              src=${el.thumb}
              alt="img"
            />
            <h2 class="coin-fullname">${el.name}</h2>
            <h2 class="coin-shortname">${el.symbol}</h2>
          </div>
          <button>More Info</button>
        </div>`;
      document.querySelector(".main-2-search-container").innerHTML += res_div;
    });
    text.value = "";
    moreInfo();
  }
}

text.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchCoins();
  }
});

query_search.addEventListener("click", () => {
  searchCoins();
});

search.addEventListener("click", () => {
  main1.style.display = "none";
  main2.style.display = "block";
  text.focus();
});

function moreInfo() {
  document.querySelectorAll(".res-div button").forEach((m) => {
    m.addEventListener("click", async (e) => {
      document.body.classList.add("no-scroll");
      document.querySelector(".loading-screen").style.display = "block";
      const id = e.target.parentElement.getAttribute("data-id");
      const fetch_data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}`,
        options
      );
      const data = await fetch_data.json();
      document.querySelector(".loading-screen").style.display = "none";
      modal_outer_div.style.display = "block";
      modal_outer_div.innerHTML = "";
      const modal = `<div class="modal">
        <button class="close">x</button>
        <div class="img-content-div">
          <img
            src=${data.image.large}
            alt="img"
          />
          <div class="modal-content">
            <h1>${data.name} (<span style="text-transform: uppercase;">${data.symbol})</h1>
            <h2>Price</h2>
            <div class="price-history">
              <span>₹ ${data.market_data.current_price.inr}</span><span>$ ${data.market_data.current_price.usd}</span><span>€ ${data.market_data.current_price.eur} </span
              ><span>£ ${data.market_data.current_price.gbp} </span>
            </div>
            <div class="desc">
              <h2>Description</h2>
              <p>${data.description.en}</p>
            </div>
          </div>
        </div>`;
      modal_outer_div.innerHTML = modal;
      closeModal();
    });
  });
}

function closeModal() {
  document.querySelector(".close").addEventListener("click", () => {
    modal_outer_div.style.display = "none";
    document.body.classList.remove("no-scroll");
  });
}

toggle_button.addEventListener("click", () => {
  if (body.getAttribute("data-mode") === "light") {
    body.setAttribute("data-mode", "dark");
    localStorage.setItem("data-mode", "dark");
    document.querySelector(".circle").classList.add("circle-move");
    document.querySelector(".not-inverted").style.display = "none";
    document.querySelector(".inverted").style.display = "inline";
  } else {
    body.setAttribute("data-mode", "light");
    localStorage.setItem("data-mode", "light");
    document.querySelector(".circle").classList.remove("circle-move");
    document.querySelector(".inverted").style.display = "none";
    document.querySelector(".not-inverted").style.display = "inline";
  }
});

heading.addEventListener("click", () => {
  main2.style.display = "none";
  main1.style.display = "block";
});
