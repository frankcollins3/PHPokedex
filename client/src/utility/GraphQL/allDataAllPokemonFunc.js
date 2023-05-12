export default async function allDataAllPokemonFunc () {
  let predata_allAPI = await fetch(`http://localhost:5000/pokemon?query={allAPIpokemon{name,poke_id}}`)
    let predata = await predata_allAPI.json()
    let allAPI = predata.data.allAPIpokemon
    let bucket = [];    
      await allAPI.forEach(async(pokemon) => {
            let predata_allDataAllPoke = await fetch(`http://localhost:5000/pokemon?query={allDataAllPokemon(name:"${pokemon.name}"){name,poke_id,type,moves,abilities,image}}`)
            // let predata_allDataAllPoke = await fetch(`http://localhost:5000/pokemon?query={allDataAllPokemon(name:${pokemon.name}){name,poke_id}}`)
            let allDataAllPoke = await predata_allDataAllPoke.json()            
            allDataAllPoke = allDataAllPoke.data.allDataAllPokemon
            console.log('allDataAllPoke')
            console.log(allDataAllPoke)
              await bucket.push(allDataAllPoke)                    
      })
    return bucket
}