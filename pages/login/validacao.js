document.querySelector('form').addEventListener('submit', function(event) {
    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('login-error');
    const passwordError = document.getElementById('password-error');

    // Limpar mensagens de erro anteriores
    loginError.textContent = "";
    passwordError.textContent = "";

    let valid = true;

    // Validação de campo vazio - Login
    if (loginInput.value.trim() === "") {
        loginError.textContent = "O campo Login não pode estar vazio.";
        valid = false;
    }

    // Validação de tamanho máximo do Login
    if (loginInput.value.length > 6) {
        loginError.textContent = "O campo Login deve ter no máximo 6 caracteres.";
        valid = false;
    }

    // Validação de tamanho mínimo do Login
    if (loginInput.value.length < 3) {
        loginError.textContent = "O campo Login deve ter pelo menos 3 caracteres.";
        valid = false;
    }

    // Validação de campo vazio - Senha
    if (passwordInput.value.trim() === "") {
        passwordError.textContent = "O campo Senha não pode estar vazio.";
        valid = false;
    }

    // Validação de tamanho mínimo da Senha
    if (passwordInput.value.length < 3) {
        passwordError.textContent = "A senha deve ter pelo menos 3 caracteres.";
        valid = false;
    }

    // Se houver erro, impedir o envio do formulário
    if (!valid) {
        event.preventDefault();
    } else {
        alert('Cadastro realizado com sucesso!');
        // Aqui você pode fazer o envio real do formulário
        document.querySelector('form').addEventListener("submit", function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário
            
            // Obtém os valores do login e senha
            const username = document.getElementById("login").value;
            const password = document.getElementById("password").value;
            
            // Chama a função de login
            login(username, password);
        });
    }
});

async function login(username, password) {
    const url = "http://localhost:8080/login"; // Substitua pela URL da sua API

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (!response.ok) {
            console.log("erro na requisição");
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);

        // Verifica se o accessToken e expiresIn estão na resposta
        if (data.accessToken && data.expiresIn) {
            // Armazena no localStorage
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("expiresIn", data.expiresIn);
            console.log("Token armazenado com sucesso!");
            alert("Login Realizado com sucesso, redirecionando para o mapa")
        } else {
            throw new Error("Dados de autenticação ausentes na resposta.");
        }
    } catch (error) {
        console.error("Erro ao fazer login:", error);
    }
}