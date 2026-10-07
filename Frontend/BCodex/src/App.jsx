import { useState, useEffect } from 'react'
import './App.css'
import legends_data from './data.json'
import weapons from './weapons.json'
import LegendCard from './LegendCard'

function App() {
    let saved_theme = localStorage.getItem('stored_theme')

    const [selected_theme, ChangeTheme] = useState(saved_theme ? saved_theme : 'dark')

    const [selected_weapon, selectWeapon] = useState("All")
    const [query, setQuery] = useState('')
    const [search_query, setSearchQuery] = useState('')

    const filtered_legends = legends_data.filter(legend =>
        (selected_weapon === "All" ||
        selected_weapon === legend["Weapon-1"] ||
        selected_weapon === legend["Weapon-2"]) &&
        legend["Name"].toLowerCase().includes(search_query.toLowerCase())
    )


    useEffect(() =>{
        document.documentElement.setAttribute('data-theme', selected_theme)
        localStorage.setItem('stored_theme', selected_theme)
    }, [selected_theme])

    return (
        <>
            <div className="content">
                <div className="header">
                    <h2>Brawlhalla Codex</h2>
                    <h1>Every legend. <br/>Every weapon.<br/>One arena.</h1>
                    <div className="search-container">
                        <input type="text" placeholder="Search for a legend..." id="search-input" value={query} onChange={(event) => {
                            setQuery(event.target.value)
                        }}
                        onKeyDown={(event) => {
                            if(event.key === "Enter"){
                                setSearchQuery(query)
                            }
                        }}/>
                        <button id="search-button" onClick={() => setSearchQuery(query)}>Search</button>
                    </div>
                    <div className="filters">
                        <button
                            className={selected_weapon === "All" ? "active" : ""}
                            onClick={() => selectWeapon("All")}
                        >
                            All
                        </button>
                        {weapons.map(weapon => (
                            <button
                                key={weapon}
                                className={selected_weapon === weapon ? "active" : ""}
                                onClick={() => selectWeapon(weapon)}
                            >
                                {weapon}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="chest">
                    <div className="result-bar">
                        <span className="result-count">
                            {filtered_legends.length} {filtered_legends.length > 1 ? "Legends" : "Legend"}
                        </span>
                    </div>
                    {filtered_legends.length === 0 && <h1>No elements were found.</h1>}
                    <div className="legends">
                        {filtered_legends.map(legend => (
                            <LegendCard key={legend["ID"]} legend={legend} />
                        ))}
                    </div>
                </div>
            </div>
            <button id="theme-button" onClick={() => {ChangeTheme(selected_theme == 'dark' ? 'light' : 'dark')}} style={{"backgroundImage" : `url(src/assets/Icons/${selected_theme === 'dark' ? 'light' : 'dark'}-theme-icon.svg)`}}></button>
        </>
    )
}

export default App