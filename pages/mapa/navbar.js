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