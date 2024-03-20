// import {fetchAlbums} from "./api.js";

// const albums = await fetchAlbums();
// console.log(albums);



// A função para selecionar um gênero e destacar o botão correspondente
function selectGenre(selectedButton) {
    // Encontra todos os botões na lista
    const buttons = document.querySelectorAll('.filterByGenre_button');

    // Remove a classe 'active' de todos os botões
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Adiciona a classe 'active' ao botão que foi clicado
    selectedButton.classList.add('active');
}

// Adiciona o evento de clique a todos os botões
document.querySelectorAll('.filterByGenre_button').forEach(button => {
    button.addEventListener('click', function() {
        selectGenre(this);
    });
});




