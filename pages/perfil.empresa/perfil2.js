document.addEventListener('DOMContentLoaded', function() {
    const editBtn = document.getElementById('edit-btn');
    const profileForm = document.getElementById('profile-form');
    const inputs = profileForm.querySelectorAll('input');

    editBtn.addEventListener('click', function() {
        inputs.forEach(input => {
            input.disabled = !input.disabled; // Alterna entre habilitar/desabilitar
        });

        // Trocar o texto do botão de Editar para Cancelar
        if (editBtn.textContent === 'Editar') {
            editBtn.textContent = 'Cancelar';
        } else {
            editBtn.textContent = 'Editar';
        }
    });

    profileForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Previne o envio do formulário

        const updatedData = {};
        inputs.forEach(input => {
            updatedData[input.id] = input.value; // Armazena os dados atualizados
        });

        // Simulação de um envio de dados
        console.log('Dados atualizados:', updatedData);
        alert('Dados salvos com sucesso!');

        // Desabilita os campos novamente após salvar
        inputs.forEach(input => {
            input.disabled = true;
        });
        editBtn.textContent = 'Editar'; // Reinicia o botão para "Editar"
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

function editProfile() {
    window.location.href = "/pages/cadastro.empresa/index.html"; // Redireciona para o formulário de edição
}

function logout() {
    alert("Você saiu do sistema.");
    window.location.href = "/index.html"; // Redireciona para a página inicial ou de login
}

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