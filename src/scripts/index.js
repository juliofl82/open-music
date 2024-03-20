import { applyInputRangeStyle } from './inputRange.js';
import { fetchAlbums } from './api.js';

// Variáveis globais para armazenar o gênero selecionado e todos os álbuns
let selectedGenre = 'Todos';
let allAlbums = [];

// Aplica os estilos da função do inputRange.js
applyInputRangeStyle();

// Função para destacar o botão de gênero selecionado e aplicar filtros
function selectGenre(genre) {
  selectedGenre = genre;
  document.querySelectorAll('.filterByGenre_button').forEach(button => {
    button.classList.toggle('active', button.innerText === genre);
  });
  filterAndRenderAlbumsByPrice();
}

// Função para criar a estrutura HTML de um card de álbum
function createAlbumCard(album) {
  const albumCard = document.createElement('li');
  albumCard.classList.add('albunsCard');

  albumCard.innerHTML = `
    <img src="${album.img}" alt="Capa do álbum ${album.title}">
    <div class="albumTitle"><h3>${album.title}</h3></div>
    <div class="albumDetails"><p>${album.band}</p><p>${album.genre}</p></div>
    <div class="albumPricing"><p class="albumPrice">R$${album.price}</p><button class="buyButtons">Comprar</button></div>
  `;

  return albumCard;
}

// Função para renderizar os cards dos álbuns com base nos filtros aplicados
async function filterAndRenderAlbumsByPrice() {
  const priceValue = parseFloat(document.querySelector("#priceRange").value);
  const filteredAlbums = allAlbums.filter(album =>
    parseFloat(album.price) <= priceValue &&
    (selectedGenre === 'Todos' || album.genre === selectedGenre));
  renderAlbumCards(filteredAlbums);
}

// Função para adicionar os cards dos álbuns filtrados ao DOM
function renderAlbumCards(albumList) {
  const albumsGrid = document.querySelector('.albunsGrid');
  albumsGrid.innerHTML = ''; // Limpa o grid antes de adicionar novos cards

  albumList.forEach(album => {
    const albumCard = createAlbumCard(album);
    albumsGrid.appendChild(albumCard);
  });
}

// Função para configurar os ouvintes de eventos
function setupEventListeners() {
  document.querySelectorAll('.filterByGenre_button').forEach(button => {
    button.addEventListener('click', function () {
      selectGenre(this.innerText);
    });
  });

  document.querySelector("#priceRange").addEventListener("input", filterAndRenderAlbumsByPrice);
}
// Função inicial para buscar os álbuns da API e configurar a aplicação
async function initialize() {
  try {
    allAlbums = await fetchAlbums(); // Busca os álbuns da API
    setupEventListeners(); // Configura os ouvintes de eventos
    filterAndRenderAlbumsByPrice(); // Renderiza os álbuns inicialmente sem filtro de preço aplicado
  } catch (error) {
    console.error('Failed to fetch albums:', error);
  }
}

document.addEventListener('DOMContentLoaded', initialize);
