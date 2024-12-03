const btnSearch = document.getElementById('btn-search');
const inputSearch = document.getElementById('input-search') ;

btnSearch.addEventListener('click', ()=> {
    const filter = inputSearch.value.trim();
    DisplayCountries(filter)
});

inputSearch.addEventListener('keydown', (event)=>{
    if(event.key == 'Enter'){
        event.preventDefault(); // Evitar el "envio" (para que no se recargue la pagina)
        const filter = inputSearch.value.trim();
        DisplayCountries(filter); 
    }
});