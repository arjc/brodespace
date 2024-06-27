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

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll(".nav-element");
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove("active");
                document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
            });
        };
    });
};

const brogoInteractive = document.querySelector("#interactiveBrogo img");
setTimeout(() => {
  brogoInteractive.style.filter = "none";
  brogoInteractive.style.boxShadow = "0 0 30px var(--colorSecondary)";
}, 4000);
