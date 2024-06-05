const input_txt = document.querySelector(".search_txt");
const search = document.querySelector(".search");
const phone_container = document.querySelector(".phones-container");
const phone_details = document.querySelectorAll(".phone-details");
const show_all = document.querySelector(".show-all");
const opacity_div = document.querySelector(".opacity_div");
const dialog = document.querySelector("dialog");
const processing = document.querySelector(".processing");
let phone_slug = "";

async function apiFetch(phone) {
  phone_container.innerHTML =
    "<div class='processing'> <img src='https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-18-223_512.gif' alt='processing'/> </div>";

  const fetch_data = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${phone}`
  );
  const phone_data = await fetch_data.json();
  if (!phone_data.status && phone.length !== 0) {
    phone_container.innerHTML =
      "<div style='margin:0 auto; padding-top:100px; font-size:50px; color:white; '>No result found</div>";
    return "exit";
  }
  return phone_data.data;
}

search.addEventListener("click", () => renderPhone(input_txt.value));

async function renderPhone(str = "13") {
  show_all.style.display = "none";
  const arr = await apiFetch(str);
  if (arr === "exit") return;
  if (arr.length === 0) {
    location.reload();
    return;
  }
  let count = 0;
  phone_container.innerHTML = "";

  for (let i = 0; i < arr.length; i++) {
    count++;
    let e = arr[i];
    const div = `<div class="phone" data-slug=${e.slug}>
    <div class="img-div"><img src=${e.image} alt="img"/></div>
    <h3>${e.phone_name}</h3>
    <p>There are many variations of passages of available, but the
              majority have suffered</p>
    <button class="details">SHOW DETAILS</button></div>`;
    phone_container.innerHTML += div;

    if (count === 12) {
      show_all.style.display = "flex";
      break;
    }
  }
  detailFetch();
  show_all.addEventListener("click", () => {
    for (let i = 12; i < arr.length; i++) {
      let e = arr[i];
      const div = `<div class="phone" data-slug=${e.slug}>
      <div class="img-div"><img src=${e.image} alt="img"/></div>
      <h3>${e.phone_name}</h3>
      <p>There are many variations of passages of available, but the
      majority have suffered</p>
      <button class="details">SHOW DETAILS</button></div>`;
      phone_container.innerHTML += div;
    }
    show_all.style.display = "none";
    detailFetch();
  });
}
renderPhone();

function detailFetch() {
  document.querySelectorAll(".details").forEach((e) => {
    e.addEventListener("click", async () => {
      console.log("hello");
      phone_slug = e.parentElement.getAttribute("data-slug");
      const api = await fetch(
        `https://openapi.programming-hero.com/api/phone/${phone_slug}`
      );
      const api_data = await api.json();

      document.body.classList.add("no-scroll");
      opacity_div.style.display = "block";
      opacity_div.innerHTML = `<dialog open class="phone-details">
            <img
              src=${api_data.data.image}
              alt="phone"
            />
            <h3>${api_data.data.name}</h3>
            <p class="brand">${api_data.data.brand}</p>
            <p>storage: ${api_data.data.mainFeatures.storage}</p>
            <p>
              displaySize: ${api_data.data.mainFeatures.displaySize}
            </p>
            <p>chipSet: ${api_data.data.mainFeatures.chipSet}</p>
            <p>
              memory: ${api_data.data.mainFeatures.memory}
            </p>
            <p>
              sensors: ${api_data.data.mainFeatures.sensors.join(",")}
            </p>
            <form method="dialog">
              <button class="close">close</button>
            </form>
          </dialog>`;

      opacity_div.querySelector(".close").addEventListener("click", () => {
        opacity_div.style.display = "none";
        document.body.classList.remove("no-scroll");
      });
    });
  });
}
