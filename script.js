// PARTICLES
particlesJS("particles-js", {
  particles: {
    number: { value: 80 },
    color: { value: "#00f5ff" },
    size: { value: 3 },
    move: { speed: 2 }
  }
});

// CURSOR
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});

// GSAP HERO ANIMATION
gsap.from("#hero h1", {
  y: -100,
  opacity: 0,
  duration: 1
});

gsap.from("#hero p", {
  y: 50,
  opacity: 0,
  delay: 0.5,
  duration: 1
});

// SCROLL REVEAL
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
});

document.querySelectorAll(".card, .fade").forEach(el => {
  observer.observe(el);
});

// TILT EFFECT
document.querySelectorAll(".tilt").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    let x = e.offsetX;
    let y = e.offsetY;

    card.style.transform =
      `rotateX(${y/10}deg) rotateY(${x/10}deg) scale(1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});