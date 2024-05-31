/***************************************************************************      
* Ultima alteração: 31/05/2024
* Autor: Gustavo Willians, Leonardo Vinicius e Diogo Gomes
* Versão: 1.1
****************************************************************************/


document.getElementById("button").addEventListener("click", function (event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    fetch('https://back-login.vercel.app/usuarios')
        .then(response => response.json())
        .then(data => {
            const user = data.find(u => u.nome === username && u.senha === password);
            if (user) {
                // Salva o token de login e o nome de usuário no localStorage
                localStorage.setItem('token', user.token);
                localStorage.setItem('username', user.nome);
                alert("Login bem-sucedido! Você será redirecionado para a página de registro do animal.");
                window.location.href = "../admin/index.html";
            } else {
                alert("Nome de usuário ou senha inválidos.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.getElementById("criarContaButton").addEventListener("click", function () {
    window.location.href = "../criar_conta/index.html";
});
