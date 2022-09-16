import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null)

export function ThemeProvider({children}){
    const [theme, setTheme] = useState(()=>{
        if(!!localStorage.theme){
            return localStorage.theme
        }
        localStorage.theme = "light"
        return "light"
    })
    const doc = document.documentElement

    useEffect(()=>{
        theme === "dark" && doc.classList.add("dark")        
    },[])
    
    const toggleTheme = () => {        
        if(theme === "dark"){
            doc.classList.remove("dark")
            localStorage.theme = "light"
            setTheme("light")
            return
        }
        doc.classList.add("dark")
        localStorage.theme = "dark"
        setTheme("dark")
    }

    return(
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = ()=> useContext(ThemeContext)