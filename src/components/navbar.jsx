import {Moon} from 'phosphor-react'
import {useTheme} from '../hooks/useTheme'

export default function Navbar() {

    const {theme, toggleTheme} = useTheme()
    
    return (
        <header className='bg-white dark:bg-darkblue text-very-darkgray dark:text-white p-6 shadow-lg'>
            <nav className="flex justify-between">
                <div>
                    <span className='font-bold text-2xl'>Where in the world?</span>
                </div>
                <div onClick={toggleTheme}>
                    {
                        theme === 'dark' 
                        ?<button className="flex space-x-4 items-center"><Moon size={25} /> Light Mode</button>
                        :<button className="flex space-x-4 items-center"><Moon size={25} weight="fill" /> Dark Mode</button>
                    }
                   </div>
            </nav>
        </header>
    )
}