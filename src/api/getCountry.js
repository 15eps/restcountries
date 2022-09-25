import axios from 'axios'
import { API_URL } from './config'

const TERRITOTY_DESING_URL = "https://cdn.jsdelivr.net/gh/johan/world.geo.json@34c96bba"

export default async function getCountry(countryCode) {

    const countryInfo = await axios.get(`${API_URL}/${countryCode}`).then(res => res.data)
    const territory = await axios.get(`${TERRITOTY_DESING_URL}/countries/${countryCode}.geo.json`)
        .then(res => res.data)
        .catch(e => {})

    let border;
       if(countryInfo?.borders){
           const response = await axios.get(`${API_URL}/?codes=${countryInfo?.borders}`).then(res=>res.data)
           border = response
       }

    return {
        ...countryInfo,
        territory: territory?.features[0]?.geometry?.coordinates || null,
        borders: border ? border : ''
    }

}
