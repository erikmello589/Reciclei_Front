document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio do formulário até a validação ser concluída
    let isValid = true;

    // Limpando todas as mensagens de erro
    document.querySelectorAll('.error-message').forEach(function (element) {
        element.textContent = '';
    });

    // Validação do nome completo (mínimo 15, máximo 80 caracteres alfabéticos)
    const name = document.getElementById('name').value;
    if (name.length < 15 || name.length > 80 || !/^[A-Za-z\s]+$/.test(name)) {
        document.getElementById('name-error').textContent = 'O nome deve ter entre 15 e 80 caracteres alfabéticos.';
        isValid = false;
    }

    // Validação do CPF (com dígito verificador)
    const cnpj = document.getElementById('cnpj').value;
    if (!validarCNPJ(cnpj)) {
        document.getElementById('cnpj-error').textContent = 'CNPJ inválido.';
        isValid = false;
    }

    // Validação do e-mail (campo obrigatório)
    const email = document.getElementById('email').value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('email-error').textContent = 'Formato de e-mail inválido.';
        isValid = false;
    }

   //validalção do celular (campo obrigatório)
   const cell = document.getElementById('cell').value;
   if (cell.trim() === "") {
       document.getElementById('cell-error').textContent = 'O celular completo é obrigatório.'
    }

    // Validação do endereço completo (campo obrigatório)
    const address = document.getElementById('enderess').value;
    if (address.trim() === "") {
        document.getElementById('enderess-error').textContent = 'O endereço completo é obrigatório.';
        isValid = false;
    }

    // Validação do login (exatamente 6 caracteres alfabéticos)
    const login = document.getElementById('login').value;
    if (login.length !== 6 || !/^[A-Za-z]+$/.test(login)) {
        document.getElementById('login-error').textContent = 'O login deve ter exatamente 6 caracteres alfabéticos.';
        isValid = false;
    }

    // Validação da senha (8 caracteres alfabéticos)
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirme_password').value;
    if (password.trim() === "") {
        document.getElementById('password-error').textContent = 'O campo de senha não pode estar vazio.';
        isValid = false;
    }

    // Validação da confirmação da senha (senhas devem ser iguais)
    if (password !== confirmPassword) {
        document.getElementById('confirm-password-error').textContent = 'As senhas não coincidem.';
        isValid = false;
    }

    // Se todas as validações passarem, exibe mensagem de sucesso
    if (isValid) {
        // Aqui você pode fazer o envio real do formulário
        // Exemplo: document.getElementById('form').submit();
        document.getElementById('form').addEventListener("submit", function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário
            
            // Obtém os valores do login e senha
            const username = document.getElementById("login").value;
            const password = document.getElementById("password").value;
            const name = document.getElementById("name").value;
            const cnpj = document.getElementById("cnpj").value;
            const email = document.getElementById("email").value;
            const telFix = document.getElementById("tel-fix").value;
            const cell = document.getElementById("cell").value;
            const enderess = document.getElementById("enderess").value;

            const newUser = {
                username: username,
                password: password,
                nomeEmpresa: name,
                cnpj: cnpj,
                email: email,
                telefone: telFix,
                celular: cell,
                cep: "12345-678",
                endereco: enderess,
                numeroEndereco: "123"
            };
            console.log(newUser)
            // Chama a função de register
            register(newUser);
        });
    }
});

// Função para validar o CNPJ (cálculo do dígito verificador)
function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove qualquer caractere que não seja número

    if (cnpj.length !== 14) return false;

    // Testa sequência de números repetidos
    if (/^(\d)\1+$/.test(cnpj)) return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    // Validação do primeiro dígito verificador
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) return false;

    tamanho++;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    // Validação do segundo dígito verificador
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) return false;

    return true;
}

async function register(userData) {
    const apiUrl = "http://localhost:8080/registerEmpresa";

    try {
        // Fazendo a requisição POST
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        // Processa a resposta da API
        if (!response.ok) {
            alert("ERRO");
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }


        console.log("Registro bem-sucedido");
        alert("Registro bem-sucedido");

        return;
    } catch (error) {
        console.error("Erro ao registrar:", error);
        alert("Ocorreu um erro ao tentar registrar. Tente novamente mais tarde.");
    }
}


$('#cnpj').mask('00.000.000/0001-00');
$('#tel-fix').mask('(00) 00000-0000');
$('#cell').mask('(00) 00000-0000');