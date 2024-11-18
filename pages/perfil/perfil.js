document.addEventListener("DOMContentLoaded", function() {
    const profileForm = document.getElementById('profileForm');
    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    const inputs = profileForm.querySelectorAll('input');

    // Habilita os campos para edição ao clicar no botão "Editar"
    editBtn.addEventListener('click', () => {
        inputs.forEach(input => {
            input.disabled = false;  // Ativa os campos de entrada
        });
        editBtn.style.display = 'none';  // Esconde o botão de editar
        saveBtn.style.display = 'block';  // Mostra o botão de salvar
    });

    // Função para lidar com o envio do formulário
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();  // Impede o envio padrão do formulário
        inputs.forEach(input => {
            input.disabled = true;  // Desativa os campos após salvar
        });
        saveBtn.style.display = 'none';  // Esconde o botão de salvar
        editBtn.style.display = 'block';  // Mostra o botão de editar
        alert("Dados salvos com sucesso!");  // Mensagem de confirmação
    });
});

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