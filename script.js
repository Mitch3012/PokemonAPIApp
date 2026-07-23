const pokemonName = document.getElementById("pokemonName");

async function getData() {
    const pokemon = pokemonName.value.trim().toLowerCase();

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;    
   
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();

        // add sprite
        const pokemonSprite = result.sprites.front_default;
        const imgElement = document.getElementById("pokemon-img");

        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";

        // add name
        const displayPokeName = document.getElementById("display-poke-name");
        const pokeName = result.species.name.toUpperCase();
        displayPokeName.innerText = pokeName;

        //clear previous type
        let typeDiV = document.getElementById("pokemon-types");

        while (typeDiV.firstChild){
            typeDiV.firstChild.remove();
        }

        let types = result.types;

        for (let i = 0; i < types.length; i++){
            let type = document.createElement("span");

            type.innerText = types[i].type.name.toUpperCase();
            type.classList.add("type-box");
            type.classList.add(types[i].type.name);
            
            
            typeDiV.appendChild(type);
        }
    // add Decription
    let res = await fetch(result.species.url);
    let desc = await res.json();
    
    desc = desc.flavor_text_entries[12].flavor_text;

const descElement =document.getElementById("pokemon-description");
console.log(desc);
console.log(descElement);
descElement.innerText = desc; 


    } catch (error) {
        console.error(error.message);
    }
}