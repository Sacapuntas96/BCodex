const params = new URLSearchParams(window.location.search);
const name = params.get('name').replaceAll("_", " ");

let index;

let html = document.documentElement;
const saved_theme = localStorage.getItem('theme');

// Loads the saved theme even when the page is closed or refreshed
if(saved_theme){
    html.setAttribute('data-theme', saved_theme);
    if(html.getAttribute('data-theme') == 'dark'){
        document.getElementById('theme-button').style.backgroundImage = "url(../Images/theme_icon.svg)";
    }
    else{
        document.getElementById('theme-button').style.backgroundImage = "url(../Images/theme_icon_light_button.svg)";
    }
}

// Adds functionnality to the switch theme button
document.getElementById('theme-button').addEventListener('click', () =>{
    if(html.getAttribute('data-theme') == 'dark'){
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        document.getElementById('theme-button').style.backgroundImage = "url(../Images/theme_icon_light_button.svg)";
    }
    else{
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        
        document.getElementById('theme-button').style.backgroundImage = "url(../Images/theme_icon.svg)";
    }
})

// Searches for the correct legend in the object
for(let i = 0; i < Object.keys(legends).length; i++){
    if(legends[i]["name"] == name){
        index = i;
        break;
    }
}

document.querySelector('.informations').querySelector('h1').textContent = name;
document.querySelector('.informations').querySelector('h3').textContent = `${legends[index]["weapon1"]} — ${legends[index]["weapon2"]}`;

let i = 0;
let values = legends[index]["stats"];

// Gives the legend attributes in the page
document.querySelectorAll('.stats').forEach(stat =>{
    stat.querySelector('.stat_value').textContent = values[Object.keys(values)[i]];
    stat.querySelector(".progress-bar").style.width = Math.max(values[Object.keys(values)[i]] * 10, 1) + "%";
    i++;
})

document.querySelector('.profile').querySelector('img').src = `../Images/${name.replaceAll(" ", "_")}.png`;

// Adds the legend lore to the page
for(let i = 0; i < Object.keys(legends).length; i++){
    if(name == legends[i]["name"]){
        document.getElementById('stylesheet').sheet.insertRule(`.progress-bar{background-color: ${legends[i]["accentColor"]};}`, document.getElementById('stylesheet').sheet.cssRules.length);
        fetch('../Data/brawlhalla_lore.json')
        .then(res => res.json())
        .then(data => {
            let content = data[legends[i]["name"]].replaceAll(/'''(.*?)'''/g, "<br><br><span class='title'>$1</span><br><br>").replaceAll("{{", '“ ').replaceAll('}}', ' ”').replaceAll('|', ' - ').replaceAll('Dialogue', '<span class="bold">Dialogue</span>');
            document.querySelector('.chest').querySelector('p').innerHTML = `<p>${content}</p>`;
            
        });
    }
}

