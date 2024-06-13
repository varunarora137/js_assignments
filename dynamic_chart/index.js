const ctx = document.getElementById("myChart").getContext("2d");
const theme = document.querySelector(".theme");
const card = document.querySelector(".card");
const graph_type = document.querySelector(".graph-type");
const canvas = document.querySelector("#myChart");
const key = "6b5705ab8f626e4b05f61cbf2e232759";
let animation = null;
let ind = 1;
let latitude = "";
let longitude = "";
let chart = "";

const color_combinations = [
  ["#C83642", "#F4CCD2"],
  ["#396C2F", "#AACC64"],
  ["#735DA5", "#D3C5E5"],
  ["#F98866", "#FFF2D7"],
  ["#66A5AD", "#C4DFE5"],
  ["#31473A", "#EDF4F2"],
];

const graph_options = ["line", "radar", "bar", "doughnut", "polarArea", "pie"];

const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#883888",
  "#A833FF",
  "#33FFA8",
  "#FFA833",
  "#5F5533",
  "#71AA33",
  "#3333FF",
  "#FF33FF",
  "#33FFFF",
  "#FFFF33",
  "#FFA833",
  "#33AF57",
];

const opt = {
  scales: {
    x: {
      title: {
        display: true,
        text: "Date And Time",
      },
      ticks: {
        maxRotation: 45,
        minRotation: 45,
        stepSize: 15,
      },
    },
    y: {
      title: {
        display: true,
        text: "Temperature in °Celsius",
      },
      beginAtZero: true,
      ticks: {
        stepSize: 15,
      },
    },
  },
};

const obj = {
  type: "radar",
  data: {
    labels: [],
    datasets: [
      {
        // label: `Temperature Forecast Of ${city}`,
        data: [],
        borderColor: colors,
        backgroundColor: colors.map((color) => color + "33"),
        fill: true,
        pointBackgroundColor: colors,
        pointBorderColor: colors,
        pointHoverBackgroundColor: "white",
        pointHoverBorderColor: colors,
      },
    ],
  },
  options: {},
};

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
    });
  }
  latitude = latitude || 28.6542;
  longitude = longitude || 77.2373;
  fetchData();
}

getLocation();

async function fetchData(c) {
  try {
    console.log("second");
    const fetchedData = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${key}`
    );
    const data = await fetchedData.json();

    const dates = [];
    const temp = [];

    for (let i = 0; i < 24; i++) {
      dates.push(data.list[i].dt_txt);
      let kelvin_temp = data.list[i].main.temp;
      temp.push(kelvin_temp - 273.15);
    }

    obj.data.labels = dates;
    obj.data.datasets[0].data = temp;
    const city = data.city.name;
    obj.data.datasets[0].label = `Temperature Forecast Of ${city}`;

    chart && chart.destroy();

    chart = new Chart(ctx, obj);

    chart.update();
  } catch (e) {
    console.log("error" + e);
  }
}

setInterval(fetchData, 10800000);

function updateChart() {
  chart.destroy();
  chart = new Chart(ctx, obj);
}

theme.addEventListener("click", () => {
  const num = Math.trunc(Math.random() * color_combinations.length);
  document.body.style.backgroundColor = color_combinations[num][0];
  card.style.backgroundColor = color_combinations[num][1];
  changeThemeAnimation();
});

graph_type.addEventListener("click", () => {
  ind = (ind + 1) % 6;
  const graph_name = graph_options[ind];
  obj.type = graph_name;
  if (graph_name === "line" || graph_name === "bar") {
    obj.options = opt;
    canvas.style.height = "400px";
    canvas.style.width = "800px";
  } else {
    obj.options = {};
    canvas.style.height = "550px";
    canvas.style.width = "550px";
  }
  updateChart();
  changeThemeAnimation();
});

function changeThemeAnimation() {
  if (animation) {
    animation.restart();
  } else {
    animation = anime({
      targets: ".el",
      rotate: "1turn",
      duration: 50,
    });
  }
}

function initialAnimation() {
  anime({
    targets: ".el",
    translateX: {
      value: "*=2.5",
      duration: 100,
    },
    width: {
      value: "-=25px",
      duration: 300,
      easing: "easeInOutSine",
    },
    rotate: {
      value: "+=2turn",
      duration: 100,
      easing: "easeInOutSine",
    },
    direction: "alternate",
  });
}

initialAnimation();
