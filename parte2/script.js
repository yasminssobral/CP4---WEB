// Criando a base de dados de filmes  
const filmes = [
  {
    id: 0,
    nome: 'Harry Potter',
    genero: 'fantasia',
    lancamento: 2001
  },
  {
    id: 1,
    nome: 'Avatar',
    genero: 'fantasia',
    lancamento: 2010
  },
  {
    id: 2,
    nome: 'O senhor dos Anéis',
    genero: 'fantasia',
    lancamento: 2000,
  },
  {
    id: 3,
    nome: 'Branquelas',
    genero: 'comédia',
    lancamento: 2007
  },
  {
    id: 4,
    nome: 'A Lagoa Azul',
    genero: 'romance',
    lancamento: 1983
  }
]

// Criando um array de filmes favoritos
let filmesFavoritos = [];

// Pegando Elementos HTML
const btn1 = document.querySelector('button'); // Botão para adicionar filmes
const listaFilmes = document.querySelector('#listaFilmes'); // Lista de filmes

// Função para carregar filmes favoritos do localStorage
const carregarFavoritos = () => {
  if (localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  }
}

// Função para renderizar filmes na tela
const renderizarLista = () => {
  // Limpa a tela antes de renderizar
  listaFilmes.innerHTML = "";

  // Carregar filmes favoritos
  carregarFavoritos();

  // Percorre o array de filmes, inserindo um li com o nome do filme a cada volta do loop
  filmes.forEach((filme) => {
    const itemLista = document.createElement('li');
    itemLista.innerHTML = `Meu filme ${filme.nome}`;
    
    // Cria uma nova imagem
    const favorito = document.createElement('img');
    favorito.src = filmesFavoritos.some(fav => fav.id === filme.id) ? 'img/heart-fill.svg' : 'img/heart.svg';
    favorito.style.cursor = 'pointer';

    // Adiciona evento de clique à imagem
    favorito.addEventListener('click', (e) => {
      favoritoClicado(e, filme);
    });

    // Adiciona o li e a imagem ao elemento listaFilmes
    itemLista.append(favorito);
    listaFilmes.append(itemLista);
  });
}


btn1.addEventListener('click', () => {
  // Pega o input onde o usuário digita o filme
  const inputUsuario = document.querySelector('#filmeInput');
  // Adiciona um id ao filme considerando que o tamanho do array será sempre um a mais que seu index
  let id = filmes.length;
  // Adiciona o valor à propriedade nome do objeto dentro do array filmes
  filmes.push({ id: id, nome: inputUsuario.value, genero: '', lancamento: '' });
  console.log(filmes);
  // Renderiza a lista novamente
  renderizarLista();
  // Apaga o campo de digitação
  inputUsuario.value = '';
});

// botão de favorito
const favoritoClicado = (eventoDeClique, objetoFilme) => {
  const favoriteState = {
    favorited: 'img/heart-fill.svg',
    notFavorited: 'img/heart.svg'
  };

  if (eventoDeClique.target.src.includes(favoriteState.notFavorited)) {
    eventoDeClique.target.src = favoriteState.favorited;
    saveToLocalStorage(objetoFilme);
  } else {
    eventoDeClique.target.src = favoriteState.notFavorited;
    removeFromLocalStorage(objetoFilme.id);
  }
}

// salvar o filme no localStorage
const saveToLocalStorage = (objetoFilme) => {
  if (localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  }
  filmesFavoritos.push(objetoFilme);
  const moviesJSON = JSON.stringify(filmesFavoritos);
  localStorage.setItem('favoritos', moviesJSON);
}

// remover o filme no localStorage
function removeFromLocalStorage(id) {
  if (localStorage.getItem('favoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
  }
  filmesFavoritos = filmesFavoritos.filter(movie => movie.id !== id);
  const filmesFiltradosJSON = JSON.stringify(filmesFavoritos);
  localStorage.setItem('favoritos', filmesFiltradosJSON);
}

// executa a função que renderiza os elementos na tela
window.onload = () => {
  renderizarLista();
}
