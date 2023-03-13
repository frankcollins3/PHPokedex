import Axios from 'axios'
const pokeapiURL = `https://pokeapi.co/api/v2/pokemon?limit=300`
// const envURL = process.env.ALLpokemonURL

export default async function APIpokemonALL (url:any|null) {
    let predata = await Axios.get(url || pokeapiURL)
    console.log('predata')
    console.log(predata)    
    return {predata: predata, data: predata.data.results}
}
// * single responsibility. spare latency with just an API call. no parsing of params. 
// * from youtube ad pete heard: "the ideal number of arguments in a function is 0."
// * considering letting 1 function do: 'v2/pokemon',   'v2/types',   etc.