// Funcion para buscar los paises y mostrarlos
async function DisplayCountries(filter){ // Recibe el nombre del pais
    try {
        const countriesList = await RequestDataJSON();

        // Validar si se solicita un filtrado o no para mostrarlos
        if(filter == undefined) {
            RenderCard(countriesList);
        }
        else{
            const countriesFiltered = countriesList.filter(country => (country.name.common.toUpperCase()).startsWith(filter.toUpperCase()));

            RenderCard(countriesFiltered);
        }

    } catch (error) {
        console.log(`Error displaying country's data: `, error);
    }
}

// Funcion para la renderizacion de la carta junto a los datos de cada uno
function RenderCard(countriesList){

    const templateCard = document.getElementById('template-country');
    const countriesContainer = document.getElementById('countries-list');


    countriesList.forEach(country => {

        // Clonación
        const cardClone = templateCard.content.cloneNode(true);
        
        // Contenido
        cardClone.getElementById('country-name').textContent = country.name.common;
        
        cardClone.getElementById('country-offName').textContent = country.name.official;
        cardClone.getElementById('country-detail').textContent = country.region;
        
        const countryCard = cardClone.querySelector('.cardC')

        // Modal
        countryCard.addEventListener('click', () =>{
            
            // Modal
            const modalCountry = new bootstrap.Modal(document.getElementById('modalCard'));
            const modalTitle = document.getElementById('modalLabel');
        
            modalTitle.textContent = `#${country.name.common}`;
        
            
            modalCountry.show();

        });

        countriesContainer.appendChild(cardClone);

    });
}

DisplayCountries();