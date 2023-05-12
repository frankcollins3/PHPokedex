
export default async function allDataAllPokemonFunc () {
  let predata_allAPI = await fetch(`http://localhost:5000/pokemon?query={allAPIpokemon{name,poke_id}}`)
  let predata = await predata_allAPI.json()
  let allAPI = predata.data.allAPIpokemon
  let bucket = [];    

const loopAndPush = async () => {
  await Promise.all(allAPI.map(async (pokemon) => {
    let predata_allDataAllPoke = await fetch(`http://localhost:5000/pokemon?query={allDataAllPokemon(name:"${pokemon.name}"){name,poke_id,type,moves,abilities,image}}`)
    let allDataAllPoke = await predata_allDataAllPoke.json()            
    allDataAllPoke = allDataAllPoke.data.allDataAllPokemon
    
    let myobject = {
      name: allDataAllPoke.name, poke_id: allDataAllPoke.poke_id,  image: allDataAllPoke.image, moves: allDataAllPoke.moves,
      abilities: allDataAllPoke.abilities, type: allDataAllPoke.type
    }

    bucket.push(myobject);                    
  }));
}

    const returnbucket = async () => {return await bucket}

    const pushAndReturn = async () => {
      await loopAndPush()
      console.log('bucket')
      console.log(bucket)
      console.log(bucket[0])
      // console.log(bucket[1])
      return returnbucket()
    }
    return pushAndReturn()

      
    // return bucket
}
