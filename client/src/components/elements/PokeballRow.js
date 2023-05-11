import '../../App.css';

const firefunc = () => {
    console.log("firefunc");  
}
const firefunc2 = () => {
    console.log("firefunc2");
}
const apitest = () => {
    console.log('apitest');
}

function PokeballRow () {

    const flexclassrow = ["flex", "row", "justCenterAlignCenter"].join(" ");

    return (
      <>
    <div className="Container">
        
    <div style={{marginTop: '0.45em'}} className={flexclassrow}>
    <button style={{backgroundImage: `url('img/pokeball.png')`}}  className="pokeball Intro-Buttons Bg-Cover-noRepeat" id="IB1" onClick={firefunc}> </button>
    <button style={{backgroundImage: `url('img/greatball.png')`}} className="greatball Intro-Buttons Bg-Cover-noRepeat" id="IB2" onClick={firefunc2}></button>
    <button style={{backgroundImage: `url('img/ultraball.png')`}} className="ultraball Intro-Buttons Bg-Cover-noRepeat" id="IB3" onClick={apitest}></button>

    </div>

    </div>
      </>    
    )
}

export default PokeballRow