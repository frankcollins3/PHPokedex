export default async function CentralQuery () {
    let obj = {
        allAPIpokemon: `http://localhost:5000/pokemon?query={allAPIpokemon{name,poke_id}}`,
        allDBpokemon: `http://localhost:5000/pokemon?query={allDBpokemon{name,poke_id,type,moves,abilities,image}}`,
        allDataAllPokemon: async () => {
            let predata_allAPI = await fetch(`http://localhost:5000/pokemon?query={allAPIpokemon{name,poke_id}}`)
    let predata = await predata_allAPI.json()
    let allAPI = predata.data.allAPIpokemon
    
    return allAPI.forEach(async(pokemon) => {
          let predata_allDataAllPoke = await fetch(`http://localhost:5000/pokemon?query={allDataAllPokemon(name:"${pokemon.name}"){name,poke_id,type,moves,abilities,image}}`)
          // let predata_allDataAllPoke = await fetch(`http://localhost:5000/pokemon?query={allDataAllPokemon(name:${pokemon.name}){name,poke_id}}`)
          let allDataAllPoke = await predata_allDataAllPoke.json()
          return allDataAllpoke
          console.log(allDataAllPoke)          
            })            
        }
    }
    return obj
}