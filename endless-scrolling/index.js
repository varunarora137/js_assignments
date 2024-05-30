const key = "bp7Wl0qQnKtK3MXAJ6bV86Ea4Q3RcvhjWfFuXpramI8";
const count = 10;
const url = `https://api.unsplash.com/photos/random?client_id=${key}&count=${count}`;
const img_container = document.querySelector(".img-container");

let photosArray = [];

function setAttributes(ele, attributes) {
  for (const key in attributes) {
    ele.setAttribute(key, attributes[key]);
  }
}
async function getPhotos() {
  const fetchURL = await fetch(url);
  photosArray = await fetchURL.json();
  console.log(photosArray);

  photosArray.forEach((photo) => {
    const anchor = document.createElement("a");
    setAttributes(anchor, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
    });

    anchor.append(img);
    img_container.append(anchor);
  });
}

getPhotos();

window.addEventListener("scroll", () => {
  if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
    getPhotos();
  }
});
