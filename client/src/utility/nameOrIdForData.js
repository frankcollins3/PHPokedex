import axios from 'axios'

export default async function nameOrIdForData(key) {
    if (typeof key === 'number') {

    } else if (typeof key === 'string') {

        let predata = await axios.get(`https://pokeapi.co/api/v2/pokemon/${key}`)
        let data = predata.data.abilities ? predata.data : []
        console.log('predata')
        console.log(predata)
        // let data = predata.data ? predata.data.results : []
        console.log('data')
        console.log(data)
        return data
        // console.log('data')
        // console.log(data)


    }
}