const inputDate = document.querySelector("#date");
const btn = document.querySelector("button");
const divs = document.querySelector(".display");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputDate.value === "") {
    alert("Please Enter Date");
    return;
  }

  const inputYear = inputDate.value.slice(0, 4);
  const inputMonth = inputDate.value.slice(5, 7);
  const inputDat = inputDate.value.slice(8, 10);

  const currDate = new Date();
  const currDat = currDate.getDate();
  const currYear = currDate.getFullYear();
  const currMonth = currDate.getMonth() + 1;

  let yearDiff = currYear - inputYear;
  const monthDiff = currMonth - inputMonth;
  const dateDiff = currDat - inputDat;

  if (
    (dateDiff < 0 && monthDiff <= 0 && yearDiff <= 0) ||
    (monthDiff < 0 && yearDiff <= 0) ||
    yearDiff < 0
  ) {
    alert("Not Born Yet");
    return;
  }
  if (monthDiff < 0 || (monthDiff === 0 && dateDiff < 0)) {
    yearDiff--;
  }

  divs.children[0].children[0].innerText = `${Math.abs(yearDiff)}`;
  divs.children[1].children[0].innerText = `${Math.abs(monthDiff)}`;
  divs.children[2].children[0].innerText = `${Math.abs(dateDiff)}`;
});
