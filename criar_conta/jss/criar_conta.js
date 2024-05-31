/***************************************************************************      
* Ultima alteração: 31/05/2024
* Autor: Gustavo Willians, Leonardo Vinicius e Diogo Gomes
* Versão: 1.1
****************************************************************************/


document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir o envio do formulário normalmente

    // Obter dados do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Preparar dados para enviar
    const data = {
        nome: name,
        email: email,
        senha: password
    };

    // Enviar dados para a API
    fetch('https://back-login.vercel.app/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Resposta da rede não está OK');
        }
        return response.json();
    })
    .then(data => {
        // Lidar com a resposta bem-sucedida
        console.log('Cadastro realizado com sucesso:', data);
        alert('Cadastro realizado com sucesso!');
    })
    .catch(error => {
        // Lidar com o erro
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao cadastrar. Por favor, tente novamente.');
    });
});

document.getElementById('voltarBtn').addEventListener('click', function() {
    window.location.href = '../login/index.html';
});