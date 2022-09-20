import axios from 'axios'
import {API_URL} from './config'

const TERRITOTY_DESING_URL = "https://cdn.jsdelivr.net/gh/johan/world.geo.json@34c96bba"

export default async function getCountry(countryCode){
    const {data: countryInfo} = await axios.get(`${API_URL}/${countryCode}`)
    const territoryDesign = await axios.get(`${TERRITOTY_DESING_URL}/countries/${countryCode}.geo.json`).then(res=>res.data).catch(e=>e)
    const {data:borders} = await axios.get(`https://restcountries.com/v2/alpha?codes=${countryInfo.borders}`)
    
    

    return {
        ...countryInfo,
        borders,
        territory: territoryDesign?.features[0].geometry.coordinates,
    }
}