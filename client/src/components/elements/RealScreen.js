import '../../App.css';
import {useEffect, useState} from 'react'
import store from "../../redux/store"
import actionObject from "../../redux/actions.js"
import CentralQuery from "../../utility/GraphQL/CentralQuery"
import allDataAllPokemonFunc from '../../utility/GraphQL/allDataAllPokemonFunc';


const firefunc = () => { return }
const firefunc2 = () => { return }

let globalvar;
let pokemon;
let querybank;


function RealScreen () {
    let flexclasscolumn = ["flex", "column", "justCenterAlignCenter"].join(" ");
    let flexclassrow = ["flex", "row", "justCenterAlignCenter", "Pokeball-Container"].join(" ")
    const AppClass = ["App", "flex", "column", "justCenterAlignCenter"].join(" ");

    const [pokeName, setPokeName] = useState([])

    const apitest = async () => { 
      console.log('apitest')
      console.log(apitest)
      // this function below does 2 GraphQL Queries: query={allAPIpokemon{name,poke_id}} && {allDataAllPokemon(name:"${pokemon[i].name}"){name,type,moves,abilities,image}}
        let alldata = await allDataAllPokemonFunc()
        console.log('alldata')
        console.log(alldata)    
        console.log(`alldata.length: ${alldata.length}`)    
        alldata.forEach( (pokedata) => {
          let name = pokedata.name
          let image = pokedata.image
          let type = pokedata.type
          let moves = pokedata.moves
          let abilities = pokedata.abilities
          let poke_id = pokedata.poke_id
          setPokeName(pokeName => [...pokeName, {name,image,type,moves,abilities,poke_id}])
        })
     }



      // new Promise( (resolve, reject) => {
      //     fetch(`http://localhost:5000/pokemon?query={puppeteer}`)
      //     .then(async(data) => {
      //       console.log('data in the promise');
      //       data = await data.json()
      //       data ? 
      //       resolve( 
      //           console.log('data'),
      //           console.log(data)
      //         )
      //       : 
      //       reject("ben and jerry")
      //     })


      const check = async () => {
        const promises = [
          fetch(`http://localhost:5000/pokemon?query={puppeteer}`).then(async (data) => {
            console.log('data in the promise');
            data = await data.json()
            console.log('data', data);
            return data;
          }),
          // add other promises here if needed
        ];
      
        try {
          const results = await Promise.all(promises);
          console.log('All promises resolved:', results);
        } catch (error) {
          console.error('One of the promises failed:', error);
        }
      }

    


    useEffect( () => {
      (async() => {
        globalvar = await store.getState();
        querybank = await CentralQuery()
        pokemon = globalvar.pokemon
      })()

    }, [])

    const getstate = async () => {          
      let slowpoke = await actionObject.slowpoke()
      // let predata = await fetch(querybank.allDataAllPokemon()) // wrong.            
      let predata = await fetch(querybank.allAPIpokemon)
      const allAPIpokemon = await predata.json()
      const allpokemon = allAPIpokemon.data.allAPIpokemon
    }    


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
                  
                  <div style={{ backgroundImage: `url('img/pokemontemplate.png')`}}
                   id="Pokemon-Screen-Card" key={`div:${index}`} className={flexclasscolumn}>
                  <img className="Pokemon-Screen-Img" src={mapitem.image} key={`image: ${index}`} />
                  <li className="Pokemon-Screen-Data" key={index}> {mapitem.name} </li>    
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
        <button style={{backgroundImage: `url('img/cookie.png')`}} className="Intro-Buttons Bg-Cover-noRepeat" id="IB3" onClick={check}></button>

    <div style={{marginTop: '0.45em'}} className={flexclassrow}>
    </div>

    </div>
      </>    
    )
}

export default RealScreen
