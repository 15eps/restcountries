import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCountries } from '../api/getCountries'
import { Filter } from '../components/Filter'

const CountryCard = (props) => {

    const { flags, name, alpha3Code, region, population, capital } = props.data
    return (
        <Link to={`/${alpha3Code}`}>
            <div className='flex flex-col bg-white dark:bg-darkblue rounded-md shadow-md'>
                <div>
                    <img className='aspect-video rounded-t-lg object-cover' src={flags?.svg} />
                </div>
                <div className="p-6">
                    <div><span className="font-extrabold">{name}</span></div>
                    <ul className='space-y-2'>
                        <li><span className='font-semibold'>Region: </span><span>{region}</span></li>
                        <li><span className='font-semibold'>Population: </span><span>{new Intl.NumberFormat('de-DE').format(population)}</span></li>
                        <li><span className='font-semibold'>Capital: </span><span>{capital}</span></li>
                    </ul>
                </div>
            </div>
        </Link>
    )
}

function Home() {
    const { countries } = getCountries()
    const [filter, setFilter] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    if (!countries) return

    return (
        <main className='p-6 '>
                <Filter countries={countries} handleFilter={setFilter} />

           
            <div className='flex flex-col md:grid md:grid-cols-4 p-4 items-stretch gap-8'>
                {filter
                    ? filter.map((country) => (<CountryCard key={country.alpha3Code} data={country} />))
                    : countries[currentPage - 1]?.map((country) => (<CountryCard key={country.alpha3Code} data={country} />))
                }
            </div>
        </main>
    )
}
export default Home