const Products = [
  { id: 1, name: "Product-1", price: 100 },
  { id: 2, name: "Product-2", price: 200 },
  { id: 3, name: "Product-3", price: 300 },
];

const prod_div = document.querySelector(".products");
const cart_div = document.querySelector(".cart");
const cart_prod_div = document.querySelector(".cart-prod-div");
const total_div = document.querySelector(".total-div");
let total_sum = 0;
let flag = 0;

function renderComponents() {
  for (const data of Products) {
    const prod = document.createElement("div");
    prod.classList.add("prod");
    prod.id = `${data.id}`;
    const p1 = document.createElement("p");
    p1.innerText = `${data.name}`;
    const p2 = document.createElement("p");
    p2.innerText = `${data.price}`;
    const counter = document.createElement("div");
    counter.classList.add("counter");
    const btn1 = document.createElement("button");
    btn1.innerText = "-";
    btn1.classList.add("minus");
    const p3 = document.createElement("p");
    p3.innerText = "0";
    const btn2 = document.createElement("button");
    btn2.innerText = "+";
    btn2.classList.add("plus");
    counter.append(btn1);
    counter.append(p3);
    counter.append(btn2);
    prod.append(p1);
    prod.append(p2);
    prod.append(counter);
    prod_div.append(prod);
  }
}
renderComponents();

const plus = document.querySelectorAll(".plus");
const minus = document.querySelectorAll(".minus");

plus.forEach((pl) => {
  pl.addEventListener("click", (e) => {
    const num = pl.parentElement.children[1];
    let val = Number(num.innerText);
    val++;
    num.innerText = `${val}`;
    if (val === 1) cart_display(e.target);
    else {
      updateCart(e.target);
    }
    total_sum += Number(pl.parentElement.parentElement.children[1].innerText);
    if (flag === 0) cart_total_display();
    else {
      addSum();
    }
    flag++;
  });
});

minus.forEach((mi) => {
  mi.addEventListener("click", (e) => {
    const num = mi.parentElement.children[1];
    let val = Number(num.innerText);
    val = val - 1;
    if (val >= 0) {
      num.innerText = `${val}`;
      total_sum -= Number(mi.parentElement.parentElement.children[1].innerText);
      updateCart(e.target);
      addSum();
    }
  });
});

function cart_display(el) {
  const parent = el.parentElement.parentElement;
  const h2 = document.querySelector("h2");
  h2.style.display = "none";
  const div = document.createElement("div");
  div.id = `${parent.id}`;
  div.classList.add("cart-prod");
  const p1 = document.createElement("p");
  p1.innerText = `${parent.children[0].innerText}`;
  const p2 = document.createElement("p");
  p2.innerText = `${el.parentElement.children[1].innerText} x ${parent.children[1].innerText}`;
  div.append(p1);
  div.append(p2);
  cart_prod_div.append(div);
  sortCart();
}

function cart_total_display() {
  const cart_total = document.createElement("div");
  cart_total.classList.add("total");
  const h1 = document.createElement("p");
  h1.innerText = `Total:`;
  const h2 = document.createElement("p");
  h2.innerText = `${total_sum}`;
  cart_total.append(h1);
  cart_total.append(h2);
  cart_prod_div.append(cart_total);
}

function addSum() {
  const el = document.querySelector(".total")?.children[1];
  if (el) {
    el.innerText = `${total_sum >= 0 ? total_sum : 0}`;
  }
}

function updateCart(el) {
  const element = el.parentElement.parentElement;
  let all_cart = document.querySelectorAll(".cart-prod");
  all_cart.forEach((e) => {
    if (element.id === e.id) {
      const val = `${element.children[2].children[1].innerText} x ${element.children[1].innerText}`;
      if (element.children[2].children[1].innerText === "0") {
        e.remove();
      } else e.children[1].innerText = val;
    }
  });
  all_cart = document.querySelectorAll(".cart-prod");
  if (all_cart.length === 0) {
    const h2 = document.querySelector("h2");
    h2.style.display = "block";
    total_div.display = "none";
    flag = 0;
    document.querySelector(".total").remove();
  }
}

function sortCart() {
  const all_cart = document.querySelectorAll(".cart-prod");
  const arr = Array.from(all_cart);
  arr.sort((a, b) => Number(a.id) - Number(b.id));
  arr.forEach((el) => {
    cart_prod_div.append(el);
  });
}
