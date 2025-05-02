// Used matter imported using cdn cuz I aint learin vite or managing packages
// If future me is looking at this pls learn to use dependencies locally...

// This part is super mainstream as the documentation had it listed at first.
// I tired the one given by ChatGPT and it didnt work
const Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

const engine = Engine.create();
const render = Render.create({
  element: document.getElementById("fish-tank"),
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false,
    background: "transparent",
  },
});
//===========================================================================

// Items can clip through though. If you have a solution comment or push...
const ground = Bodies.rectangle(
  window.innerWidth / 2,
  window.innerHeight,
  window.innerWidth,
  60,
  { isStatic: true }
);
const leftWall = Bodies.rectangle(
  0,
  window.innerHeight / 2,
  60,
  window.innerHeight,
  { isStatic: true }
);
const rightWall = Bodies.rectangle(
  window.innerWidth,
  window.innerHeight / 2,
  60,
  window.innerHeight,
  { isStatic: true }
);
const ceil = Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 60, {
  isStatic: true,
});

World.add(engine.world, [ground, leftWall, rightWall, ceil]);

// Test code.
for (let i = 0; i < 7; i++) {
  const widget = Bodies.rectangle(
    Math.random() * window.innerWidth,
    Math.random() * window.innerHeight,
    Math.random() * (5 - 10) + 100,
    Math.random() * (5 - 10) + 100,
    { render: { fillStyle: "rgba(255, 255, 255, 0.7)" } }
  );
  World.add(engine.world, widget);
}

// Mouse, stiffness beyond 1.9999 are fkn weak.
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 1.999,
    render: {
      visible: false,
    },
  },
});
World.add(engine.world, mouseConstraint);
render.mouse = mouse;

Engine.run(engine);
Render.run(render);

// Fishes are honarable mentions. They are important people. DO NOT EAT!!!
const fishTank = document.getElementById("fish-tank");
// If you are pushing this, add your name in this array...
// "Theres are lots of fishes in the sea"
const friends = [
  "Sreehari",
  "Sanmai",
  "Leenex",
  "Aswin",
  "Vasanth",
  "Andrew Tate",
  "Rangu (aka lakshmi)",
  "Fish",
  "Cow",
  "Allah",
  "Jesus",
  "Moses",
  "YHWH",
  "BUdda",
  "Blue Avatar people",
  "ADHD",
  "JIbesh mathematics",
  "Umesh Tution center",
  "Thomas kutty",

];
const fishes = [];

friends.forEach((name, index) => {
  const fish = document.createElement("div");
  fish.className = "fish";
  fish.dataset.name = name;
  fish.style.left = `${Math.random() * 100}%`;
  fish.style.top = `${Math.random() * 100}%`;
  fishTank.appendChild(fish);

  // Hey future me! I tend to forget basic thing here
  fishes.push({
    element: fish,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: Math.random() * 2,
    vy: Math.random() * 2,
  });
});

function updateFishes() {
  fishes.forEach((fish) => {
    fish.x += fish.vx;
    fish.y += fish.vy;

    if (fish.x < 0 || fish.x > window.innerWidth) fish.vx *= -1;
    if (fish.y < 0 || fish.y > window.innerHeight) fish.vy *= -1;

    const angle = Math.atan2(fish.vy, fish.vx);
    fish.element.style.transform = `translate(${fish.x}px, ${fish.y}px) rotate(${angle}rad)`;
  });
  requestAnimationFrame(updateFishes);
}
updateFishes();

window.addEventListener("resize", () => {
  render.canvas.width = window.innerWidth;
  render.canvas.height = window.innerHeight;
  Matter.Body.setPosition(
    ground,
    Matter.Vector.create(window.innerWidth / 2, window.innerHeight)
  );
  Matter.Body.setPosition(
    rightWall,
    Matter.Vector.create(window.innerWidth, window.innerHeight / 2)
  );
});
