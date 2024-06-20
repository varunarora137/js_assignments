const toggleCircle = document.querySelector(".circle");
const toggleButton = document.querySelector(".toggle");
const signUpToggleCircle = document.querySelector(".sign-up-circle");
const signUpToggleButton = document.querySelector(".sign-up-toggle");
const up = document.querySelector(".up");
const down = document.querySelector(".down");
const up_div = document.querySelector(".up-arrow");
const ukraine_container = document.querySelector(".save-imgs");
const total_ukraine_container_height = ukraine_container.scrollHeight;
const initial_ukraine_container_height = ukraine_container.offsetHeight;
const go_top = document.querySelector(".go-top");
const modal = document.querySelector(".modal");
const all_book_container = document.querySelector(".all-book-container");
const book_heading_container = document.querySelector(
  ".book-heading-container"
);
const book_container_div = document.querySelector(".book-container-div");
const categories_name = document.querySelector(".categories-name");
const main = document.querySelector("main");
const all_categories = document.querySelector(".all-categories");
const signup = document.querySelector(".signup");
const signUpSignUp = document.querySelector(".sign-up-signup");
const sign_up_close = document.querySelector(".sign-up-close");
const sign_in_close = document.querySelector(".sign-in-close");
const sign_up_div = document.querySelector(".sign-up-div");
const sign_in = document.querySelector(".sign-in");
const sign_up_sign_in = document.querySelector(".sign-up-sign-in");
const sign_up_sign_in_2 = document.querySelector(".sign-up-sign-in-2");
const sign_up_button = document.querySelector(".sign-up-button");
const sign_up_button_2 = document.querySelector(".sign-up-button-2");
const successful_login = document.querySelector(".successful-login");
const sign_up_container = document.querySelector(".sign-up-container");
const sign_in_container = document.querySelector(".sign-in-container");
const loading_screen = document.querySelector(".loading-screen");
const name1 = document.querySelector(".name");
const email1 = document.querySelector(".email");
const pwd1 = document.querySelector(".pwd");
const email2 = document.querySelector(".email2");
const pwd2 = document.querySelector(".pwd2");
const welcome_name = document.querySelector(".welcome-name");
const logout = document.querySelector(".logout");
let arr_data = [];
let page_already_scrolled = 0;

async function fetchData() {
  const fetch_data = await fetch(
    "https://books-backend.p.goit.global/books/top-books"
  );
  const data = await fetch_data.json();
  return data;
}

function createDiv(data, length = 5) {
  const div = document.createElement("div");
  div.classList.add("book-heading-container");
  div.innerHTML = `
            <p>${data.list_name}</p>
            <div class="all-book-container">
              
            </div>
            <div class="see-more">SEE MORE</div>
          `;
  for (let i = 0; i < length; i++) {
    let inner_div = document.createElement("div");
    inner_div.classList.add("book-container");
    inner_div.innerHTML = `
                <img
                  src=${data.books[i].book_image}
                  alt="book"
                />
                <div class="quick-view">QUICK VIEW</div>
                <p class="title">${
                  data.books[i].title.length > 18
                    ? data.books[i].title.slice(0, 15) + "...."
                    : data.books[i].title
                }</p>
                <p class="author">${
                  data.books[i].author.length > 28
                    ? data.books[i].author.slice(0, 26) + "...."
                    : data.books[i].author
                }</p>
              `;
    inner_div.setAttribute("data-id", data.books[i]._id);
    div.querySelector(".all-book-container").append(inner_div);
  }
  return div;
}

async function renderUI(count = 18) {
  loading_screen.style.display = "block";
  const data = await fetchData();
  loading_screen.style.display = "none";
  arr_data = data;
  book_container_div.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const div = createDiv(data[i]);
    book_container_div.append(div);
  }
  openModal();
  seeMore();
}

renderUI();

async function renderBookHeading() {
  try {
    const fetch_data = await fetch(
      "https://books-backend.p.goit.global/books/category-list"
    );
    const data = await fetch_data.json();

    for (let i = 0; i < data.length; i++) {
      const div = `<p>${data[i].list_name}</p>`;
      categories_name.innerHTML += div;
    }
    categorySelection();
  } catch (e) {
    console.log("error");
  }
}

renderBookHeading();

document.addEventListener("DOMContentLoaded", () => {
  const mode = localStorage.getItem("data-toggle") || "light";
  localStorage.setItem("data-toggle", mode);
  if (mode === "dark") {
    document.querySelector(".circle").classList.add("circle-move");
  }
  document.body.setAttribute(
    "data-toggle",
    `${localStorage.getItem("data-toggle")}`
  );
});

toggleButton.addEventListener("click", () => {
  toggleCircle.classList.toggle("circle-move");
  let mode = localStorage.getItem("data-toggle");
  mode = mode === "light" ? "dark" : "light";
  document.body.setAttribute("data-toggle", `${mode}`);
  localStorage.setItem("data-toggle", mode);
});

