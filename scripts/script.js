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

// Radar Animation
function initializeRadar() {
    const projectNodes = document.querySelectorAll('.project-node');
    const radarSweep = document.querySelector('.radar-sweep');
    
    if (!radarSweep) return;

    // Set random initial opacity for projects
    projectNodes.forEach(node => {
        node.style.opacity = '0';
        node.style.transform = 'translate(-50%, -50%) scale(0)';
    });

    // Function to check if sweep line has passed a node
    function isSweepPastNode(sweep, node) {
        const sweepAngle = parseFloat(sweep.style.transform.split('rotate(')[1]) || 0;
        const nodeX = parseFloat(node.style.getPropertyValue('--x'));
        const nodeY = parseFloat(node.style.getPropertyValue('--y'));
        const nodeAngle = (Math.atan2(nodeY - 50, nodeX - 50) * 180 / Math.PI + 360) % 360;
        
        return sweepAngle > nodeAngle;
    }

    // Animation frame handler
    function onSweepAnimationFrame() {
        const sweepAngle = parseFloat(radarSweep.style.transform.split('rotate(')[1]) || 0;
        
        projectNodes.forEach(node => {
            if (isSweepPastNode(radarSweep, node)) {
                node.style.opacity = '1';
                node.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        });

        requestAnimationFrame(onSweepAnimationFrame);
    }

    // Start the animation
    requestAnimationFrame(onSweepAnimationFrame);
}

// Initialize radar when page loads
window.addEventListener('load', () => {
    initializeRadar();
});