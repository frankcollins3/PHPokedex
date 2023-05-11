// import RealScreen from '../components/elements/RealScreen'
import RealScreen from '../elements/RealScreen'
import PokeballRow from '../elements/PokeballRow'
import allAPI from '../../utility/allAPI'
import nameOrIdForData from '../../utility/nameOrIdForData'
import axios from 'axios'


const firefunc = async () => {

    // (name:"slowpoke") is the resolve: (parent, args) => it is the args that becomes the resolve function parameters in RootQueryType server/index.js
    //     /pokemon is from app.use('pokemon', ExpressGraphQL({}))   /query={allDataAllPokemon} is the key with the resolve function RootQueryType
    const response = await axios.post('http://localhost:5000/pokemon?query={allDataAllPokemon(id:103){name,poke_id,type,moves,abilities}}');
    console.log('response')
    console.log(response)

    for (let i = 0; i < 151; i++) { // c for (int i = 0; i < sizeof(*pokemon); i++) {}
      const loopdata = await axios.post(`http://localhost:5000/pokemon?query={allDataAllPokemon(id:${i+1}){name,poke_id,type,moves,abilities}}`)
      console.log('loopdata')
      console.log(loopdata)
    }
    return response.data ? response.data : []
  }

  const firefunc2 = async () => {
    console.log("* * * * firefunc2 * * * * ")
    const response = await fetch('http://localhost:5000/pokemon?query={allAPIpokemon{name}}');
    // const response = await fetch('http://localhost:5000/pokemon?query={allpokemon{name}}');
    const data = await response.json();
    console.log(data);
  }

  const apitest = async () => {
    console.log('firing the apitest function');
    const predata = await fetch(`http://localhost:5000/pokemon?query={allDBpokemon{name,type,id}}`) 
    const data = await predata.json()
    console.log('data')
    console.log(data)
  }

function GoPage () {
    const AppClass = ["App", "flex", "column", "justCenterAlignCenter"].join(" ");

    return (
        <div className={AppClass} style={{ backgroundImage: `url('img/noScreenPokedex.jpeg')` }}>

        
        <RealScreen/>
        <button style={{backgroundImage: `url('img/pokeball.png')`}}  className="Intro-Buttons Bg-Cover-noRepeat" id="IB1" onClick={firefunc}> </button>
        <button style={{backgroundImage: `url('img/greatball.png')`}} className="Intro-Buttons Bg-Cover-noRepeat" id="IB2" onClick={firefunc2}></button>
        <button style={{backgroundImage: `url('img/ultraball.png')`}} className="Intro-Buttons Bg-Cover-noRepeat" id="IB3" onClick={apitest}></button>

        {/* <PokeballRow/> */}
        

        
            </div>
                    
    )
}

export default GoPage
