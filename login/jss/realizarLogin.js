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
                alert("Login successful! You will be redirected to the animal registration page.");
                window.location.href = "../admin/index.html";
            } else {
                alert("Invalid username or password.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.getElementById("criarContaButton").addEventListener("click", function () {
    window.location.href = "../criar_conta/index.html";
});
