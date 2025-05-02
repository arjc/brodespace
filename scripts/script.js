const homeNavButton = document.querySelector("#homeNavButton");
const projectsNavButton = document.querySelector("#projectsNavButton");
const contactNavButton = document.querySelector("#contactNavButton");

const hiddenElements = document.querySelectorAll(".hidden");

//SHITCODE
function randomInt(l, u) {
    return Math.floor(Math.random() * (u - l + 1)) + l;
}

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

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-element');

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

//Brogo  light up
setTimeout(() => {
  document.querySelector("#interactiveBrogo img").style.filter = "none";
  document.querySelector("#interactiveBrogo img").style.boxShadow = "0 0 30px var(--colorSecondary)";
}, 4000);

//jump around in radar
function updateProjectNodePositions() {
    const projectNodes = document.querySelectorAll('.project-node');
    projectNodes.forEach(node => {
        const updatePosition = () => {
            const x = Math.floor(Math.random() * 80) + 10; //10-90% range
            const y = Math.floor(Math.random() * 80) + 10;
            node.style.setProperty('--x', x);
            node.style.setProperty('--y', y);
        };
        
        //TODO: make sure that it syncs with dissapear. I dont want to make another function for it since I dont know how to do so
        setInterval(updatePosition, 10000);
    });
}

function initializeRadar() {
    const radar = document.querySelector('.radar-screen');
    if (!radar) return;
    
    const projectNodes = document.querySelectorAll('.project-node');
    projectNodes.forEach(node => {
        const x = Math.floor(Math.random() * 80) + 10;
        const y = Math.floor(Math.random() * 80) + 10;
        node.style.setProperty('--x', x);
        node.style.setProperty('--y', y);
    });
}

//===DAWWG===
const dawProjects = [
    {
        name: "Red Sun in the Sky",
        link: "assets/Red Sun in the Sky CCP music.mp3",
        color: "#ff4d4d",
        colorLight: "#ff6666",
        icon: "fas fa-music"
    },
    {
        name: "Alien Base 4 Calculator OST",
        link: "projects/calculator.html",
        color: "#00e6e6",
        colorLight: "#33ffff",
        icon: "fas fa-music"
    },
    {
        name: "Files by Brode Theme",
        link: "files.html",
        color: "#ffd700",
        colorLight: "#ffed4a",
        icon: "fab fa-twitter"
    },

];

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
            <i class="${proj.icon}" style="color: rgba(255,255,255,0.9); font-size: 1.5em;"></i>
        `;

        // CHATGPT's code
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
    //DAW PLAY HEAD THE FOOLOW WITH ME NIGGESH
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
    
    // dawEditor.addEventListener('mouseleave', () => {
    //     playhead.style.left = '-10px';
    //     playhead.style.opacity = '0.8';
    // });
}
//=======================

const yey = document.querySelector("#yay")

setInterval(() => {
    yey.textContent = "\\(@O@)/"
    setTimeout(() => yey.textContent = "_(@o@)_", 500)
}, 1000);

//INIT... NO JS BEYOND THIS POINT =============================================================================
window.addEventListener('load', () => {
    initializeRadar();
    updateProjectNodePositions();
});

window.addEventListener('DOMContentLoaded', () => {
    renderDAWTracks();
    dawPlayheadFollow();
});