import '../../App.css';
import {useEffect, useState} from 'react'
import store from "../../redux/store"
import actionObject from "../../redux/actions.js"
import CentralQuery from "../../utility/GraphQL/CentralQuery"

const firefunc = () => { return }
const firefunc2 = () => { return }

let globalvar;
let pokemon;
let querybank;

const apitest = async () => { 
    console.log('querybank')
    console.log(querybank)

    console.log('apitest');
    let predata_allAPI = await fetch(querybank.allAPIpokemon)
    
    let predata = await predata_allAPI.json()
    let allAPI = predata.data.allAPIpokemon
    
    allAPI.forEach(async(pokemon) => {
          let predata_allDataAllPoke = await fetch(`http://localhost:5000/pokemon?query={allDataAllPokemon(name:"${pokemon.name}"){name,poke_id,type,moves,abilities,image}}`)
          // let predata_allDataAllPoke = await fetch(`http://localhost:5000/pokemon?query={allDataAllPokemon(name:${pokemon.name}){name,poke_id}}`)
          let allDataAllPoke = await predata_allDataAllPoke.json()
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

    const getstate = async () => {          
      let slowpoke = await actionObject.slowpoke()

      // let predata = await fetch(querybank.allDataAllPokemon()) // wrong.
      let predata = await querybank.allDataAllPokemon()
      console.log('predata')
      console.log(predata)
      

      // let predata = await fetch(querybank.allAPIpokemon)
      // const allAPIpokemon = await predata.json()
      // const allpokemon = allAPIpokemon.data.allAPIpokemon

      // allpokemon.forEach( (pokemon) => {
      //   const name = pokemon.name
      //   console.log('name')
      //   console.log(name)
      //   // setPokeName(pokeName => [pokeName, name])
      //   // setPoke ame(pokeName => [...pokeName, {name: name, image: image}])
      //   setPokeName(pokeName => [...pokeName, {name:pokemon.name}])
      // })
      
    }

    const state2 = () => {
        console.log('pokeName ')
        console.log(pokeName)
    }


    useEffect( () => {
      (async() => {
        globalvar = await store.getState();
        querybank = await CentralQuery()
        pokemon = globalvar.pokemon
      })()

    }, [])

    


    return (
      <>
    <div className={AppClass}>        
    <div className="Screen" 
    style={{ 
      backgroundImage: `url('img/nicePokedex.png')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'
    }}>
            {/* <ul className="Screen-List"> */}
            {
              pokeName.length 
              ?

              
              pokeName.map( (mapitem, index) => {
                console.log('mapitem')
                console.log(mapitem)
                return (
                  <div key={`div:${index}`} className={flexclasscolumn}>
                  <li className="Pokemon-Screen-Data" key={index}> {mapitem.name} </li>    
                  <img src={mapitem.image} key={`image: ${index}`} />
                  </div>
                  
                  )
                })
                
                :
                <img className="gear" src="img/gear.png"></img>              
              }
              {/* </ul> */}
            
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
