// Funcion para la peticion de datos ya sea en el LocalStorage y si no hay datos, se solicita al JSON
async function RequestDataJSON(){

    try {
        let data = [];

        if(localStorage.Countries == undefined || !localStorage.Countries){
            const result = await fetch(`https://restcountries.com/v3.1/all`); //Solicitud
    
            // Validar si se recibe correctamente el resultado, sino mandar la descripcion del error
            if(!result.ok){
                throw new Error(result.status);
            }
    
            data = await result.json(); // Conversion a JSON
    
            // Guarda la lista de paises en el LocalStorage
            localStorage.setItem("Countries", JSON.stringify(data));
    
        }
        else{
            // Conversion de datos guardados
            data = JSON.parse(localStorage.getItem("Countries"));
        }

        return data;

    } catch (error) {

        console.error(`Error requesting country's data: `, error);
        return []; // Retornar un array vacio
    }
}
