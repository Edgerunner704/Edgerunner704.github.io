/* ═══════════════════════════════════════════════════════════
   PRABHU — PORTFOLIO  |  script.js
   GSAP · Particles · Tilt · Cursor · Typed text
═══════════════════════════════════════════════════════════ */

/* ────────────────────────────────
   0.  REGISTER GSAP PLUGINS
──────────────────────────────── */
gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────
   1.  PARTICLES.JS CONFIG
──────────────────────────────── */
particlesJS("particles-js", {
  particles: {
    number: { value: 60, density: { enable: true, value_area: 800 } },
    color:  { value: ["#00f5ff", "#8a2be2", "#ffffff"] },
    shape:  { type: "circle" },
    opacity: {
      value: 0.4,
      random: true,
      anim: { enable: true, speed: 0.8, opacity_min: 0.05, sync: false }
    },
    size: {
      value: 2,
      random: true,
      anim: { enable: true, speed: 2, size_min: 0.3, sync: false }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#00f5ff",
      opacity: 0.08,
      width: 1
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      repulse: { distance: 80, duration: 0.4 },
      push:    { particles_nb: 2 }
    }
  },
  retina_detect: true
});

/* ────────────────────────────────
   2.  CUSTOM CURSOR
──────────────────────────────── */
(function initCursor() {
  const outer = document.getElementById("cursorOuter");
  const inner = document.getElementById("cursorInner");
  if (!outer || !inner) return;

  let mouseX = 0, mouseY = 0;
  let outerX = 0, outerY = 0;

  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gsap.set(inner, { x: mouseX, y: mouseY });
  });

  // Smooth outer cursor
  function animateCursor() {
    outerX += (mouseX - outerX) * 0.12;
    outerY += (mouseY - outerY) * 0.12;
    gsap.set(outer, { x: outerX, y: outerY });
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover state
  const hoverEls = document.querySelectorAll(
    "a, button, .tilt-card, .magnetic-btn, .nav-link, .mobile-link"
  );
  hoverEls.forEach(el => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });
})();

/* ────────────────────────────────
   3.  NAV — SCROLL + MOBILE
──────────────────────────────── */
(function initNav() {
  const nav = document.getElementById("nav");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  // Scroll
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  // Hamburger
  let open = false;
  hamburger.addEventListener("click", () => {
    open = !open;
    mobileMenu.classList.toggle("open", open);
    hamburger.querySelectorAll("span")[0].style.transform = open ? "translateY(6.5px) rotate(45deg)" : "";
    hamburger.querySelectorAll("span")[1].style.opacity  = open ? "0" : "1";
    hamburger.querySelectorAll("span")[2].style.transform = open ? "translateY(-6.5px) rotate(-45deg)" : "";
  });
  mobileLinks.forEach(l => l.addEventListener("click", () => {
    open = false;
    mobileMenu.classList.remove("open");
    hamburger.querySelectorAll("span").forEach(s => { s.style.transform = ""; s.style.opacity = ""; });
  }));
})();

/* ────────────────────────────────
   4.  HERO GSAP ENTRANCE
──────────────────────────────── */
(function heroEntrance() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to("#heroEyebrow",     { opacity: 1, y: 0, duration: 1 }, 0.3)
    .to("#heroName",        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }, 0.55)
    .to("#heroTagline",     { opacity: 1, y: 0, duration: 0.9 }, 0.85)
    .to("#heroCta",         { opacity: 1, y: 0, duration: 0.8 }, 1.05)
    .to("#scrollIndicator", { opacity: 1, y: 0, duration: 0.7 }, 1.25)
    .to("#heroStats",       { opacity: 1, y: 0, duration: 0.8 }, 1.35);
})();

/* ────────────────────────────────
   5.  TYPED TEXT EFFECT
──────────────────────────────── */
(function initTyped() {
  const el = document.getElementById("typedText");
  if (!el) return;
  const phrases = [
    "Robotics Enthusiast",
    "AI & ML Engineer",
    "FEA Specialist",
    "Drone Designer",
    "Problem Solver"
  ];
  let phraseIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const phrase = phrases[phraseIdx];
    if (!deleting) {
      el.textContent = phrase.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === phrase.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 45 : 80);
  }
  setTimeout(type, 1800);
})();

/* ────────────────────────────────
   6.  SCROLL REVEAL (GSAP)
──────────────────────────────── */
(function initScrollReveal() {
  // Generic reveal-up
  gsap.utils.toArray(".reveal-up").forEach((el, i) => {
    const delay = parseFloat(el.style.getPropertyValue("--delay")) || 0;
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none"
      },
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      delay
    });
  });

  // Reveal-right
  gsap.utils.toArray(".reveal-right").forEach(el => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out"
    });
  });
})();

/* ────────────────────────────────
   7.  SKILL BAR ANIMATION
──────────────────────────────── */
(function initSkillBars() {
  document.querySelectorAll(".skill-fill").forEach(bar => {
    const target = bar.getAttribute("data-width") + "%";
    ScrollTrigger.create({
      trigger: bar,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(bar, { width: target, duration: 1.4, ease: "power2.out" });
      }
    });
  });
})();

