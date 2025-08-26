// ======= MENU HAMBÚRGUER =======
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Fecha menu ao clicar em link (mobile)
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A" && window.innerWidth <= 768) {
    navLinks.classList.remove("active");
    navToggle.classList.remove("active");
  }
});

// ======= SMOOTH SCROLL =======
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ======= HEADER SCROLL STYLE =======
const header = document.querySelector("header");
let lastScrollY = 0;
function handleHeaderScroll() {
  if (window.scrollY > 60) {
    header.style.background = "rgba(229,0,0,0.85)";
    header.style.boxShadow = "0 2px 16px rgba(0,0,0,0.12)";
  } else {
    header.style.background = "rgba(255,255,255,0.15)";
    header.style.boxShadow = "";
  }
}
window.addEventListener("scroll", debounce(handleHeaderScroll, 50));

// ======= PRODUTOS FILTRO =======
const filterBtns = document.querySelectorAll(".filter-btn");
const produtoCards = document.querySelectorAll(".produto-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filtro = btn.dataset.filter;
    produtoCards.forEach((card) => {
      if (filtro === "todos" || card.classList.contains(filtro)) {
        card.style.display = "block";
        card.classList.add("fade-in");
      } else {
        card.style.display = "none";
        card.classList.remove("fade-in");
      }
    });
  });
});

// ======= SLIDER DE DEPOIMENTOS =======
const depoimentos = document.querySelectorAll(".depoimento");
let depoIndex = 0;
function showDepoimento(idx) {
  depoimentos.forEach((dep, i) => {
    dep.style.display = i === idx ? "block" : "none";
  });
}
function nextDepoimento() {
  depoIndex = (depoIndex + 1) % depoimentos.length;
  showDepoimento(depoIndex);
}
if (depoimentos.length > 0) {
  showDepoimento(depoIndex);
  setInterval(nextDepoimento, 5000);
}

// ======= FORMULÁRIO DE CONTATO =======
const contatoForm = document.querySelector(".contato-form");
if (contatoForm) {
  contatoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;
    const nome = contatoForm.nome;
    const email = contatoForm.email;
    const mensagem = contatoForm.mensagem;
    // Adicione campo telefone se existir
    const telefone = contatoForm.telefone;

    // Reset feedback
    [nome, email, mensagem, telefone].forEach((field) => {
      if (field) field.style.borderColor = "";
    });

    // Nome
    if (!nome.value.trim()) {
      nome.style.borderColor = "red";
      valid = false;
    }
    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      email.style.borderColor = "red";
      valid = false;
    }
    // Telefone (opcional)
    if (telefone && telefone.value.trim()) {
      const telRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
      if (!telRegex.test(telefone.value.trim())) {
        telefone.style.borderColor = "red";
        valid = false;
      }
    }
    // Mensagem
    if (!mensagem.value.trim()) {
      mensagem.style.borderColor = "red";
      valid = false;
    }

    if (valid) {
      contatoForm.querySelector("button").disabled = true;
      contatoForm.querySelector("button").textContent = "Enviando...";
      setTimeout(() => {
        contatoForm.reset();
        contatoForm.querySelector("button").disabled = false;
        contatoForm.querySelector("button").textContent = "Enviar";
        alert("Mensagem enviada com sucesso!");
      }, 1200);
    } else {
      alert("Por favor, preencha todos os campos corretamente.");
    }
  });
}

// ======= VOLTAR AO TOPO =======
const btnTopo = document.createElement("button");
btnTopo.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
btnTopo.className = "btn-topo";
btnTopo.style.position = "fixed";
btnTopo.style.right = "2rem";
btnTopo.style.bottom = "2rem";
btnTopo.style.display = "none";
btnTopo.style.zIndex = "999";
btnTopo.style.background = "var(--gradiente)";
btnTopo.style.color = "white";
btnTopo.style.border = "none";
btnTopo.style.borderRadius = "50%";
btnTopo.style.width = "48px";
btnTopo.style.height = "48px";
btnTopo.style.boxShadow = "0 4px 16px rgba(229,0,0,0.18)";
btnTopo.style.cursor = "pointer";
btnTopo.style.fontSize = "1.5rem";
document.body.appendChild(btnTopo);

btnTopo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function handleBtnTopo() {
  btnTopo.style.display = window.scrollY > 300 ? "block" : "none";
}
window.addEventListener("scroll", debounce(handleBtnTopo, 50));

// ======= ANIMAÇÕES ON-SCROLL =======
const animatedEls = document.querySelectorAll(
  ".fade-in, .bounce-in, .float-up"
);
function animateOnScroll() {
  animatedEls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add("animated");
    }
  });
}
window.addEventListener("scroll", debounce(animateOnScroll, 80));
window.addEventListener("DOMContentLoaded", animateOnScroll);

// ======= DEBOUNCE =======
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
