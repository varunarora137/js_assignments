const btn = document.querySelector(".btn");
let h2 = document.querySelector("h2");

btn.addEventListener("click", () => {
  const birth = document.querySelector("#dt").value;

  const birthYear = birth.slice(0, 4);
  const birthMonth = birth.slice(5, 7);
  const birthDate = birth.slice(8);

  if (birthDate === "") {
    alert("Please enter your birthday");
  } else {
    const today = new Date();
    console.log(today);
    const todayDate = today.getDate();
    let todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();

    let age = todayYear - birthYear;

    if (age > 0) {
      if (todayMonth - birthMonth < 0) {
        age--;
      } else {
        if (todayMonth - birthMonth === 0) {
          if (todayDate - birthDate < 0) age--;
        }
      }
    }

    h2.innerText = `Your age is ${age} ${
      age >= 0 && age <= 9 ? "year" : "years"
    } old`;
  }
});
