import './App.css';
// import {useState, useEffect} from 'react';

function App() {

  // const [data, setData] = useState([])
  // const [response, setResponse] = useState([])

  const firefunc = async () => {
    console.log('firing the function')
    const response = await fetch(`http://localhost:5000/data`);
    const data = await response.json()
    console.log('data')
    console.log(data)
  }

  const firefunc2 = async () => {
    console.log("* * * * firefunc2 * * * * ")
    const response = await fetch(`http://localhost:5000/anotherdata`);
    const data = await response.json()
    console.log('data')
    console.log(data)
  }

  return (
    <div className="App">
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
      }}>
      <h1 style={{ color: 'silver' }}> oh you are joking huh? </h1>
    <img className="Pikachu"
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5KFPCph5OFIWpi9IfEJf5S6Sot12hdqWiZg&usqp=CAU"/>
<button style={{ backgroundColor: 'indigo', color: 'blanchedalmond', marginTop: '0.5em', border: '3px solid black'}} 
onClick={firefunc}
> 
click me </button>

<button onClick={firefunc2}
style={{ backgroundColor: 'orange', color: 'olive', marginTop: '1em', border: '3px solid olive' }}> allPokemon </button>
      </div>

    
    </div>
  );
}

export default App;
