import '../../App.css';
import {useEffect, useState} from 'react'
import store from "../../redux/store"
import actionObject from "../../redux/actions.js"

const firefunc = () => { return }
const firefunc2 = () => { return }

const apitest = async () => { 
    console.log('apitest');
    // let predata = await fetch(`http://localhost:5000/pokemon?query={allDataAllPokemon{name,poke_id}}`)
    let predata_allAPI = await fetch(`http://localhost:5000/pokemon?query={allAPIpokemon{name,poke_id}}`)
    let predata = await predata_allAPI.json()
    let allAPI = predata.data.allAPIpokemon
    
    allAPI.forEach(async(pokemon) => {

        console.log('pokemon')
        console.log(pokemon)

          let predata_allDataAllPoke = await fetch(`http://localhost:5000/pokemon?query={allDataAllPokemon(name:"${pokemon.name}"){name,poke_id}}`)
          // let predata_allDataAllPoke = await fetch(`http://localhost:5000/pokemon?query={allDataAllPokemon(name:${pokemon.name}){name,poke_id}}`)
          let allDataAllPoke = await predata_allDataAllPoke.json()
          console.log('allDataAllPoke')
          console.log(allDataAllPoke)
    })

    // let predata = await fetch(`http://localhost:5000/pokemon?query={allDataAllPokemon(name:"slowpoke"){name,poke_id}}`)
    // let predata = await fetch(`http://localhost:5000/pokemon?query={allDBpokemon{name,poke_id}}`)
    
 }

function RealScreen () {
    let flexclasscolumn = ["flex", "column", "justCenterAlignCenter"].join(" ");
    let flexclassrow = ["flex", "row", "justCenterAlignCenter", "Pokeball-Container"].join(" ")
    const AppClass = ["App", "flex", "column", "justCenterAlignCenter"].join(" ");

    const [pokeName, setPokeName] = useState([])

    let globalvar
    let pokemon;

    const getstate = async () => {          
      let slowpoke = await actionObject.slowpoke()
      let predata = await fetch(`http://localhost:5000/pokemon?query={allAPIpokemon{name,poke_id}}`)
      const allAPIpokemon = await predata.json()
      const allpokemon = allAPIpokemon.data.allAPIpokemon
    
      const pokemonPromises = allpokemon.map(async (pokemon) => {
        const reduxname = await actionObject.setPokemon(pokemon.name).payload
        return reduxname
      })
    
      const pokemonNames = await Promise.all(pokemonPromises)
      if (pokeName.length < 151) { setPokeName(pokeName => [...pokeName, ...pokemonNames]) }
    }

    const state2 = () => {
        console.log('pokeName ')
        console.log(pokeName)
    }


    useEffect( () => {
      (async() => {
        globalvar = await store.getState();
        pokemon = globalvar.pokemon
      })()

    }, [])
    


    return (
      <>
    <div className={AppClass}>        
    <div className="Screen" style={{ backgroundImage: `url('img/nicePokedex.png')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
            {
              pokeName.length 
              ?
              pokeName.map( (mapitem, index) => {
                  return (
                      <h6 key={index}> {mapitem} </h6>    
                  )
              })
              :
              <img className="gear" src="img/gear.png"></img>              
            }
            {/* {
            pokemon.length > 3 ? 
              pokemon || 'no pokemon'
              :
              <img className="gear" src="img/gear.png"></img>
            } */}
       </div>
    <button style={{backgroundImage: `url('img/pokeball.png')`}} className="Intro-Buttons Bg-Cover-noRepeat" id="IB2" onClick={firefunc2}></button>
        <button style={{backgroundImage: `url('img/greatball.png')`}} className="Intro-Buttons Bg-Cover-noRepeat" id="IB3" onClick={apitest}></button>
        <button style={{backgroundImage: `url('img/gear.png')`}} className="Intro-Buttons Bg-Cover-noRepeat" id="IB3" onClick={getstate}></button>
        <button style={{backgroundImage: `url('img/cookie.png')`}} className="Intro-Buttons Bg-Cover-noRepeat" id="IB3" onClick={state2}></button>

    <div style={{marginTop: '0.45em'}} className={flexclassrow}>
    </div>

    </div>
      </>    
    )
}

export default RealScreen