/* ────────────────────────────────
   8.  3D TILT EFFECT ON CARDS
──────────────────────────────── */
(function initTilt() {
  const cards = document.querySelectorAll(".tilt-card");

  cards.forEach(card => {
    let bounds;

    function refreshBounds() {
      bounds = card.getBoundingClientRect();
    }

    card.addEventListener("mouseenter", () => {
      refreshBounds();
      card.style.transition = "transform 0.1s ease, box-shadow 0.3s ease";
    });

    card.addEventListener("mousemove", e => {
      if (!bounds) return;
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;
      const xPct = (x / bounds.width  - 0.5) * 2;
      const yPct = (y / bounds.height - 0.5) * 2;

      const rotateX = -yPct * 6;
      const rotateY =  xPct * 6;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.2,
        ease: "power1.out",
        transformPerspective: 900,
        transformOrigin: "center center"
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)"
      });
    });
  });
})();

/* ────────────────────────────────
   9.  MAGNETIC BUTTONS
──────────────────────────────── */
(function initMagnetic() {
  document.querySelectorAll(".magnetic-btn").forEach(btn => {
    btn.addEventListener("mousemove", e => {
      const r   = btn.getBoundingClientRect();
      const dx  = e.clientX - (r.left + r.width  / 2);
      const dy  = e.clientY - (r.top  + r.height / 2);
      gsap.to(btn, { x: dx * 0.28, y: dy * 0.28, duration: 0.4, ease: "power2.out" });
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    });
  });
})();

/* ────────────────────────────────
   10. PARALLAX ON HERO BLOBS
──────────────────────────────── */
(function initParallax() {
  window.addEventListener("mousemove", e => {
    const cx = (e.clientX / window.innerWidth  - 0.5);
    const cy = (e.clientY / window.innerHeight - 0.5);

    gsap.to(".blob-1", { x: cx * 40, y: cy * 30, duration: 1.5, ease: "power1.out" });
    gsap.to(".blob-2", { x: cx * -30, y: cy * -25, duration: 1.5, ease: "power1.out" });
    gsap.to(".blob-3", { x: cx * 20, y: cy * 20, duration: 1.8, ease: "power1.out" });
  });
})();

/* ────────────────────────────────
   11. SMOOTH SCROLL FOR NAV LINKS
──────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 72;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      gsap.to(window, { scrollTo: top, duration: 1.1, ease: "power3.inOut" });
    });
  });

  // Polyfill for gsap scrollTo without plugin
  gsap.registerEffect && void 0;
  if (!gsap.plugins || !gsap.plugins.scrollTo) {
    // Fallback smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener("click", e => {
        const target = document.querySelector(a.getAttribute("href"));
        if (!target) return;
        e.preventDefault();
        const navH = 72;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: "smooth" });
      });
    });
  }
})();

/* ────────────────────────────────
   12. NAV ACTIVE SECTION HIGHLIGHT
──────────────────────────────── */
(function initActiveNav() {
  const sections  = document.querySelectorAll("section[id]");
  const navLinks  = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove("active"));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }, { rootMargin: "-40% 0px -50% 0px" });

  sections.forEach(s => observer.observe(s));

  // Add active style
  const style = document.createElement("style");
  style.textContent = ".nav-link.active { color: var(--neon) !important; } .nav-link.active::after { width: 100% !important; }";
  document.head.appendChild(style);
})();

/* ────────────────────────────────
   13. PAGE LOAD PROGRESS BAR
──────────────────────────────── */
(function initProgressBar() {
  const bar = document.createElement("div");
  Object.assign(bar.style, {
    position: "fixed",
    top: "0", left: "0",
    width: "0%", height: "2px",
    background: "linear-gradient(90deg, var(--neon), var(--purple))",
    boxShadow: "0 0 10px var(--neon)",
    zIndex: "9998",
    transition: "width 0.1s linear, opacity 0.5s"
  });
  document.body.appendChild(bar);

  window.addEventListener("scroll", () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = pct + "%";
    bar.style.opacity = pct > 99 ? "0" : "1";
  }, { passive: true });
})();

/* ────────────────────────────────
   14. HERO NAME GLITCH ON HOVER
──────────────────────────────── */
(function initGlitch() {
  const nameEl = document.querySelector(".hero-name");
  if (!nameEl) return;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%";
  const original = "PRABHU";
  let interval = null;

  nameEl.addEventListener("mouseenter", () => {
    let iter = 0;
    clearInterval(interval);
    interval = setInterval(() => {
      const nameLine = nameEl.querySelector(".name-line");
      if (!nameLine) return;
      nameLine.textContent = original
        .split("")
        .map((c, i) =>
          i < iter ? original[i] : chars[Math.floor(Math.random() * chars.length)]
        )
        .join("");
      if (iter >= original.length) {
        clearInterval(interval);
        nameLine.textContent = original;
      }
      iter += 1 / 2.5;
    }, 30);
  });
})();

/* ────────────────────────────────
   15. AMBIENT GLOW FOLLOW CURSOR
    (hero section only)
──────────────────────────────── */
(function initAmbientGlow() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const glow = document.createElement("div");
  Object.assign(glow.style, {
    position: "absolute",
    width: "500px", height: "500px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(0,245,255,0.04), transparent 60%)",
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
    transition: "left 0.8s ease, top 0.8s ease",
    zIndex: "1"
  });
  hero.appendChild(glow);

  hero.addEventListener("mousemove", e => {
    const r = hero.getBoundingClientRect();
    glow.style.left = (e.clientX - r.left) + "px";
    glow.style.top  = (e.clientY - r.top)  + "px";
  });
})();

console.log(
  "%cPrabhu — Portfolio %c| Mechanical Engineer & Robotics Enthusiast",
  "color:#00f5ff;font-family:monospace;font-size:14px;font-weight:bold;",
  "color:#8a2be2;font-family:monospace;font-size:12px;"
);
