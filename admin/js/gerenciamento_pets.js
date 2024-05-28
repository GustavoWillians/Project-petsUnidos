/***************************************************************************      
* Objetivo: Realizar a manipulação de dados GET, POST, PUT e DELETE
* em uma API de pets
* Data: 28/05/2024
* Autor: Gustavo, Leonardo e Diogo
* Versão: 1.1
****************************************************************************/

/// Recebe o botão de salvar HTML
const botaoSalvar = document.getElementById('Salvar');


// Função para salvar pets na API (inserir ou atualizar)
const postPets = async function () {
    // URL para realizar a requisição POST (inserir) ou PUT (atualizar)
    let url = 'https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/novo/pet';
    let method = 'POST'; // Método padrão é POST (inserir)

    // Se estivermos em modo de edição, usaremos o método PUT (atualizar) e adicionaremos o ID do pet à URL
    if (petEditId) {
        url = `https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/atualizar/pet/${petEditId}`;
        method = 'PUT';
    }

    // Recebe os dados digitados no formulário
    let nome = document.getElementById('nome').value;
    let cor = document.getElementById('cor').value;
    let foto = document.getElementById('image').value;
    let raca = document.getElementById('raca').value;

    // Verifica se algum campo obrigatório está vazio
    if (!nome || !cor || !foto || !raca) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Cria um objeto do tipo JSON
    let petsJSON = {
        nome: nome,
        cor: cor,
        image: foto,
        raca: raca
    };

    // Realiza a requisição na API para enviar os dados a serem salvos
    try {
        const response = await fetch(url, {
            method: method, // Usa o método definido (POST ou PUT)
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(petsJSON)
        });

        if (response.status === 201 || response.status === 200) {
            alert('Registro inserido/atualizado com sucesso.');
            // Limpa o ID do pet em modo de edição
            petEditId = null;
            // Atualiza a lista de pets após inserção/atualização
            getAPIPets();
            // Reseta o formulário após a operação
            document.getElementById('form').reset();
            // Restaura o texto padrão do botão "Salvar"
            document.getElementById('Salvar').innerText = 'Salvar';
        } else {
            alert('Não foi possível realizar a requisição. Status da resposta: ' + response.status);
        }
    } catch (error) {
        console.error('Erro ao tentar fazer a requisição:', error);
        alert('Ocorreu um erro ao tentar fazer a requisição. Verifique o console para mais detalhes.');
    }
};

// Função para receber todos os pets da API
const getAPIPets = async function () {
    // Link da API para retornar todos os pets
    let url = 'https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/listar/pets';

    // Realiza a requisição na API para obter os pets
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.status === 200) {
            // Atualiza a lista de pets no HTML
            setListDados(data);
        } else {
            alert('A API não retornou dados ou está fora do ar.');
        }
    } catch (error) {
        console.error('Erro ao tentar obter pets:', error);
        alert('Ocorreu um erro ao tentar obter os pets. Por favor, tente novamente mais tarde.');
    }
};

// Função para criar a lista de pets no HTML
const setListDados = function (dadosPets) {
    let divListDados = document.getElementById('listDados');
    divListDados.innerHTML = ''; // Limpa a lista antes de preenchê-la novamente

    dadosPets.pets.forEach(function (pet) {
        let divDados = document.createElement('div');
        let divNome = document.createElement('div');
        let divCor = document.createElement('div');
        let divRaca = document.createElement('div');
        let divOptions = document.createElement('div');
        let spanEditar = document.createElement('span');
        let spanExcluir = document.createElement('span');

        let textNome = document.createTextNode(pet.nome);
        let textCor = document.createTextNode(pet.cor);
        let textRaca = document.createTextNode(pet.raca);
        let textEditar = document.createTextNode('Editar');
        let textExcluir = document.createTextNode('Excluir');

        divDados.setAttribute('id', `pet-${pet.id}`); // Adiciona um ID único para cada div de pet
        divDados.setAttribute('class', 'linha dados');

        spanExcluir.setAttribute('class', 'excluir');
        spanExcluir.setAttribute('idpet', pet.id);

        divListDados.appendChild(divDados);

        divDados.appendChild(divNome);
        divDados.appendChild(divCor);
        divDados.appendChild(divRaca);
        divDados.appendChild(divOptions);

        divOptions.appendChild(spanEditar);
        divOptions.appendChild(spanExcluir);

        divNome.appendChild(textNome);
        divCor.appendChild(textCor);
        divRaca.appendChild(textRaca);
        spanEditar.appendChild(textEditar);
        spanExcluir.appendChild(textExcluir);

        spanExcluir.addEventListener('click', function () {
            deletePet(spanExcluir.getAttribute('idpet'));
        });

        spanEditar.addEventListener('click', function () {
            editPet(pet.id); // Chama a função editPet passando o ID do pet como argumento
        });
    });
};

const deletePet = async function (id) {
    let url = `https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/excluir/pet/${id}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (response.status === 200) {
            alert('Pet excluído com sucesso.');
            // Atualiza a lista de pets após exclusão
            getAPIPets();
        } else {
            alert('Pet não encontrado ou problemas na API.');
        }
    } catch (error) {
        console.error('Erro ao tentar excluir pet:', error);
        alert('Ocorreu um erro ao tentar excluir o pet. Por favor, tente novamente mais tarde.');
    }
};

// Variável global para armazenar o ID do pet em modo de edição
let petEditId = null;

const editPet = async function (id) {
    petEditId = id; // Armazena o ID do pet em modo de edição
    let url = `https://projeto-integrado-avaliacao.azurewebsites.net/projeto3/fecaf/buscar/pet/${id}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.status === 200) {
            // Exibe uma mensagem nos campos do formulário com os dados antigos do pet
            document.getElementById('nome').placeholder = `Escreva o nome nome aqui `;
            document.getElementById('cor').placeholder = `Escreva a nova cor aqui `;
            document.getElementById('image').placeholder = `Coloque a nova imagem aqui  `;
            document.getElementById('raca').placeholder = `Coloque a nova raça aqui`;

            // Muda o texto do botão "Salvar" para refletir que estamos em modo de edição
            document.getElementById('Salvar').innerText = 'Atualizar';
        } else {
            alert('Pet não encontrado ou problemas na API.');
        }
    } catch (error) {
        console.error('Erro ao tentar obter dados do pet:', error);
        alert('Ocorreu um erro ao tentar obter os dados do pet. Verifique o console para mais detalhes.');
    }
};




// Adiciona um evento de clique no botão de Salvar
botaoSalvar.addEventListener('click', function () {
    postPets();
});

// Carrega a lista de pets ao carregar a página
window.addEventListener('load', function () {
    getAPIPets();
});

document.addEventListener("DOMContentLoaded", function() {
    const portalPetsBtn = document.getElementById('portalPetsBtn');

    portalPetsBtn.addEventListener('click', function() {
        window.location.href = '../Projeto_pets/petsPortal.html';
    });
});