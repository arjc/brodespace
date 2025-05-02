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

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.nav-element');

window.onscroll = () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
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

// Function to update project node positions randomly
function updateProjectNodePositions() {
    const projectNodes = document.querySelectorAll('.project-node');
    projectNodes.forEach(node => {
        const updatePosition = () => {
            const x = Math.floor(Math.random() * 80) + 10; // Keep within 10-90% range
            const y = Math.floor(Math.random() * 80) + 10;
            node.style.setProperty('--x', x);
            node.style.setProperty('--y', y);
        };
        
        // Update position every 10 seconds
        setInterval(updatePosition, 10000);
    });
}

function initializeRadar() {
    const radar = document.querySelector('.radar-screen');
    if (!radar) return;
    
    // Initial setup of project nodes
    const projectNodes = document.querySelectorAll('.project-node');
    projectNodes.forEach(node => {
        // Set initial random positions
        const x = Math.floor(Math.random() * 80) + 10;
        const y = Math.floor(Math.random() * 80) + 10;
        node.style.setProperty('--x', x);
        node.style.setProperty('--y', y);
    });
}

// DAW Music Editor Logic
const dawProjects = [
    {
        name: "Red Sun in the Sky",
        link: "assets/Red Sun in the Sky CCP music.mp3",
        color: "#ff4d4d",
        colorLight: "#ff6666"
    },
    {
        name: "Alien Base 4 Calculator OST",
        link: "projects/calculator.html",
        color: "#00e6e6",
        colorLight: "#33ffff"
    },
    {
        name: "Files by Brode Theme",
        link: "files.html",
        color: "#ffd700",
        colorLight: "#ffed4a"
    },
    {
        name: "Brode's Beat 1",
        link: "#",
        color: "#8e44ad",
        colorLight: "#a55bbf"
    },
    {
        name: "Brode's Beat 2",
        link: "#",
        color: "#27ae60",
        colorLight: "#2ecc71"
    }
];

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function renderDAWTracks() {
    const dawTracks = document.getElementById('dawTracks');
    if (!dawTracks) return;
    dawTracks.innerHTML = '';
    
    dawProjects.forEach((proj, i) => {
        const left = randomInt(100, 1700);
        const top = randomInt(0, 180);
        const track = document.createElement('div');
        track.className = 'daw-track';
        track.style.left = left + 'px';
        track.style.top = top + 'px';
        track.style.setProperty('--track-color', proj.color);
        track.style.setProperty('--track-color-light', proj.colorLight);
        track.setAttribute('tabindex', 0);
        track.innerHTML = `
            <span class="daw-track-label">${proj.name}</span>
            <i class="fas fa-music" style="color: rgba(255,255,255,0.9); font-size: 1.5em;"></i>
        `;
        
        // Enhanced hover and click effects
        track.addEventListener('mouseenter', () => {
            track.classList.add('active');
            const playhead = document.getElementById('dawPlayhead');
            if (playhead) playhead.style.opacity = '1';
        });
        track.addEventListener('mouseleave', () => {
            track.classList.remove('active');
            const playhead = document.getElementById('dawPlayhead');
            if (playhead) playhead.style.opacity = '0.8';
        });
        track.addEventListener('click', () => {
            track.style.transform = 'scale(0.95)';
            setTimeout(() => {
                track.style.transform = '';
                window.open(proj.link, '_blank');
            }, 150);
        });
        dawTracks.appendChild(track);
    });
}

function dawPlayheadFollow() {
    const dawEditor = document.getElementById('dawEditor');
    const playhead = document.getElementById('dawPlayhead');
    if (!dawEditor || !playhead) return;
    
    dawEditor.addEventListener('mousemove', (e) => {
        const rect = dawEditor.getBoundingClientRect();
        const x = e.clientX - rect.left;
        playhead.style.left = x + 'px';
        playhead.style.transform = 'translateX(-50%)';
        playhead.style.opacity = '1';
    });
    
    dawEditor.addEventListener('mouseleave', () => {
        playhead.style.left = '-10px';
        playhead.style.opacity = '0.8';
    });
}

// Initialize radar and project nodes when page loads
window.addEventListener('load', () => {
    initializeRadar();
    updateProjectNodePositions();
});

window.addEventListener('DOMContentLoaded', () => {
    renderDAWTracks();
    dawPlayheadFollow();
});