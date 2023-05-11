import axios from 'axios'

export default async function nameOrIdForData(key) {
        if (key) {
            // parameter can be an integer (pokemon.id) or a name (pokemon.name)
// access axios. check for pokeAPI related endpoint data.abilities. and render that data or empty array. 
            let predata = await axios.get(`https://pokeapi.co/api/v2/pokemon/${key}`)
            let data = predata.data.abilities ? predata.data : []            
            return data
        } else {
            return  
        }            
}