up_div.addEventListener("click", () => {
  if (up.style.display === "block") {
    // ukraine_container.scrollTop = 0;
    ukraine_container.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    up.style.display = "none";
    down.style.display = "block";
  } else {
    if (
      page_already_scrolled + initial_ukraine_container_height <
      total_ukraine_container_height
    ) {
      // ukraine_container.scrollTop = page_already_scrolled + 100;
      ukraine_container.scrollTo({
        top: page_already_scrolled + 100,
        behavior: "smooth",
      });
      page_already_scrolled += 100;
    }
    if (
      page_already_scrolled + initial_ukraine_container_height >=
      total_ukraine_container_height
    ) {
      page_already_scrolled = 0;
      down.style.display = "none";
      up.style.display = "block";
    }
  }
});

function goTop() {
  const heightThreshold = window.innerHeight * 1.5;

  if (window.scrollY + window.innerHeight >= heightThreshold) {
    go_top.style.opacity = 0.9;
  } else {
    go_top.style.opacity = 0;
  }
}

window.addEventListener("scroll", goTop);

go_top.addEventListener("click", () => {
  console.log("hello");
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  go_top.style.opacity = 0;
});

function openModal() {
  const book_container = document.querySelectorAll(".book-container");
  book_container.forEach((e) => {
    e.addEventListener("click", async (e) => {
      modal.style.display = "flex";
      const id = e.target.parentElement.getAttribute("data-id");

      const fetch_data = await fetch(
        `https://books-backend.p.goit.global/books/${id}`
      );
      const data = await fetch_data.json();
      // console.log(data);
      modal.innerHTML = `<div class="dialog">
        <div class="close">x</div>
        <div class="modal-img-content">
          <img
            src=${data.book_image}
            alt="img"
          />
          <div class="modal-content">
            <p class="modal-heading">
              ${data.title}
            </p>
            <p class="modal-author">${data.author}</p>
            <p class="modal-desc">${
              data.description || "there is no description of this book"
            }</p>
            <div class="modal-icons">
              <img
                src="https://yevhenii2022.github.io/team-proj-js-book-app/amazon-shop-1x.d33dc585.png"
                alt="icon"
              /><img
                src="https://yevhenii2022.github.io/team-proj-js-book-app/apple-shop-1x.aeb5cfd2.png"
                alt="icon"
              /><img
                src="https://yevhenii2022.github.io/team-proj-js-book-app/bookshop-1x.d3877644.png"
                alt="icon"
              />
            </div>
          </div>
        </div>
        <div class="modal-shopping"><p>ADD TO SHOPPING LIST</p></div>
      </div>`;
      document.body.classList.add("no-scroll");
      closeModal();
    });
  });
}

function closeModal() {
  const close = document.querySelector(".close");
  close.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.classList.remove("no-scroll");
  });
}

function seeMore() {
  const see_more = document.querySelectorAll(".see-more");
  see_more.forEach((e) => {
    const name = e.parentElement.children[0].textContent;
    e.addEventListener("click", () => {
      arr_data.forEach(async (arr) => {
        if (arr.list_name === name) {
          const fetch_data = await fetch(
            `https://books-backend.p.goit.global/books/category?category=${name}`
          );
          const data = await fetch_data.json();
          main.innerHTML = "";
          const firstName = name.split(" ").slice(0, -1).join(" ");
          const lastName = name.split(" ").slice(-1).join(" ");
          main.innerHTML = `<p class="main-heading">${firstName}<span>${
            " " + lastName
          }</span></p>`;
          const div = createSeeMoreDiv(data, data.length);
          main.append(div);
          openModal();
        }
      });
    });
  });
}

function createSeeMoreDiv(data, length = 5) {
  const div = document.createElement("div");
  div.classList.add("book-heading-container");
  div.innerHTML = `
            <div class="all-book-container">
            </div>
          `;
  for (let i = 0; i < length; i++) {
    let inner_div = document.createElement("div");
    inner_div.classList.add("book-container");
    inner_div.innerHTML = `
                <img
                  src=${data[i].book_image}
                  alt="book"
                />
                <div class="quick-view">QUICK VIEW</div>
                <p class="title">${
                  data[i].title.length > 18
                    ? data[i].title.slice(0, 15) + "...."
                    : data[i].title
                }</p>
                <p class="author">${
                  data[i].author.length > 28
                    ? data[i].author.slice(0, 26) + "...."
                    : data[i].author
                }</p>
              `;
    inner_div.setAttribute("data-id", data[i]._id);
    div.querySelector(".all-book-container").append(inner_div);
  }
  return div;
}

