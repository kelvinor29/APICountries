if(!localStorage.FilterName){
    localStorage.setItem('FilterName', '')
}
if(!localStorage.FilterRegion){
    localStorage.setItem('FilterRegion', '')
}

// Funcion para buscar los paises y mostrarlos
async function DisplayCountries(filterName = null, filterRegion = null){ // Recibe el nombre del pais y/o la región
    try {
        let countriesList = await RequestDataJSON();
        
        // Validar si al llamado de la funcion se le recibe el argumento de filtrado por nombre
        if(filterName){
            countriesList = countriesList.filter(country => 
                (country.name.common.toUpperCase())
                .startsWith(filterName.toUpperCase()));

            console.log('Filtrado por nombre');
        }

        if(filterRegion){
            countriesList = countriesList.filter(country => (country.region).includes(filterRegion));
            console.log('Filtrado por región');
        }

        RenderCard(countriesList);    

    } catch (error) {
        console.log(`Error displaying country's data: `, error);
    }
}

let regions = [];
// Funcion para la renderizacion de la carta junto a los datos de cada uno
function RenderCard(countriesList){

    const templateCard = document.getElementById('template-country');
    const countriesContainer = document.getElementById('countries-list');
    
    countriesContainer.innerHTML = '';
    regions = [];

    countriesList.forEach(country => {

        // Clonación
        const cardClone = templateCard.content.cloneNode(true);
        
        // Contenido
        cardClone.getElementById('country-name').textContent = country.name.common;
        
        cardClone.getElementById('country-offName').textContent = country.name.official;
        cardClone.getElementById('country-detail').textContent = country.region;

        // Modal
        cardClone.getElementById('country-info').addEventListener('click', () =>{
            ShowModal(country);
        });

        countriesContainer.appendChild(cardClone);

        regions.push(String(country.region));

    });

    regions = [...new Set(regions)];

}   

function ShowModal(country){
    // Modal
    const modalCountry = new bootstrap.Modal(document.getElementById('modalCard'));

    const modalTitle = document.getElementById('modalLabel');
    const countryOffName = document.getElementById('modal-offName');
    const countryFlag = document.getElementById('modal-flag');
    const countryCapital = document.getElementById('country-capital');
    const countryRegion = document.getElementById('country-region');
    const countryContinents = document.getElementById('country-continent');
    const countryPopulation = document.getElementById('country-population');
    const countryTranslateOff = document.getElementById('country-translateOff');
    const countryTranslateName = document.getElementById('country-translateName');

    const cardContainer = document.getElementById('card-container');
    const containerLanguages = document.getElementById('container-languages');

    // Monedas
    // Validar si el país tiene alguna moneda
    if(country.currencies != undefined){

        let currencies = Object.values(country.currencies);

        cardContainer.innerHTML = '';

        // Creacion de la carta por cada moneda existente
        currencies.forEach(currency => {
            const t_littleCard = document.getElementById('template-little-card');
            
            const cardClone = t_littleCard.content.cloneNode(true);
            cardClone.getElementById('currency-symbol').textContent = `Símbolo: ${currency.symbol}`;
            cardClone.getElementById('currency-name').textContent = `Nombre: ${currency.name}`;
            
            cardContainer.appendChild(cardClone);
        });

    }
    else{
        cardContainer.textContent = 'El país no tiene ninguna moneda.';
    }

    // Lenguajes que se usa en el país
    if(country.languages != undefined){

        let languages = Object.values(country.languages);
        
        containerLanguages.innerHTML = '';

        // Creacion de la carta por cada lenguaje existente
        languages.forEach(languages => {
            const t_littleCard = document.getElementById('template-little-card');
            
            const cardClone = t_littleCard.content.cloneNode(true);
            cardClone.getElementById('currency-symbol').textContent = languages;
            
            containerLanguages.appendChild(cardClone);
        });

    }
    else{
        containerLanguages.textContent = 'El país no tiene ningún lenguaje oficial.';
    }

    // Más Contenido
    modalTitle.textContent = country.name.common;
    countryOffName.textContent = country.name.official;
    countryFlag.src = country.flags.svg;
    countryFlag.alt = country.flags.alt || `Bandera del país ${country.name.common}.`;

    country.capital == undefined
        ? countryCapital.textContent = 'Capital: Ninguna.'
        : countryCapital.textContent = `Capital: ${country.capital}.`;
    
    country.region == undefined
        ? countryRegion.textContent = 'Región: Ninguna.'
        : countryRegion.textContent = `Región: ${country.region}.`;
    
    country.continents == undefined
        ? countryContinents.textContent = `Continente: Ninguna.`
        : countryContinents.textContent = `Continente: ${country.continents}.`;

    countryPopulation.textContent = country.population.toLocaleString('es-ES');

    countryTranslateName.textContent = country.translations.spa.common;
    countryTranslateOff.textContent = country.translations.spa.official;

    modalCountry.show();
}

DisplayCountries();