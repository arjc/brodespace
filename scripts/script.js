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

//setTimeouts are used here for permanent styles
setTimeout(() => {
  document.querySelector("#interactiveBrogo img").style.filter = "none";
  document.querySelector("#interactiveBrogo img").style.boxShadow = "0 0 30px var(--colorSecondary)";
}, 4000);

function snake() {
  const logo = document.querySelector("#interactiveBrogo img");
  logo.style.transform = "rotate(360deg)";
  logo.style.transition = "transform 1s ease";
  setTimeout(() => {
    logo.style.transform = "rotate(0deg)";
  }, 1000);
}