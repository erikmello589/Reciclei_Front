const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.classList.add(`${currentTheme}-theme`);

    themeToggle.onclick = function() {
        if (document.documentElement.classList.contains('dark-theme')) {
            document.documentElement.classList.remove('dark-theme');
            document.documentElement.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.classList.replace('bx-moon', 'bx-sun');
        } else {
            document.documentElement.classList.remove('light-theme');
            document.documentElement.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            themeToggle.classList.replace('bx-sun', 'bx-moon');
        }
    };

    if (currentTheme === 'light') {
        themeToggle.classList.replace('bx-moon', 'bx-sun');
    }

    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    let fontSize = 10; 

   
    zoomInBtn.addEventListener('click', () => {
        if (fontSize < 20) { 
            fontSize += 1;
            document.documentElement.style.fontSize = fontSize + 'px';
        }
    });

    
    zoomOutBtn.addEventListener('click', () => {
        if (fontSize > 8) { 
            fontSize -= 1;
            document.documentElement.style.fontSize = fontSize + 'px';
        }
    });
    

const menuToggle = document.getElementById('menu-toggle');
const navbar = document.querySelector('.navbar');
const navbarLinks = document.querySelectorAll('.navbar a');


menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
});


navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const mapaLink = document.getElementById('mape'); // Seleciona o link do mapa

    mapaLink.addEventListener("click", function (event) {
        event.preventDefault(); // Impede o redirecionamento imediato

        const accessToken = localStorage.getItem("acessToken");
        const expiresIn = localStorage.getItem("expiresIn");

        if (accessToken && expiresIn) {
            // Redireciona para a página do mapa
            window.location.href = "pages/mapa/endmapa.html";
        } else {
            // Exibe alerta caso o usuário não esteja autorizado
            alert("Você não está autorizado a acessar essa página. Faça o Login ou Crie uma conta.");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const mapaLink = document.getElementById('recicleJa'); // Seleciona o link do mapa

    mapaLink.addEventListener("click", function (event) {
        event.preventDefault(); // Impede o redirecionamento imediato

        const accessToken = localStorage.getItem("acessToken");
        const expiresIn = localStorage.getItem("expiresIn");

        if (accessToken && expiresIn) {
            // Redireciona para a página do mapa
            window.location.href = "pages/mapa/endmapa.html";
        } else {
            // Exibe alerta caso o usuário não esteja autorizado
            alert("Você não está autorizado a acessar essa página. Faça o Login ou Crie uma conta.");
            setTimeout(window.location.href = "pages/login/login.html", 500)
        }
    });
});


// Link de Login
document.addEventListener("DOMContentLoaded", function () {
    const loginLink = document.querySelector('a.login1');

    // Função para atualizar o texto do link
    function updateLoginLink() {
        const accessToken = localStorage.getItem("acessToken");
        const expiresIn = localStorage.getItem("expiresIn");

        if (accessToken && expiresIn) {
            // Usuário autenticado
            loginLink.textContent = "Sair da conta";
            loginLink.addEventListener("click", handleLogout);
        } else {
            // Usuário não autenticado
            loginLink.textContent = "Login";
            loginLink.addEventListener("click", handleLogin);
        }
    }

    // Função para redirecionar para a página de login
    function handleLogin(event) {
        event.preventDefault();
        window.location.href = "pages/login/login.html";
    }

    // Função para fazer logout
    function handleLogout(event) {
        event.preventDefault();
        localStorage.removeItem("acessToken");
        localStorage.removeItem("expiresIn");
        alert("Você saiu da conta.");
        // Atualiza o link após logout
        updateLoginLink();
    }

    // Inicializa o estado do link de login
    updateLoginLink();
});