function categorySelection() {
  const heading = document.querySelectorAll(".categories-name p");
  all_categories.addEventListener("click", () => {
    heading.forEach((e) => {
      e.classList.remove("categories-name-hover");
    });
    all_categories.classList.add("categories-heading-hover");
    (() => location.reload())();
  });
  heading.forEach((e) => {
    e.addEventListener("click", () => {
      heading.forEach((e) => {
        e.classList.remove("categories-name-hover");
      });
      all_categories.classList.remove("categories-heading-hover");
      e.classList.add("categories-name-hover");
      const heading_text = e.innerText
        .split(" ")
        .map((word) => {
          if (word.toLowerCase() === "and") return "and";
          return word
            .split("-")
            .map(
              (segment) =>
                segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase()
            )
            .join("-");
        })
        .join(" ");
      arr_data.forEach(async (arr) => {
        if (arr.list_name === heading_text) {
          loading_screen.style.display = "block";
          const fetch_data = await fetch(
            `https://books-backend.p.goit.global/books/category?category=${heading_text}`
          );
          const data = await fetch_data.json();
          loading_screen.style.display = "none";
          main.innerHTML = "";
          const firstName = heading_text.split(" ").slice(0, -1).join(" ");
          const lastName = heading_text.split(" ").slice(-1).join(" ");
          main.innerHTML = `<p class="main-heading">${firstName}<span>${
            " " + lastName
          }</span></p>`;
          const div = createSeeMoreDiv(data, data.length);
          main.append(div);
          openModal();
        }
      });
    });
  });
}

signup.addEventListener("click", () => {
  sign_up_div.style.display = "block";
  sign_up_container.classList.remove("sign-up-container-animation");
  void sign_up_container.offset;
  sign_up_container.classList.add("sign-up-container-animation");
  document.body.classList.add("no-scroll");
  signUpSignUp.classList.add("sign-up-signup-hover");
  sign_up_container.style.display = "block";
  sign_in_container.style.display = "none";
});

signUpToggleButton.addEventListener("click", () => {
  signUpToggleCircle.classList.toggle("sign-up-circle-move");
  let mode = localStorage.getItem("data-toggle");
  mode = mode === "light" ? "dark" : "light";
  document.body.setAttribute("data-toggle", `${mode}`);
  localStorage.setItem("data-toggle", mode);
});

sign_up_close.addEventListener("click", () => {
  sign_up_div.style.display = "none";
  document.body.classList.remove("no-scroll");
  signUpSignUp.classList.remove("sign-up-signup-hover");
});

sign_in_close.addEventListener("click", () => {
  sign_up_div.style.display = "none";
  document.body.classList.remove("no-scroll");
  signUpSignUp.classList.remove("sign-up-signup-hover");
});

sign_in.addEventListener("click", () => {
  sign_up_container.style.display = "none";
  sign_in_container.style.display = "block";
  sign_in_container.classList.remove("sign-in-container-animation");
  void sign_in_container.offset;
  sign_in_container.classList.add("sign-in-container-animation");
});

sign_up_sign_in_2.addEventListener("click", () => {
  sign_up_container.style.display = "block";
  sign_in_container.style.display = "none";
});

sign_up_button.addEventListener("click", () => {
  const name = name1.value;
  const email = email1.value;
  const pwd = pwd1.value;

  if (name === "" || email === "" || pwd === "") {
    alert("Please Fill In All The Fields");
  } else {
    setTimeout(() => (successful_login.style.display = "none"), 2000);
    successful_login.style.display = "block";
    localStorage.setItem("pwd", pwd);
    localStorage.setItem("email", email);
    localStorage.setItem("name", name);
  }
  name1.value = "";
  pwd1.value = "";
  email1.value = "";
});

sign_up_button_2.addEventListener("click", () => {
  const email_get = email2.value;
  const pwd_get = pwd2.value;
  const name_stored = localStorage.getItem("name");
  const email_stored = localStorage.getItem("email");
  const pwd_stored = localStorage.getItem("pwd");

  if (email_get !== email_stored && pwd_get !== pwd_stored) {
    alert("Wrong Credentials");
  } else {
    successful_login.style.display = "block";
    successful_login.querySelector("p").innerText = "Successfully Signed In";
    setTimeout(() => {
      successful_login.style.display = "none";
      sign_up_div.style.display = "none";
      signup.style.display = "none";
      logout.style.display = "flex";
      welcome_name.style.display = "block";
      document.body.classList.remove("no-scroll");
      welcome_name.querySelector("span").innerText = `${name_stored}`;
    }, 2000);
  }
  pwd2.value = "";
  email2.value = "";
});

logout.addEventListener("click", () => {
  successful_login.style.display = "block";
  successful_login.querySelector("p").innerText = "Successfully Logged Out";
  logout.style.display = "none";
  welcome_name.style.display = "none";
  signup.style.display = "flex";
  document.body.classList.remove("no-scroll");
  setTimeout(() => {
    successful_login.style.display = "none";
  }, 2000);
});
