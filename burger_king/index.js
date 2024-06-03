const cards = document.querySelectorAll(".card");
const cart_txt = document.querySelector(".cart-txt");
const place_order = document.querySelector(".place-order");
const main = document.querySelector("main");
const processing = document.querySelector(".processing");
const order_placed = document.querySelector(".order-placed");
const order_placed_button = document.querySelector(".go-back");
const all_cards = document.querySelector(".all");
const cart_items = document.querySelector(".order-imgs");
const order_id = document.querySelector(".order-id");

let count = 0;
let display_arr = new Map();

function cardClick() {
  cards.forEach((cd) => {
    cd.addEventListener("click", (e) => {
      //display-hide/show
      if (
        e.target.classList.contains("add") ||
        e.target.classList.contains("add-txt")
      ) {
        if (e.target.classList.contains("add")) {
          e.target.children[0].style.display = "none";
          e.target.children[1].style.display = "flex";
          let el = e.target.parentNode.parentNode;
          let ct = display_arr.get(el) || 0;
          display_arr.set(el, ct + 1);
        } else if (e.target.classList.contains("add-txt")) {
          e.target.style.display = "none";
          e.target.parentNode.children[1].style.display = "flex";
          let el = e.target.parentNode.parentNode.parentNode;
          let ct = display_arr.get(el) || 0;
          display_arr.set(el, ct + 1);
        }
        count += 1;
        place_order.style.display = "block";
      }

      //count-inc/dec
      if (e.target.classList.contains("minus")) {
        count -= 1;
        let cnt_el = +e.target.parentNode.querySelector(".num").innerText;
        cnt_el -= 1;
        if (cnt_el === 0) {
          e.target.parentNode.parentNode.children[1].style.display = "none";
          e.target.parentNode.parentNode.children[0].style.display = "block";
          place_order.style.display = "none";
          display_arr.set(
            e.target.parentNode.parentNode.parentNode.parentNode,
            0
          );
        } else {
          let el = e.target.parentNode.parentNode.parentNode.parentNode;

          let ct = display_arr.get(
            e.target.parentNode.parentNode.parentNode.parentNode
          );
          display_arr.set(el, ct - 1);
          e.target.parentNode.querySelector(".num").innerText = cnt_el;
        }

        cart_txt.innerText = count;
      }
      if (e.target.classList.contains("plus")) {
        count = count + 1;
        let cnt_ell = +e.target.parentNode.querySelector(".num").innerText;
        cnt_ell += 1;
        cart_txt.innerText = count;
        e.target.parentNode.querySelector(".num").innerText = cnt_ell;
        let el = e.target.parentNode.parentNode.parentNode.parentNode;
        let ct = display_arr.get(
          e.target.parentNode.parentNode.parentNode.parentNode
        );
        display_arr.set(el, ct + 1);
      }
    });
  });
}
cardClick();

place_order.addEventListener("click", () => {
  main.style.display = "none";
  processing.style.display = "block";
  setTimeout(() => {
    processing.style.display = "none";
    order_placed.style.display = "block";
    count = 0;
    cart_txt.innerText = count;
    let id = orderIDGenerator();
    order_id.innerText = id;
    displayCartItems();
  }, 2500);
});

order_placed_button.addEventListener("click", () => {
  order_placed.style.display = "none";
  main.style.display = "block";
  place_order.style.display = "none";
  display_arr.clear();
  cart_items.innerHTML = "";
  showInitialCart();
});

function displayCartItems() {
  for (const item of display_arr.keys()) {
    const div = document.createElement("div");
    div.classList.add("order-img-item");
    const img1src = item.children[0].src;
    const img2src = item.children[3].children[0].children[0].children[0].src;
    const p1 = item.children[3].children[0].children[0].innerText;
    let p2 = item.children[3].children[1].innerText;
    let num = display_arr.get(item);
    p2 += `\t<span class="total_quant">x${num}</span>`;
    div.innerHTML = `<img src=${img1src} alt="image"/> <p>${p1}</p> <p>${p2}</p> <img src=${img2src} alt="veg/non-veg" />`;
    cart_items.append(div);
  }
}

function showInitialCart() {
  cards.forEach((card) => {
    const quant = card.querySelector(".quantity");
    quant.children[1].innerText = "1";
    quant.style.display = "none";
    card.querySelector(".add-txt").style.display = "block";
    all_cards.append(card);
  });
}

function orderIDGenerator() {
  let str = "";
  for (let i = 0; i < 6; i++) {
    str += Math.trunc(Math.random() * 10);
  }
  return str;
}
