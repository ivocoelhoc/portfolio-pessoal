/* ==========================================================
   ARQUIVO: script.js
   DESCRIÇÃO: Funções de interação do site.
   ========================================================== */

/* --- Alternar tema claro/escuro com animação do ícone --- */
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeText = document.getElementById("theme-text");

// Carregar tema salvo
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeIcon.textContent = "🌞";
    themeText.textContent = "Tema Claro";
} else {
    themeIcon.textContent = "🌛";
    themeText.textContent = "Tema Escuro";
}

// Evento de clique
themeToggle.addEventListener("click", () => {

    // Adicionar classe de rotação
    themeIcon.classList.add("rotate");

    // Remover classe após a animação
    setTimeout(() => {
        themeIcon.classList.remove("rotate");
    }, 600);

    // Alternar tema
    const isDark = document.body.classList.toggle("dark-theme");

    if (isDark) {
        themeIcon.textContent = "🌞";  // sol
        themeText.textContent = "Tema Claro";
        localStorage.setItem("theme", "dark");
    } else {
        themeIcon.textContent = "🌛";  // lua
        themeText.textContent = "Tema Escuro";
        localStorage.setItem("theme", "light");
    }
});


// --- 2. Menu Hambúrguer (Mobile) ---
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}


// --- 3. Fechar menu ao clicar em qualquer link ---
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});


// --- 4. Header transparente ao rolar a página ---
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (!header) return;

    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


// --- 5. Destacar link ativo do menu ---
document.addEventListener("DOMContentLoaded", () => {
    let currentPage = window.location.pathname.split("/").pop();
    
    // Se a página for vazia (raiz), considera como index.html
    if (currentPage === "") {
        currentPage = "index.html";
    }

    document.querySelectorAll("nav a").forEach(link => {
        const linkPage = link.getAttribute("href");

        // Permite funcionar em diretórios diferentes
        if (currentPage === linkPage) {
            link.classList.add("active");
        }
    });
});


// --- 6. Validação do formulário (correta e dentro do submit) ---
document.addEventListener("submit", function(e){
    const form = e.target;

    if(form.id !== "form-contato") return; // apenas no formulário de contato
    
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const mensagem = form.mensagem.value.trim();

    // Campos obrigatórios
    if (!nome || !email || !mensagem) {
        alert("Por favor, preencha todos os campos.");
        e.preventDefault();
        return;
    }

    // Validação de e-mail
    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("E-mail inválido!");
        e.preventDefault();
        return;
    }
});

/* ==========================================================
   EFEITO DE DIGITAÇÃO NO NOME E SUBTÍTULO - SOBRE.HTML
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const nameElement = document.getElementById("typing-name");
    const subElement  = document.getElementById("typing-sub");

    // Executa apenas na página sobre.html
    if (!nameElement || !subElement) return;

    const nameText = nameElement.getAttribute("data-text");
    const subText  = subElement.getAttribute("data-text");

    let indexName = 0;
    let indexSub = 0;

    // Velocidade da digitação (ajuste aqui)
    const speedName = 100;  // 100ms por letra (digitação mais rápida)
    const speedSub  = 60;   // 60ms por letra (bem mais rápido)

    function typeName() {
        if (indexName < nameText.length) {
            nameElement.textContent += nameText.charAt(indexName);
            indexName++;
            setTimeout(typeName, speedName);
        } else {
            // Só inicia o subtítulo quando o nome terminar
            typeSub();
        }
    }

    function typeSub() {
        if (indexSub < subText.length) {
            subElement.textContent += subText.charAt(indexSub);
            indexSub++;
            setTimeout(typeSub, speedSub);
        }
    }

    typeName();
});

/* ==========================================================
   BOTÃO DE SETA PARA DESCER ATÉ A SEÇÃO SOBRE
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const scrollBtn = document.getElementById("scroll-down");
    const sobreCard = document.querySelector(".sobre-card");

    if (scrollBtn && sobreCard) {
        scrollBtn.addEventListener("click", () => {
            sobreCard.scrollIntoView({ behavior: "smooth" });
        });
    }
});

/* ==========================================================
   FUNDO ANIMADO – REDE NEURAL (LINHAS E NÓS)
   ========================================================== */

const canvas = document.getElementById("network-bg");
const ctx = canvas.getContext("2d");

let width, height;
let nodes = [];
const NODE_COUNT = 45;        // quantidade de nós
const MAX_DISTANCE = 150;     // distância máxima para desenhar linhas

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Criar nós aleatórios
function createNodes() {
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3
        });
    }
}

createNodes();

// Animação da rede
function animateNetwork() {
    ctx.clearRect(0, 0, width, height);

    // Cor dos elementos depende do tema
    let color = getComputedStyle(document.body).getPropertyValue("--primary-color").trim();

    // Desenhar linhas
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            let dx = nodes[i].x - nodes[j].x;
            let dy = nodes[i].y - nodes[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < MAX_DISTANCE) {
                ctx.strokeStyle = color + "55"; // transparência suave
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }
    }

    // Desenhar nós
    nodes.forEach(n => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2);
        ctx.fill();

        // movimento suave
        n.x += n.vx;
        n.y += n.vy;

        // evitar que saiam da tela
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
    });

    requestAnimationFrame(animateNetwork);
}

animateNetwork();

