import axios from 'axios'
import { API_URL } from './config'

const TERRITOTY_DESING_URL = "https://cdn.jsdelivr.net/gh/johan/world.geo.json@34c96bba"

function reverseLatLon(territoryDemarcation) {

    const demarcation = territoryDemarcation.features[0]?.geometry?.coordinates
    if (!demarcation) return
    if (demarcation.length <= 1) {
        return demarcation[0].map(item => [item[1], item[0]])
    }

    const convertedLatLon = demarcation.map((territory) => {
        const array = []
        territory.map(demarcation =>
            demarcation.map(demarcationPoint =>
                array.push([demarcationPoint[1], demarcationPoint[0]]))
        )
        return array
    })
    return convertedLatLon
}

export async function getCountry(countryCode) {

    const countryInfo = await axios.get(`${API_URL}/alpha/${countryCode}`).then(res => res.data)
    const territory = await axios.get(`${TERRITOTY_DESING_URL}/countries/${countryCode}.geo.json`)
        .then(res => reverseLatLon(res.data))
        .catch(e => {})
    let border;
       if(countryInfo?.borders){
           const response = await axios.get(`${API_URL}/alpha?codes=${countryInfo?.borders}`).then(res=>res.data)
           border = response
       }

    return {
        ...countryInfo,
        territory: territory || null,
        borders: border ? border : ''
    }

}
