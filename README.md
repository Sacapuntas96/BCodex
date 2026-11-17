# BCodex

A codex of Brawlhalla legends. Browse every legend, search by name, filter by weapon, and open a profile page with the legend's lore.

All the data lives in local JSON files, and the icons and splash art are loaded from the official Brawlhalla CMS (`cms.brawlhalla.com`).

## What it does

- Lists all 70 legends in a grid, each card showing the icon, the two weapons, a roster number, and a glow in the legend's own accent color
- Search by legend name, by pressing Enter or clicking the Search button
- Filters by weapon, with one button per weapon (15 in total) plus "All"
- Shows a live count of the legends currently displayed
- Opens a profile page for each legend (`legend.html?id=<ID>`) with the splash art, the icon, the two weapons, and the story
- Switches between a dark and a light theme, remembers your choice in `localStorage`, and applies it to both pages

### The legend page

The story is built from the `Paragraph-N` and `Quote-N` fields of the legend and displayed in the order Paragraph-1, Quote-1, Paragraph-2, Quote-2, and so on. Line breaks inside a quote are kept. If a legend has only one weapon, only that one is shown.

## Stack

- React with Vite for the frontend, plain CSS, no UI library
- Legend and weapon data stored as JSON files, no backend or database

## Project structure

```
.
├── index.html                # Home page
├── legend.html               # Legend profile page
└── src/
    ├── main.jsx              # Entry point for the home page
    ├── App.jsx               # Legend list, search, and weapon filters
    ├── App.css
    ├── LegendCard.jsx        # One legend card
    ├── second.jsx            # Entry point for the legend page
    ├── Legend.jsx            # Legend profile page
    ├── Legend.css
    ├── index.css
    ├── data.json             # The legends
    ├── weapons.json          # Weapon names used by the filter
    └── assets/
        └── Icons/            # light-theme-icon.svg and dark-theme-icon.svg
```

## Running it

```bash
git clone https://github.com/<your-username>/BCodex.git
cd BCodex
npm install
npm run dev
```

## Adding or editing a legend

Each entry in `data.json` is one legend:

```json
{
  "ID": 0,
  "Name": "Bödvar",
  "Icon": "https://...",
  "Splash": "https://...",
  "Weapon-1": "Hammer",
  "Weapon-2": "Sword",
  "AccentColor": "#00B289",
  "Paragraph-1": "...",
  "Quote-1": "...",
  "Paragraph-2": "...",
  "Quote-2": "..."
}
```

- `ID` must be unique. It is used in the profile URL, and the roster number shown on the card is `ID + 1`.
- Add as many `Paragraph-N` and `Quote-N` fields as you need.
- `Weapon-1` and `Weapon-2` must match a name in `weapons.json`, otherwise the weapon filter will not find the legend.
- `AccentColor` is any CSS color. It sets the card glow and the underline under the name on the profile page.

## Things to know

- The data is a fixed snapshot. Nothing updates on its own, so new legends have to be added to `data.json` by hand.
- Icons and splash art are hotlinked from `cms.brawlhalla.com`. You need an internet connection to see them, and they will break if the site changes its URLs.
- Search only runs when you press Enter or click Search, not while you type.
- Opening `legend.html` with an ID that does not exist leaves the page on "Loading legend...".
- This is a fan project. It isn't affiliated with Brawlhalla, Blue Mammoth Games, or Ubisoft, and the legend names, artwork, and lore belong to their respective owners.
