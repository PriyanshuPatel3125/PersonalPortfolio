let btnToggel = document.querySelector('.mode');
let themeIcon = document.querySelector('.toggle-icon');
let header = document.querySelector('header')

// ----------------- Light/Dark Theming Configuration -----------------
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
  themeIcon.className = 'fa-solid fa-sun';
  themeIcon.style.color = '#fbbf24';
} else {
  document.documentElement.classList.remove('dark');
  themeIcon.className = 'fa-solid fa-moon';
  themeIcon.style.color = 'var(--text-primary)';
}

btnToggel.addEventListener('click', () => {
  if (document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
    themeIcon.className = 'fa-solid fa-moon';
    themeIcon.style.color = 'var(--text-primary)';
  } else {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
    themeIcon.className = 'fa-solid fa-sun';
    themeIcon.style.color = '#fbbf24';
  }
});

// ----------------- Transparent to Glassmorphic Header -----------------
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ---------------- Popup ---------------------
function openPopup(tag, title, desc, img, a, live) {
  document.getElementById("popup").style.display = "flex";
  document.getElementById("tag").innerText = tag
  document.getElementById("title").innerText = title;
  document.getElementById("desc").innerText = desc;
  document.getElementById("popupImg").src = img;
  document.getElementById("a").href = a;
  document.getElementById("live").href = live;
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

window.onclick = function (e) {
  let popup = document.getElementById("popup");
  if (e.target === popup) {
    popup.style.display = "none";
  }
}

// -----------------Mobile Menu-----------------------

const menuBtn = document.getElementById("bar");
const mobileMenu = document.getElementById("mobileMenu");
const closeBtn = document.getElementById("closeBtn");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  // overlay.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  // overlay.classList.remove("active");
});

// ----------------- Interactive Particles Stardust Canvas -----------------
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null, radius: 210 };

function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particles = [];
  const numParticles = Math.min(Math.floor(window.innerWidth / 12), 120);
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.3
    });
  }
}

window.addEventListener('resize', initCanvas);
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
window.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const isDark = document.documentElement.classList.contains('dark');
  const particleColor = isDark ? '99, 102, 241' : '79, 70, 229';

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    if (mouse.x && mouse.y) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < mouse.radius) {
        const force = (mouse.radius - distance) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        p.x += Math.cos(angle) * force * 1.5;
        p.y += Math.sin(angle) * force * 1.5;
      }
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${particleColor}, ${p.alpha})`;
    ctx.fill();
  });

  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${particleColor}, ${(1 - dist / 100) * 0.12})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}

initCanvas();
animateParticles();

let btnSend = document.querySelector('.btn-send');

btnSend.addEventListener('click', () => {
  document.getElementById("alert").classList.add("active");
})

function closeAlert() {
  document.getElementById("alert").classList.remove("active");
}