import { useEffect, useState } from "react"
import getInfoCountry from '../api/getCountry'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Flag } from 'phosphor-react'
import { MapContainer, TileLayer, Marker, Polygon } from "react-leaflet"

function Country() {
    const { countryId } = useParams()
    const [countryInfo, setCountryInfo] = useState()


    useEffect(() => {
        getInfoCountry(countryId).then(setCountryInfo)
    }, [countryId])

    useEffect(() => {
        const mapCss = document.createElement('link')
        mapCss.href = "https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
        mapCss.rel = "stylesheet"
        mapCss.async = true
        document.head.appendChild(mapCss)

    }, [])

    if (!countryInfo) return (<div className="flex items-center justify-center animate-pulse"><Flag size={48} /></div>)

   
    function reverseLatLon() {
        const terrytoriD = []

        if(countryInfo?.territory.length <= 1){
            return countryInfo?.territory[0].map(item=>[item[1],item[0]])
        }

        for (let i = 0; i < countryInfo?.territory.length; i++) {
            for (let j = 0; j < countryInfo?.territory[i].length; j++) {
                const array1 = []
                countryInfo?.territory[i][j].map(item=>array1.push([item[1],item[0]]))
                terrytoriD.push(array1)
            }
        }
        return terrytoriD
    }

    return (
        <div className="text-base p-6 md:p-10 flex flex-wrap space-y-10">
            <div>
                <Link to="/">
                    <button className="flex items-center justify-between p-2 px-8 rounded shadow-3xl shadow-black/20">
                        <ArrowLeft size={20} />
                        <span>Back</span>
                    </button>
                </Link>
            </div>

            <div className="flex flex-col md:flex-row space-x-4 md:space-x-10 space-y-10 md:space-y-0">
                <div className="basis-1/2">
                    <img src={countryInfo.flags.svg} alt={countryInfo.name} />
                </div>

                <div className="basis-1/2">
                    <h1 className="text-3xl font-bold">{countryInfo.name}</h1>

                    <div className="flex flex-wrap flex-col md:flex-row space-y-6">
                        <div className="flex flex-col basis-1/2 space-y-1">
                            <span className="country-info">Native Name: <span>{countryInfo.nativeName}</span></span>
                            <span className="country-info">Population:   <span>{countryInfo.population.toLocaleString('pt-BR')}</span></span>
                            <span className="country-info">Region:   <span>{countryInfo.region}</span></span>
                            <span className="country-info">Sub Region:   <span>{countryInfo.subregion}</span></span>
                            <span className="country-info">Capital:   <span>{countryInfo.capital}</span></span>
                        </div>

                        <div className="basis-1/2 flex flex-col space-y-2">
                            
                            <span className="country-info">Top Level Domain:   <span className="font-normal">{countryInfo.topLevelDomain[0]}</span></span>
                            <span className="country-info">Currencies:   <span>{countryInfo.currencies[0].name}</span></span>
                            <span className="country-info">Languages:   <span>
                                {countryInfo.languages.map((item, index) =>
                                (<span key={item.name}>
                                    {item.name}
                                    {index === countryInfo.languages.length - 1 ? "" : ", "}
                                </span>))}
                            </span>
                            </span>
                        </div>
                        {countryInfo.borders && (
                            <div className="basis-full space-x-2 space-y-5">
                                <span className="country-info basis-full">Borders Countries:</span>
                                {countryInfo.borders.map(item => (
                                    <Link key={item.alpha3Code} to={`/${item.alpha3Code}`}>
                                        <button className="p-2 rounded shadow-3xl mt-1">{item.name}</button>
                                    </Link>
                                ))}
                            </div>)}
                    </div>
                </div>
            </div>
            <div>

                <MapContainer className="h-[50vh]" center={[countryInfo.latlng[0], countryInfo.latlng[1]]} zoom={3} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[countryInfo.latlng[0], countryInfo.latlng[1]]} />
                    <Polygon positions={reverseLatLon()} />
                </MapContainer>
            </div>
        </div>
    )
}

export default Country