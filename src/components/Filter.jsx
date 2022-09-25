import { useState } from 'react'
import { ArrowClockwise } from 'phosphor-react'

export function Filter({ countries, handleFilter }) {
    const [dropDown, setDropDownStatus] = useState(false)
    const [typeFilter, setFilterType] = useState(null)

    const handleOpen = () =>  setDropDownStatus((prevState) => !prevState) 
    const handleFilterType = (filter)=>setFilterType(filter)
    const resetFilter = () => handleFilter(null)

    const filterByPopulation = (type) => {
        handleOpen()
        handleFilterType("population")
        const filteredCountries = [...countries]
        type === "more"
            ? handleFilter(filteredCountries.sort((a, b) => b.population - a.population))
            : handleFilter(filteredCountries.sort((a, b) => a.population - b.population))
    }

    const filterByArea = (type) => {
        handleOpen()
        handleFilterType("Area")
        const filteredCountries = [...countries]
        type === "more"
            ? handleFilter(filteredCountries.sort((a, b) => b.area - a.area))
            : handleFilter(filteredCountries.sort((a, b) => a.area - b.area))
    }

    const filterByRegion = (region)=>{
        handleOpen()
        handleFilterType("region")

    const filteredCountries = [...countries]
        
    handleFilter(filteredCountries.filter((country) => country.region === region))            
    }


    return (
        <div className="p-4 flex basis-1/3 space-between space-x-4">
            <button
                className="p-4 px-6 bg-white dark:bg-darkblue dark:very-darkgray rounded-lg shadow-md pointer"
                onClick={resetFilter}>
                <ArrowClockwise size={20} />
            </button>
            <div className="py-4 px-6 bg-white dark:bg-darkblue dark:very-darkgray rounded-lg shadow-md pointer">
                <button onClick={handleOpen}>Filter by {typeFilter ?? ""}</button>
                {dropDown && (
                    <div className="absolute rounded-lg py-4 px-6 translate-x-[-17%] top-[230px] md:top-[175px] bg-white dark:bg-darkblue dark:very-darkgray flex flex-col space-y-5">
                        <div className="flex flex-col space-y-2">
                            <span className="text-xs font-bold">Filter by population</span>
                        <button onClick={() => filterByPopulation("more")}>More populous</button>
                        <button onClick={() => filterByPopulation("less")}>Less populous</button>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <span className="text-xs font-bold">Filter by area km2</span>
                        <button onClick={() => filterByArea("more")}>Largest area</button>
                        <button onClick={() => filterByArea("less")}>Smallest area</button>
                    </div>
                    <div className="flex flex-col space-y-2">
                            <span className="text-xs font-bold">Filter by Continent</span>
                            <button onClick={()=>filterByRegion("Africa")}>Africa</button>
                            <button onClick={()=>filterByRegion("Americas")}>America</button>
                            <button onClick={()=>filterByRegion("Asia")}>Asia</button>
                            <button onClick={()=>filterByRegion("Europe")}>Europe</button>
                            <button onClick={()=>filterByRegion("Oceania")}>Oceania</button>
                        </div>
                    </div>)}
            </div>
        </div>
    )
}