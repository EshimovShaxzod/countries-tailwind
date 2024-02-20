let elModeBtn = document.querySelector(".mode-btn");
let elModeIcon = document.querySelector(".mode-icon");


elModeBtn.addEventListener("click", () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        localStorage.theme = 'light'
        document.documentElement.classList.remove('dark');
        elModeIcon.src = "../images/sun.svg"
    } else {
        localStorage.theme = 'dark'
        document.documentElement.classList.add('dark');
        elModeIcon.src = "../images/moon.svg"
      }      
})
localStorage.removeItem('theme')