const homeNavButton = document.querySelector("#homeNavButton");
const projectsNavButton = document.querySelector("#projectsNavButton");
const contactNavButton = document.querySelector("#contactNavButton");

const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("show");
      }, 250);
    } else {
        entry.target.classList.remove("show");
    }
  });
});

hiddenElements.forEach((el) => observer.observe(el));

const brogoInteractive = document.querySelector("#interactiveBrogo img");
setTimeout(() => {
  brogoInteractive.style.filter = "none";
  brogoInteractive.style.boxShadow = "0 0 30px var(--colorSecondary)";
}, 4000);
