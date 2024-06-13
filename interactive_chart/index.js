const ctx = document.getElementById("myChart").getContext("2d");
const theme = document.querySelector(".theme");
const card = document.querySelector(".card");
const graph_type = document.querySelector(".graph-type");
const canvas = document.querySelector("#myChart");
let animation = null;
let ind = 0;

const color_combinations = [
  ["#C83642", "#F4CCD2"],
  ["#396C2F", "#AACC64"],
  ["#735DA5", "#D3C5E5"],
  ["#F98866", "#FFF2D7"],
  ["#66A5AD", "#C4DFE5"],
  ["#31473A", "#EDF4F2"],
];

const seasons = [
  "2002-03",
  "2003-04",
  "2004-05",
  "2005-06",
  "2006-07",
  "2007-08",
  "2008-09",
  "2009-10",
  "2010-11",
  "2011-12",
  "2012-13",
  "2013-14",
  "2014-15",
  "2015-16",
  "2016-17",
  "2017-18",
  "2018-19",
  "2019-20",
  "2020-21",
  "2021-22",
  "2022-23",
  "2023-24",
];

const goals = [
  5, 6, 9, 12, 23, 42, 26, 33, 53, 60, 55, 51, 61, 51, 42, 44, 28, 37, 36, 24,
  14, 18,
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
  "#1511F1",
  "#33A8FF",
  "#113333",
  "#F733FF",
  "#A89933",
  "#1133A8",
  "#9999F7",
];

const opt = {
  scales: {
    x: {
      title: {
        display: true,
        text: "Season",
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
        text: "Goals",
      },
      beginAtZero: true,
      ticks: {
        stepSize: 15,
      },
    },
  },
};

const obj = {
  type: "line",
  data: {
    labels: seasons,
    datasets: [
      {
        label: "Cristiano Ronaldo's Goals per Season",
        data: goals,
        borderColor: colors,
        backgroundColor: colors.map((color) => color + "33"), // Add transparency to the background
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

let chart = new Chart(ctx, obj);

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
    canvas.style.height = "300px";
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
