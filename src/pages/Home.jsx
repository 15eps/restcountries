import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MagnifyingGlass, Flag, ArrowClockwise } from 'phosphor-react'

const CountryInfo = ({ flags, name, alpha3Code, region, population, capital }) => {
    return (
        <Link to={`/${alpha3Code}`}>
            <div className='flex flex-col bg-white dark:bg-darkblue rounded-md shadow-md'>
                <div>
                    <img className='aspect-video rounded-t-lg object-cover' src={flags.svg} />
                </div>
                <div className="p-6">
                    <div><span className="font-extrabold">{name.common}</span></div>
                    <ul className='space-y-2'>
                        <li><span className='font-semibold'>Region: </span><span>{region}</span></li>
                        <li><span className='font-semibold'>Population: </span><span>{population}</span></li>
                        <li><span className='font-semibold'>Capital: </span><span>{capital}</span></li>
                    </ul>
                </div>
            </div>
        </Link>
    )
}


function Home() {
    const [countries, setCountries] = useState()
    const [filter, setFilter] = useState()
    const [filterCountry, setFilterCountry] = useState()
    useEffect(() => {
        const getCountries = async () => {
            const response = await fetch('https://restcountries.com/v3.1/all')
            const data = await response.json()
            setCountries(data.sort(() => Math.random() - 0.5))
        }

        getCountries()

    }, [])


    const handleFilterByRegion = (filter) => {
        const countriesFiltered = countries.filter(item => item.region === filter.target.value)
        setFilter(countriesFiltered)
    }
        
        const handleFilterByCountryName = (filter) => {
        const country = countries.filter(item => item.name.common.toLowerCase().includes(filter.target.value.toLowerCase()))
        setFilterCountry(filter.target.value)
        setFilter(country)
    }

       const handleFilterByPopulation = (filter) => {
        if(!!!filter.target.value){
            setFilter()
            return 
        }

        filter.target.value === "more" 
        ? setFilter(countries.sort((a, b) => b.population - a.population))
        : setFilter(countries.sort((a, b) => a.population - b.population))
    }

    const handleFilterByArea = (filter)=>{
        if(!!!filter.target.value){
            setFilter()
            return 
        }

        filter.target.value === "more" 
        ? setFilter(countries.sort((a, b) => b.area - a.area))
        : setFilter(countries.sort((a, b) => a.area - b.area))
    }

       const handleFilterReset = () => {
        setFilter()
    }


    return (
        <>
            <main className='p-6 '>
                <div className='flex flex-col md:flex-row items-center md:justify-between'>

                    <div className="flex p-4 px-6 bg-white dark:bg-darkblue dark:very-darkgray md:basis-1/3 items-center rounded-lg shadow-3xl space-x-2">
                        <button><MagnifyingGlass size={20} /></button>
                        <input
                            className='px-4 w-full h-full outline-none bg-white dark:bg-darkblue dark:very-darkgray'
                            placeholder='search for a country'
                            onChange={handleFilterByCountryName}
                            value={filterCountry}
                        />
                    </div>
                    <div className="flex items-center space-x-2 overflow-x-auto">
                        <button className="p-4 px-6 bg-white dark:bg-darkblue dark:very-darkgray rounded-lg shadow-md pointer"
                            onClick={handleFilterReset}>
                            <ArrowClockwise size={20} />
                        </button>

                        <select
                         className="p-4 px-6 bg-white dark:bg-darkblue dark:very-darkgray rounded-lg shadow-md"
                         onChange={handleFilterByArea}
                            >
                            <option value="">Filter by km2</option>
                            <option value="more">More Area/km2</option>
                            <option value="less">Less Area/km2</option>
                        </select>

                        <select className="p-4 px-6 bg-white dark:bg-darkblue dark:very-darkgray rounded-lg shadow-md"
                            onChange={handleFilterByPopulation}>
                            <option value="">Filter by population</option>
                            <option value="more">More populous</option>
                            <option value="less">Less populous</option>
                        </select>

                        <select className="p-4 px-6 bg-white dark:bg-darkblue dark:very-darkgray rounded-lg shadow-md"
                            onChange={handleFilterByRegion}>
                            <option value="">Filter by region</option>
                            <option value="Africa">Africa</option>
                            <option value="Americas">America</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>
                        </select>

                    </div>
                </div>


                <div className='flex flex-col md:grid md:place-items-stretch md:grid-cols-4 p-4 items-center gap-8'>
                    {filter ?
                        filter.map(country =>
                        (<CountryInfo
                            key={country.cca2}
                            flags={country.flags}
                            region={country.region}
                            name={country.name}
                            alpha3Code={country.cca2}
                            population={country.population.toLocaleString('pt-BR')}
                            capital={country.capital} />
                        )) :
                        countries?.filter((item, index) => index < 8)
                            .map((country) => (
                                <CountryInfo
                                    key={country.cca2}
                                    flags={country.flags}
                                    region={country.region}
                                    alpha3Code={country.cca2}
                                    name={country.name}
                                    population={country.population.toLocaleString('en-US')}
                                    capital={country.capital} />)
                            )}
                </div>
            </main>
        </>
    )
}
export default Home