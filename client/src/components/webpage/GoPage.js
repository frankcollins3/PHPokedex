// import RealScreen from '../components/elements/RealScreen'
import RealScreen from '../elements/RealScreen'
import PokeballRow from '../elements/PokeballRow'
import allAPI from '../../utility/allAPI'
import nameOrIdForData from '../../utility/nameOrIdForData'
import axios from 'axios'
import {useEffect, useState} from "react"

// redux
import store from "../../redux/store"

function GoPage () {

  useEffect( () => {
    console.log("a simple sueEffect test!")
  }, [])  

  const [pokemon, setPokemon] = useState([])

  const allDataAllPokemonFetch = async () => {
    // (name:"slowpoke") is the resolve: (parent, args) => it is the args that becomes the resolve function parameters in RootQueryType server/index.js
    //     /pokemon is from app.use('pokemon', ExpressGraphQL({}))   /query={allDataAllPokemon} is the key with the resolve function RootQueryType
    const response = await axios.post('http://localhost:5000/pokemon?query={allDataAllPokemon(id:59){name,poke_id,type,moves,abilities}}');
    console.log('response') 
    console.log(response)
    for (let i = 170; i < 200; i++) { 
      const loopdata = await axios.post(`http://localhost:5000/pokemon?query={allDataAllPokemon(id:${i+1}){name,poke_id,type,moves,abilities}}`)
      let data = loopdata.data.data.allDataAllPokemon
      setPokemon(pokemon => [...pokemon, data])      
      console.log('data in the for loop')
      console.log(data)
    }
    return response.data ? response.data : []
  }

  const firefunc2 = async () => {
     // const response = await fetch('http://localhost:5000/pokemon?query={allAPIpokemon{name}}');
    // // const response = await fetch('http://localhost:5000/pokemon?query={allpokemon{name}}');
    // const data = await response.json();
    // console.log(data);
  }

  const apitest = async () => {
    console.log('firing the apitest function');
    const predata = await fetch(`http://localhost:5000/pokemon?query={allDBpokemon{name,type,id}}`) 
    const data = await predata.json()
    console.log('data')
    console.log(data)
  }

  const getstate = () => {
    console.log('pokemon this is the setState()')
    console.log(pokemon)

    console.log('store from GoPage')
    console.log(store)
    console.log(store.getState())
  }


    const AppClass = ["App", "flex", "column", "justCenterAlignCenter"].join(" ");

    return (
        <div className={AppClass} style={{ backgroundImage: `url('img/noScreenPokedex.jpeg')` }}>

        
        <RealScreen/>
<button style={{backgroundImage: `url('img/pokeball.png')`}}  className="Intro-Buttons Bg-Cover-noRepeat" id="IB1" onClick={allDataAllPokemonFetch}> </button>
        <button style={{backgroundImage: `url('img/greatball.png')`}} className="Intro-Buttons Bg-Cover-noRepeat" id="IB2" onClick={firefunc2}></button>
        <button style={{backgroundImage: `url('img/ultraball.png')`}} className="Intro-Buttons Bg-Cover-noRepeat" id="IB3" onClick={apitest}></button>
        <button style={{backgroundImage: `url('img/gear.png')`}} className="Intro-Buttons Bg-Cover-noRepeat" id="IB3" onClick={getstate}></button>


        {/* <PokeballRow/> */}
        

        
            </div>
                    
    )
}

export default GoPage
