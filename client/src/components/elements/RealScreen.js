import '../../App.css';
import {useEffect, useState} from 'react'
import store from "../../redux/store"
import actionObject from "../../redux/actions.js"

const firefunc = () => { return }
const firefunc2 = () => { return }
const apitest = () => { return }

function RealScreen () {
    let flexclasscolumn = ["flex", "column", "justCenterAlignCenter"].join(" ");
    let flexclassrow = ["flex", "row", "justCenterAlignCenter", "Pokeball-Container"].join(" ")
    const AppClass = ["App", "flex", "column", "justCenterAlignCenter"].join(" ");

    let globalvar
    let pokemon;

    const getstate = async () => {          
      let slowpoke = await actionObject.slowpoke()
      let predata = await fetch(`http://localhost:5000/pokemon?query={allAPIpokemon{name,poke_id}}`)
      // let predata = await fetch(`http://localhost:5000/pokemon?query={allDBpokemon{name,poke_id}}`)
      const allAPIpokemon = await predata.json()
      const allpokemon = allAPIpokemon.data.allAPIpokemon

      console.log('store')
      console.log(store)

      console.log('pokemon')
      console.log(pokemon)

      allpokemon.forEach(async(pokemon) => {
            let pokename = await actionObject.setPokemon(pokemon.name).payload
            console.log('pokename')      
            console.log(pokename)      
      })
    }


    useEffect( () => {
      (async() => {
        globalvar = await store.getState();
        pokemon = store.pokemon
      })()

    }, [])
    

    
    // let pokemon = globalvar.pokemon


    return (
      <>
    <div className={AppClass}>
        {/* <div className="item-a"></div> */}
    {/* <img className="Screen" src="img/nicePokedex.png"></img>  */}
    <div className="Screen" style={{ backgroundImage: `url('img/nicePokedex.png')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
            {/* {
            pokemon.length > 3 ? 
              pokemon || 'no pokemon'
              :
              <img className="gear" src="img/gear.png"></img>
            } */}
       </div>
    <button style={{backgroundImage: `url('img/greatball.png')`}} className="Intro-Buttons Bg-Cover-noRepeat" id="IB2" onClick={firefunc2}></button>
        <button style={{backgroundImage: `url('img/ultraball.png')`}} className="Intro-Buttons Bg-Cover-noRepeat" id="IB3" onClick={apitest}></button>
        <button style={{backgroundImage: `url('img/gear.png')`}} className="Intro-Buttons Bg-Cover-noRepeat" id="IB3" onClick={getstate}></button>

    <div style={{marginTop: '0.45em'}} className={flexclassrow}>
    </div>

    </div>
      </>    
    )
}

export default RealScreen
