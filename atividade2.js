// Função para adicionar um produto ao carrinho
function adicionarProduto(id, nome, valor, quantidade) {
    // Obter os produtos do localStorage ou criar um novo array vazio
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    //CORREÇÃO PARA ADICIONAR CORRETAMENTE O PRODUTO
    let produto = carrinho.find(produto => produto.id === id);
    if (produto !== undefined) {
        produto.quantidade += quantidade;
    } else {
        // Adicionar o novo produto ao array
        carrinho.push({ id, nome, valor, quantidade });
    }

    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    exibirCarrinho();
}

//OUTRA FORMA DE ADICIONAR PRODUTO AO CARRINHO

//ARRASTANDO O CARD
function allowDrop(event) {
    event.preventDefault();
}

//SOLTANDO O CARD
function drop(event) {
    event.preventDefault();
    console.log('Drop evento chamado');
    
    // Verificar se o evento já foi processado
    if (event.dataTransfer.getData("application/json") === '') {
        return;
    }
    
    // Obtendo as informações do card arrastado
    const data = event.dataTransfer.getData("application/json");
    
    if (data) {
        const { id, nome, valor } = JSON.parse(data);
        // Adicionar o produto ao carrinho
        adicionarProduto(parseInt(id), nome, parseFloat(valor), 0.5);

        event.dataTransfer.setData("application/json", '');
    }
}

//IDENTIFICANDO O CARD E CHAMANDO A FUNÇÃO PRA ADICIONAR NO CARRINHO
function drag(event) {
    // Obtendo as informações do card
    const card = event.target.closest('.card');
    if (card) {
        const id = card.getAttribute('data-id');
        const nome = card.getAttribute('data-nome');
        const valor = card.getAttribute('data-valor');

        // Armazenando as informações no dataTransfer
        event.dataTransfer.setData("application/json", JSON.stringify({
            id: id,
            nome: nome,
            valor: valor
        }));

        console.log(`Iniciando arrasto: ID=${id}, Nome=${nome}, Valor=${valor}`);
    }
}

//GARANTINDO QUE TODOS CORRESPONDAM
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('dragstart', drag);
    card.setAttribute('draggable', 'true'); // Torna o card arrastável
});

const carrinhoBox = document.getElementById('carrinho-box');
carrinhoBox.addEventListener('dragover', allowDrop);
carrinhoBox.addEventListener('drop', drop);

// Função para remover um produto do carrinho
function removerProduto(id) {
    // Obter os produtos do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));

    // Filtrar os produtos, removendo o produto com o id especificado
    carrinho = carrinho.filter(produto => produto.id !== id);

    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    exibirCarrinho();
}

// Função para exibir os produtos do carrinho
function exibirCarrinho() {
    // Obter os produtos do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));

    // Verificar se o carrinho está vazio
    if (carrinho && carrinho.length > 0) {
        // Exibir os produtos em um elemento HTML (ajuste conforme sua estrutura HTML)
        const listaProdutos = document.getElementById('lista-produtos');
        listaProdutos.innerHTML = '';

        carrinho.forEach(produto => {
            const li = document.createElement('li');
            li.textContent = `${produto.nome} - Quantidade: ${produto.quantidade} - Valor: R$ ${(produto.valor * produto.quantidade).toFixed(2)}`;
            // Criar o botão de remover
            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            btnRemover.onclick = () => removerProduto(produto.id);

            // Adicionar o botão ao item da lista
            li.appendChild(btnRemover);
            listaProdutos.appendChild(li);
        });
    } else {
        // Exibir a mensagem de carrinho vazio
        const listaProdutos = document.getElementById('lista-produtos');
        listaProdutos.innerHTML = 'O carrinho está vazio!';
    }
}

// Inicialização da aplicação: verificar se há produtos no carrinho e exibi-los
exibirCarrinho();
