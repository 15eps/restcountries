import {useState,useEffect} from 'react'

const THEME = localStorage.getItem('theme')
console.log(THEME)
export function useTheme(){
    
    const [theme,setTheme] = useState(THEME)

    useEffect(()=>{    
        document.documentElement.classList.add(theme)  
    },[theme])

    const toggleTheme = ()=>{
        if(theme === 'dark'){
            localStorage.setItem('theme', 'light')
            document.documentElement.classList.remove(theme)
            setTheme('light')
            return
        }
        localStorage.setItem('theme', 'dark')
        document.documentElement.classList.remove(theme)        
        setTheme('dark')
    }

    return{theme,toggleTheme}
}