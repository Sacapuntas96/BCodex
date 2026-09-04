# BCodex

**Every legend. Every weapon. One arena.**

BCodex is a fan-made web codex for *Brawlhalla* — browse every legend, filter by weapon type, and dive into detailed stats and lore for each character, all wrapped in a clean, theme-aware interface.

## Features

- 🔍 **Search** — instantly search for any legend by name, with live result counts
- 🪓 **Weapon filters** — filter the full roster by any of the 15 Brawlhalla weapon types (Axe, Sword, Katars, Hammer, and more)
- 🌗 **Light / Dark theme** — theme preference is saved and persisted across visits via `localStorage`
- 📊 **Legend profiles** — dedicated pages per legend showing weapon pairings, stat bars (Strength, Dexterity, Defense, Speed) styled with each legend's signature accent color
- 📜 **Lore viewer** — full in-game lore text for every legend, pulled from a local JSON dataset and formatted with styled section titles and dialogue call-outs
- ✨ **Animated UI** — smooth number-counting animation for search/filter results, hover glow effects per legend using their accent color

## Tech Stack

- **HTML / CSS / JavaScript** — no frameworks, built from scratch
- **Google Fonts** — Bebas Neue & Inter
- **JSON** — legend and lore data stored locally (`legends-data.js`, `brawlhalla_lore.json`)

## Project Structure

```
BCodex/
├── index.html            # Home page — search, filters, legend grid
├── legend.html           # Individual legend profile page
├── Scripts/
│   ├── main.js           # Home page logic (search, filters, theming)
│   ├── legend.js         # Legend profile logic (stats, lore, theming)
│   └── legends-data.js   # Legend dataset
├── Styles/
│   ├── Index.css
│   └── Profile.css
├── Data/
│   └── ...                # Lore JSON and other data files
├── Images/
│   └── ...                # Legend icons & profile art
└── Font/
    └── ...                # Custom font files
```

## Getting Started

1. Clone the repo
   ```bash
   git clone https://github.com/your-username/BCodex.git
   ```
2. Open `Index.html` in your browser (or serve the folder with a local server, e.g. `npx serve`)
3. Browse, search, and explore the arena

## Notes

This is a fan project and is not affiliated with or endorsed by Blue Mammoth Games / Ubisoft. All legend names, artwork references, and lore content belong to their respective owners.
