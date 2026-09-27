import { useState, useEffect } from 'react'
import './legend.css'
import legends_data from './data.json'

function getOrderedEntries(legend, prefix) {
    return Object.keys(legend)
        .filter(key => key.startsWith(prefix))
        .sort((a, b) => parseInt(a.split('-')[1], 10) - parseInt(b.split('-')[1], 10))
        .map(key => legend[key])
}

function Legend() {
    const [selected_theme, ChangeTheme] = useState('dark')
    const [legend, setLegend] = useState(null)

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', selected_theme)
    }, [selected_theme])

    useEffect(() => {
        const id = new URLSearchParams(window.location.search).get('id')
        const found = legends_data.find(l => String(l["ID"]) === String(id))
        setLegend(found || null)
    }, [])

    if (!legend) {
        return (
            <div className="legend-page">
                <h1 className="legend-loading">Loading legend...</h1>
            </div>
        )
    }

    const paragraphs = getOrderedEntries(legend, 'Paragraph-')
    const quotes = getOrderedEntries(legend, 'Quote-')
    const weapons = [legend["Weapon-1"], legend["Weapon-2"]].filter(Boolean)

    const storyBlocks = []
    const maxLen = Math.max(paragraphs.length, quotes.length)
    for (let i = 0; i < maxLen; i++) {
        if (paragraphs[i]) storyBlocks.push({ type: 'paragraph', content: paragraphs[i] })
        if (quotes[i]) storyBlocks.push({ type: 'quote', content: quotes[i] })
    }

    return (
        <>
            <div className="legend-page" style={{ '--accent-color': legend["AccentColor"] }}>
                <div className="legend-hero">
                    <img className="legend-splash" src={legend["Splash"]} alt={legend["Name"]} />
                    <div className="legend-hero-content">
                        <h2>Legend Profile</h2>
                        <h1>{legend["Name"]}</h1>
                    </div>
                </div>
                <div className="legend-body">
                    <div className="legend-sidebar">
                        <img className="legend-icon" src={legend["Icon"]} alt="" />
                        <div className="result-bar">
                            <span className="result-count">Weapons</span>
                        </div>
                        <div className="weapon-list">
                            {weapons.map(weapon => (
                                <div key={weapon} className="weapon-badge">{weapon}</div>
                            ))}
                        </div>
                    </div>
                    <div className="legend-story">
                        {storyBlocks.map((block, i) =>
                            block.type === 'paragraph' ? (
                                <p key={i} className="legend-paragraph">{block.content}</p>
                            ) : (
                                <blockquote key={i} className="legend-quote">
                                    {block.content.split('\n').map((line, j) => (
                                        <span key={j}>{line}</span>
                                    ))}
                                </blockquote>
                            )
                        )}
                    </div>
                </div>
            </div>
            <button id="theme-button" onClick={() => ChangeTheme(selected_theme === 'dark' ? 'light' : 'dark')}></button>
        </>
    )
}

export default Legend