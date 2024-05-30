function characterCounter() {
  const text_area = document.querySelector("textarea");
  text_area.addEventListener("keyup", () => {
    const text_total = document.querySelector(".total");
    const text_remaining = document.querySelector(".remaining");
    text_total.textContent = text_area.value.length;
    text_remaining.textContent =
      text_area.getAttribute("maxLength") - text_area.value.length;
  });
}
characterCounter();
