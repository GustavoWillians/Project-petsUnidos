/***************************************************************************      
* Ultima alteração: 31/05/2024
* Autor: Gustavo Willians, Leonardo Vinicius e Diogo Gomes
* Versão: 1.1
****************************************************************************/

// Função para criar os cards com os dados recebidos da API
const criarCards = function(dados) {
    let divCardProdutos = document.getElementById('cardProdutos');
    let divCarouselInner = document.querySelector('.carousel-inner');

    // Limpa o conteúdo existente antes de adicionar os novos dados
    divCardProdutos.innerHTML = '';
    divCarouselInner.innerHTML = '';

    // Criação dos cards de produtos
    dados.pets.forEach(function(itemPet, index) {
        let divCaixaProduto = document.createElement('div');
        let h2CaixaTitulo = document.createElement('h2');
        let textTitulo = document.createTextNode('Nome: ' + itemPet.nome);
        let figureCaixaImagem = document.createElement('figure');
        let img = document.createElement('img');
        let divCaixaTexto = document.createElement('div');

        let pCor = document.createElement('p');
        let pRaca = document.createElement('p');

        let textCor = document.createTextNode('Cor: ' + itemPet.cor);
        let textRaca = document.createTextNode('Raça: ' + itemPet.raca);

        divCaixaProduto.setAttribute('class', 'caixa_produto');
        h2CaixaTitulo.setAttribute('class', 'caixa_titulo');
        figureCaixaImagem.setAttribute('class', 'caixa_imagem');
        img.setAttribute('src', itemPet.image);
        divCaixaTexto.setAttribute('class', 'caixa_texto');

        divCardProdutos.appendChild(divCaixaProduto);
        divCaixaProduto.appendChild(h2CaixaTitulo);
        h2CaixaTitulo.appendChild(textTitulo);
        divCaixaProduto.appendChild(figureCaixaImagem);
        figureCaixaImagem.appendChild(img);
        divCaixaProduto.appendChild(divCaixaTexto);

        divCaixaTexto.appendChild(pCor);
        divCaixaTexto.appendChild(pRaca);

        pCor.appendChild(textCor);
        pRaca.appendChild(textRaca);
    });

    // Criação dos slides do carrossel
    dados.pets.forEach(function(itemPet, index) {
        let divCarouselItem = document.createElement('div');
        let imgCarousel = document.createElement('img');

        divCarouselItem.classList.add('carousel-item');
        if (index === 0) {
            divCarouselItem.classList.add('active');
        }

        imgCarousel.classList.add('d-block');
        imgCarousel.classList.add('w-100');
        imgCarousel.src = itemPet.image;
        imgCarousel.alt = 'Slide ' + (index + 1);

        divCarouselItem.appendChild(imgCarousel);
        divCarouselInner.appendChild(divCarouselItem);
    });
};


// Função para realizar a requisição na API de Pets
const getAPIPets = async function() {
    let url = 'https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/listar/pets';

    const response = await fetch(url);
    const dadosPets = await response.json();

    criarCards(dadosPets);
};

// Adiciona um ouvinte de evento para quando a página terminar de carregar
window.addEventListener('load', function() {
    getAPIPets();
});

// Adiciona um ouvinte de evento para quando a página terminar de carregar
window.addEventListener('load', function() {
    // Obtém o elemento de menu "Login"
    const loginMenu = document.getElementById('login');

    // Adiciona um evento de clique ao elemento de menu "Login"
    loginMenu.addEventListener('click', function() {
        // Redireciona o navegador para a página de login
        window.location.href = './login/index.html';
    });
    
    // Chama a função para carregar os dados dos pets da API
    getAPIPets();
});

// Função para verificar se o usuário está logado
function verificarLogin() {
    // Verifica se há um token de autenticação no armazenamento local
    const token = localStorage.getItem('token');

    // Se existir um token, consideramos o usuário como logado
    if (token) {
        return true;
    } else {
        return false;
    }
}

// Adiciona um ouvinte de evento para quando a página terminar de carregar
window.addEventListener('load', function() {
    // Obtém o elemento do menu "Login"
    const loginMenu = document.getElementById('login');
    // Obtém o elemento do menu "Logoff"
    const logoffMenu = document.getElementById('logoff');
    // Obtém o elemento da mensagem de boas-vindas
    const mensagemBoasVindas = document.getElementById('mensagemBoasVindas');

    // Verifica se o usuário está logado
    if (verificarLogin()) {
        // Altera o texto do botão para "Editar"
        loginMenu.textContent = 'Editar';
        // Mostra o botão de logoff
        logoffMenu.style.display = 'block';

        // Obtém o nome de usuário armazenado no localStorage
        const nomeUsuario = localStorage.getItem('username');

        // Exibe a mensagem de boas-vindas com o nome do usuário
        mensagemBoasVindas.textContent = 'Bem-vindo, ' + nomeUsuario + '!';
        // Exibe a mensagem de boas-vindas
        mensagemBoasVindas.style.display = 'block';

        // Adiciona um evento de clique ao elemento de menu "Editar"
        loginMenu.addEventListener('click', function() {
            // Redireciona o navegador para a página de administração
            window.location.href = './admin/index.html';
        });

        // Adiciona um evento de clique ao botão de logoff
        logoffMenu.addEventListener('click', function() {
            // Remove o token de login e o nome de usuário do localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            // Redireciona o navegador de volta para a página de login
            window.location.href = './login/index.html';
        });
    }
});


