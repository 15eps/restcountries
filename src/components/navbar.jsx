import {Moon} from 'phosphor-react'
import { useTheme } from '../context/theme'

export default function Navbar() {
    const {theme,toggleTheme} = useTheme()
    return (
        <header className='bg-white dark:bg-darkblue text-very-darkgray dark:text-white p-6 shadow-lg'>
            <nav className="flex justify-between">
                <div>
                    <span className='font-bold text-2xl'>Where in the world?</span>
                </div>
                <div>
                    {
                        theme === "dark" ?<button onClick={toggleTheme} className="flex space-x-4 items-center"><Moon size={25} /> Light Mode</button>
                        :<button onClick={toggleTheme} className="flex space-x-4 items-center">
                            <Moon size={25} weight="fill" /> Dark Mode</button>
                    }
                </div>
            </nav>
        </header>
    )
}