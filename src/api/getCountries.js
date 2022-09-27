import {useState, useEffect} from 'react'
import axios from 'axios'
import {API_URL} from './config'

const LIMIT_PAGE = 20

function pagination(array){

    const pages = []
    const data = Math.ceil(array?.length / LIMIT_PAGE)
    
    for(let i=1; i<= data; i++){
        const arr = []
        let count = (i * LIMIT_PAGE) - LIMIT_PAGE
        const delimiter = count + LIMIT_PAGE
       
            for(let j=count; j < delimiter; j++){
                if(arr.length < LIMIT_PAGE && array[j]){
                    arr.push(array[j])
                }
            }
        
        count++;

        pages.push(arr)
    }
    
    return pages
}

export function getCountries() {

    const [countries, setCountries] = useState()

    const getCountries = async () =>await axios.get(`${API_URL}/all?fields=region,population,name,flags,capital,area,cca2,alpha3Code`)
        .then(res=>pagination(res.data.sort(()=>0.5 - Math.random() )))
    
    useEffect(() => {
        getCountries().then(data => setCountries(data))        
    }, [])    
    return {countries}
}