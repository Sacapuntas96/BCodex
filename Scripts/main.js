let dark_theme_enabled = true;
let stylesheet = document.getElementById('stylesheet');

let count = 0;

let html = document.documentElement;
const saved_theme = localStorage.getItem('theme');

// Loads the saved theme even when the page is closed or refreshed
if(saved_theme){
    html.setAttribute('data-theme', saved_theme);
}

if(html.getAttribute('data-theme') == 'dark'){
    document.getElementById('theme-button').style.backgroundImage = "url(../Images/theme_icon.svg)";
}
else{
    document.getElementById('theme-button').style.backgroundImage = "url(../Images/theme_icon_light_button.svg)";
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

let container = document.querySelector('.legends');

// Adds all the legends to the HTML
for(let i = 0; i < Object.keys(legends).length; i++){

    let first_weapon = legends[i]["weapon1"].replace(" ", "_");
    let second_weapon = legends[i]["weapon2"].replace(" ", "_");

    let name = legends[i]["name"].replaceAll(" ", "");

    container.insertAdjacentHTML('beforeend', 
                `<div class="legend-profile" data-index="${i}">
                    <div class="legend-image">
                        <img src="../Images/128px-SkinIcon_${name}_Classic.webp" alt="">
                    </div>
                        <div class="legend-information">
                            <p>${legends[i]["weapon1"]} — ${legends[i]["weapon2"]}</p>
                            <h3>${legends[i]["name"]}</h3>
                            <div class="stats">
                                <h3>Strength</h3>
                                <p>${legends[i]["stats"]["strength"]}</p>
                            </div>
                            <div class="stats">
                                <h3>Dexterity</h3>
                                <p>${legends[i]["stats"]["dexterity"]}</p>
                            </div>
                            <div class="stats">
                                <h3>Defense</h3>
                                <p>${legends[i]["stats"]["defense"]}</p>
                            </div>
                            <div class="stats">
                                <h3>Speed</h3>
                                <p>${legends[i]["stats"]["speed"]}</p>
                            </div>
                        </div>
                    </div>`, );
    
    document.getElementById('stylesheet').sheet.insertRule(`.legend-profile[data-index="${i}"]:hover{outline: 2px solid ${legends[i]["accentColor"]}; box-shadow: 0px 0px 100px ${legends[i]["accentColor"]}}`, document.getElementById('stylesheet').sheet.cssRules.length);

    document.querySelector(`.legend-profile[data-index="${i}"]`).addEventListener('click', () => {
        window.location.href = `legend.html?name=${encodeURIComponent(legends[i]["name"])}`;
    });
}

// Allows user to press enter to search for a legend
document.getElementById('search-input').addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        document.getElementById('search-button').click();
    }
})

// Handles the case where no legends were found
let error_message = document.querySelector('.chest').querySelector('h1')
error_message.style.display = "none";
document.getElementById('result-count').innerHTML = `————— <span id="count-span">${Object.keys(legends).length}</span> Result —————`;

// Allow to search for legends
document.getElementById('search-button').addEventListener('click', () =>{
    let query = document.getElementById('search-input').value.toLowerCase();
    if(current_filter != query){
if(query.length > 0){
        let old_count = count;
        count = 0;
        document.querySelectorAll('.legend-profile').forEach(prof => {
        if(prof.querySelector('h3').textContent.toLowerCase().includes(query)){
            prof.style.display = "flex";
            count++;
        }
        else{
            prof.style.display = "none";
        }
        }) 
    
        if(count == 0){
            error_message.style.display = "flex";
            document.querySelector('.chest').style.height = 1000 + "px";
        }   
        else{
            error_message.style.display = "none";
            document.querySelector('.chest').style.height = 5500 + "px";
        }

        animateNumber(old_count, count, 400);
    }
    else{
        document.querySelectorAll('.legend-profile').forEach(pro =>{
            pro.style.display = "flex";
            animateNumber(count, 70, 400);
        })
    }
    }
    

    current_filter = query;
})

// Allows the user to filter the legends by weapons
let legend_list = document.querySelector('.legends');
let current_filter = "";
document.querySelector('.filters').querySelectorAll('button').forEach(btn =>{
    

    btn.addEventListener('click', () =>{
        let old_count = Number(document.getElementById('count-span').textContent);
        let query = btn.textContent;
        document.querySelector('.filters').querySelectorAll('button').forEach(button => {
            if(query != button.textContent){
                button.style.border = "1px solid var(--grey-6)";
            }
            else{
                button.style.border = "1px solid var(--yellow-7)";
            }
        })
        
        if(current_filter != query){
            legend_list.querySelectorAll('.legend-profile').forEach(profile =>{
                profile.style.display = "flex";
            })
            let count = 0;
            legend_list.querySelectorAll('.legend-profile').forEach(pro =>{
            if(query != "All")
            {
                if(query != legends[pro.dataset.index]["weapon1"] && query != legends[pro.dataset.index]["weapon2"]){
                    pro.style.display = "none";
                }
                else{
                    count++;
                } 
            }
            else{
                count++;
            }
            
        })
        console.log(old_count, count);
        animateNumber(old_count, count, 400);
        }
        
        current_filter = query;
    })
})

// Animates the search count
function animateNumber(oldValue, newValue, duration) {
    const startTime = performance.now();
    const countSpan = document.getElementById('count-span');

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); 
        const eased = 1 - (1 - progress) * (1 - progress);

        const current = oldValue + (newValue - oldValue) * eased;
        countSpan.textContent = Math.round(current);

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            countSpan.textContent = Math.round(newValue); 
        }
    }

    requestAnimationFrame(step);
}