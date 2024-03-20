document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.querySelector('#theme-toggle-button');
    const themeIcon = document.querySelector('#theme-icon');
  
    // Verifica a preferência de tema salva ao carregar a página
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    if (currentTheme) {
      document.documentElement.setAttribute('data-theme', currentTheme);
  
      if (currentTheme === 'dark') {
        themeIcon.src = './src/assets/icons/sun-icon.svg'; 
      }
    }
  
    themeToggleButton.addEventListener('click', () => {
      const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
  
      // Altera o ícone dependendo do tema
      if (theme === 'dark') {
        themeIcon.src = './src/assets/icons/sun-icon.svg';
      } else {
        themeIcon.src = './src/assets/icons/moon-icon.svg';
      }
    });
  });
  