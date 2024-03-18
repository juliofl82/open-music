// Definindo a função assíncrona para fazer a chamada à API
async function fetchAlbums() {
    try {
      // Realizando a requisição GET à API
      const response = await fetch('https://openmusic-fake-api.onrender.com/api/musics');
  
      // Verificando se a requisição foi bem-sucedida
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Convertendo a resposta para JSON
      const data = await response.json();
  
      // Retornando os dados obtidos
      return data;
    } catch (error) {
      // Tratando qualquer erro que possa ocorrer durante a requisição ou conversão dos dados
      console.error("Could not fetch the albums:", error);
    }
  }
  
  // Expondo a função fetchAlbums para que possa ser importada ou utilizada em outro lugar
  export { fetchAlbums };
  