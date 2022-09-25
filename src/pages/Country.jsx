import { useEffect, useState } from "react"
import getInfoCountry from '../api/getCountry'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Flag } from 'phosphor-react'
import { MapContainer, TileLayer, Marker, Polygon } from "react-leaflet"

function Country() {
    const { countryId } = useParams()
    const [countryInfo, setCountryInfo] = useState()
    
    useEffect(() => {
        const mapCss = document.createElement('link')
        mapCss.href = "https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
        mapCss.rel = "stylesheet"
        mapCss.async = true
        document.head.appendChild(mapCss)
        
    }, [])
    
    useEffect(() => {
        getInfoCountry(countryId).then(setCountryInfo)
    }, [countryId])

    function reverseLatLon() {
        if (!countryInfo?.territory) return
        if (countryInfo?.territory.length <= 1) {
            return countryInfo?.territory[0].map(item => [item[1], item[0]])
        }

        const territoryDemarcation = countryInfo?.territory.map((territory) => {
            const array = []
            territory.map(demarcation =>
                demarcation.map(demarcationPoint =>
                    array.push([demarcationPoint[1], demarcationPoint[0]]))
            )
            return array
        })
        return territoryDemarcation
    }

    if (!countryInfo) return (<div className="flex items-center justify-center animate-pulse"><Flag size={48} /></div>)

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
                    <img src={countryInfo?.flag} alt={countryInfo.name} />
                </div>

                <div className="basis-1/2">
                    <h1 className="text-3xl font-bold">{countryInfo.name}</h1>

                    <div className="flex flex-wrap flex-col md:flex-row space-y-6">
                        <div className="flex flex-col basis-1/2 space-y-1">
                            <div>
                                <strong className="country-info">Native Name: </strong>
                                <span>{countryInfo.nativeName}</span>
                            </div>
                            <div>
                                <strong className="country-info">Population: </strong>
                                <span>{countryInfo.population}</span>
                            </div>
                            <div>
                                <strong className="country-info">Region: </strong>
                                <span>{countryInfo.region}</span>
                            </div>
                            <div>
                                <strong className="country-info">Sub Region: </strong>
                                <span>{countryInfo.subregion}</span>
                            </div>
                            <div>
                                <strong className="country-info">Capital: </strong>
                                <span>{countryInfo.capital}</span>
                            </div>
                        </div>

                        <div className="basis-1/2 flex flex-col space-y-2">

                            <div>
                                <strong className="country-info">Top Level Domain: </strong>
                                <span className="font-normal">{countryInfo.topLevelDomain[0]}</span>
                            </div>
                            <div>
                                <strong className="country-info">Currencies: </strong>
                                <span>{countryInfo.currencies[0].name ?? "não tem moedas"}</span>
                            </div>
                            <div>
                                <strong className="country-info">Languages: </strong>
                                {countryInfo.languages.map((language, index) =>
                                (<span key={language.name}>
                                    {language.name}
                                    {index === countryInfo.languages.length - 1 ? "" : ", "}
                                </span>)
                                )}
                            </div>
                        </div>
                        {countryInfo.borders && (
                            <div className="basis-full space-x-2 space-y-5">
                                <span className="country-info basis-full">Borders Countries:</span>
                                {countryInfo.borders?.map(item => (
                                    <Link key={item.alpha3Code} to={`/${item.alpha3Code}`}>
                                        <button className="p-2 rounded shadow-3xl mt-1">{item.name}</button>
                                    </Link>
                                ))}
                            </div>)}
                    </div>
                </div>
            </div>

            <div className="w-full h-[50vh]">
                <MapContainer className="h-[50vh]" center={[countryInfo.latlng[0], countryInfo.latlng[1]]} zoom={2.9} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[countryInfo.latlng[0], countryInfo.latlng[1]]} />
                    {reverseLatLon() && (<Polygon positions={reverseLatLon()} />)}
                </MapContainer>
            </div>
        </div>
    )
}

export default Country