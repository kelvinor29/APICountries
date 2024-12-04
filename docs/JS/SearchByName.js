const btnSearch = document.getElementById('btn-search');
const inputSearch = document.getElementById('input-search') ;

btnSearch.addEventListener('click', ()=> {
    filterCountries();
});

inputSearch.addEventListener('keydown', (event)=>{
    if(event.key == 'Enter'){
        event.preventDefault(); // Evitar el "envio" (para que no se recargue la pagina)
        filterCountries();
    }
});

function filterCountries(){
    const filter = inputSearch.value.trim();
    localStorage.setItem('FilterName', filter)
    DisplayCountries(filter);
}

// Evento para cargar la última busqueda
window.addEventListener('DOMContentLoaded', ()=>{
    inputSearch.value = localStorage.FilterName;
    DisplayCountries(localStorage.FilterName)
})