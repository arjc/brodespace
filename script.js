const homeNavButton = document.querySelector("#homeNavButton");
const projectsNavButton = document.querySelector("#projectsNavButton");
const contactNavButton = document.querySelector("#contactNavButton");
const brogoInteractive = document.querySelector("#interactiveBrogo img");

setTimeout(() => {
  brogoInteractive.style.filter = "none";
  brogoInteractive.style.boxShadow = "0 0 30px var(--colorSecondary)";
}, 4000);
