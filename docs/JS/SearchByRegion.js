const selectRegion = document.getElementById('select-regions');

// Por cada region encontrada se crea un Select con dichas opciones
// Las variable "regions" es creada y asignada su valor en la funcion de RenderCard()
regions.forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    
    selectRegion.appendChild(option);
});

selectRegion.addEventListener('change', () => {
    const selectedRegion = selectRegion.value; // Obtener la región seleccionada
    DisplayCountries(null, selectedRegion); // Filtra por región
    localStorage.setItem('FilterRegion', selectedRegion);
});

// Evento para cargar la última busqueda
window.addEventListener('DOMContentLoaded', ()=>{
    selectRegion.value = localStorage.FilterRegion;
    DisplayCountries(null, localStorage.FilterRegion)
})