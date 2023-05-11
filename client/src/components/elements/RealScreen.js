import '../../App.css';

const firefunc = () => { return }
const firefunc2 = () => { return }
const apitest = () => { return }

function RealScreen () {
    let flexclasscolumn = ["flex", "column", "justCenterAlignCenter"].join(" ");
    let flexclassrow = ["flex", "row", "justCenterAlignCenter", "Pokeball-Container"].join(" ")

    return (
      <>
    <div className="Container">
        {/* <div className="item-a"></div> */}
    <img className="Screen" src="img/nicePokedex.png"></img> 

    <div style={{marginTop: '0.45em'}} className={flexclassrow}>
    </div>

    </div>
      </>    
    )
}

export default RealScreen