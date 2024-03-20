import { applyInputRangeStyle } from './inputRange.js';
import { fetchAlbums } from './api.js';

// Aplica estilos personalizados ao input range
applyInputRangeStyle();

// Função inicial chamada quando o DOM estiver completamente carregado
async function initialize() {
    try {
        // Busca os álbuns da API e renderiza na página
        const albums = await fetchAlbums();
        renderAlbumCards(albums);
        // Configura ouvintes de eventos para filtragem e seleção de gênero
        setupEventListeners(albums);
    } catch (error) {
        console.error('Failed to fetch albums:', error);
    }
}

// Configura os ouvintes de eventos para interações do usuário
function setupEventListeners(albums) {
    // Adiciona evento de clique nos botões de gênero para ativar a seleção
    document.querySelectorAll('.filterByGenre_button').forEach(button => {
        button.addEventListener('click', function() {
            selectGenre(this);
        });
    });

    // Configura o ouvinte de eventos no input range para filtrar os álbuns por preço
    const priceRangeInput = document.querySelector("#priceRange");
    priceRangeInput.addEventListener("input", () => filterAndRenderAlbumsByPrice(albums, parseFloat(priceRangeInput.value)));
}

// Filtra e renderiza álbuns baseado no valor do input range
function filterAndRenderAlbumsByPrice(albums, priceValue) {
    const filteredAlbums = albums.filter(album => parseFloat(album.price) <= priceValue);
    renderAlbumCards(filteredAlbums);
}

// Renderiza os cards de álbuns na página
function renderAlbumCards(albumList) {
    const albumsGrid = document.querySelector('.albunsGrid');
    albumsGrid.innerHTML = ''; // Limpa o grid antes de adicionar novos cards

    albumList.forEach(album => {
        const albumCard = createAlbumCard(album);
        albumsGrid.appendChild(albumCard);
    });
}

// Cria a estrutura HTML de um card de álbum
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

// Destaca o botão de gênero selecionado pelo usuário
function selectGenre(selectedButton) {
    const buttons = document.querySelectorAll('.filterByGenre_button');

    buttons.forEach(button => {
        button.classList.remove('active');
    });
    selectedButton.classList.add('active');
}

// Chamada inicial quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initialize);









