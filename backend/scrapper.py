import requests
from bs4 import BeautifulSoup
import unicodedata
import json
import time
from io import BytesIO
from PIL import Image
import numpy as np

def remove_accents(text):
    return ''.join(
        c for c in unicodedata.normalize('NFD', text)
        if unicodedata.category(c) != 'Mn'
    )

def get_average_color_from_url(url):
    response = requests.get(url, timeout=10)
    response.raise_for_status()

    img = Image.open(BytesIO(response.content)).convert("RGBA")
    pixels = np.array(img).reshape(-1, 4)

    # keep only non-transparent pixels
    pixels = pixels[pixels[:, 3] > 0][:, :3]
    if len(pixels) == 0:
        return (0, 0, 0)

    avg = pixels.mean(axis=0).astype(int)
    return tuple(avg)  # (R, G, B)

def rgb_to_hex(rgb):
    return "#{:02x}{:02x}{:02x}".format(*rgb)

legends = []
weapons = []

ID = 0

custom_url = "https://www.brawlhalla.com/legends"
headers = {"User-Agent": "Mozilla/5.0"}

request = requests.get(custom_url, headers)
request.encoding = "UTF-8"

soup = BeautifulSoup(request.text, "html.parser")

print(time.strftime("%H:%M:%S"),"- Beginning scrapping process")
for element in soup.find_all("a", class_="svelte-hz0uo7"):
    legend_information = {}

    name = element.find("h3").text
    
    additionnal_request = requests.get(custom_url + "/" + remove_accents(name).lower().replace(" &", "").replace(" ", "-"))
    additionnal_request.encoding = "UTF-8"
    additionnal_soup = BeautifulSoup(additionnal_request.text, 'html.parser')

    print(time.strftime("%H:%M:%S"),"- Searching for : ", additionnal_soup.find('h1', class_="svelte-171b0c4").text)

    legend_information["ID"] = ID
    legend_information["Name"] = additionnal_soup.find('h1', class_="svelte-171b0c4").text
    legend_information["Icon"] = element.find('img', class_="svelte-hz0uo7")["src"]
    legend_information["Splash"] = additionnal_soup.find('img', class_="splash")["src"]
    legend_information["Weapon-1"] = additionnal_soup.find_all("li", class_="svelte-171b0c4")[0].find("span").text
    legend_information["Weapon-2"] = additionnal_soup.find_all("li", class_="svelte-171b0c4")[1].find("span").text

    if legend_information["Weapon-1"] not in weapons:
        weapons.append(legend_information["Weapon-1"])
    if legend_information["Weapon-2"] not in weapons:
        weapons.append(legend_information["Weapon-2"])

    try:
        avg_rgb = get_average_color_from_url(legend_information["Icon"])
        legend_information["AccentColor"] = rgb_to_hex(avg_rgb)
    except Exception as e:
        print(time.strftime("%H:%M:%S"), "- Failed to extract color for", legend_information["Name"], ":", e)
        legend_information["AccentColor"] = "#000000"

    ID += 1

    quotes = 0
    p = 0
    if additionnal_soup.find("div", class_="et_pb_text_inner") is not None:
        for i in range(len(additionnal_soup.find("div", class_="et_pb_text_inner").contents)):
            if additionnal_soup.find("div", class_="et_pb_text_inner").contents[i].name == "blockquote":
                legend_information["Quote-" + str(quotes + 1)] = additionnal_soup.find("div", class_="et_pb_text_inner").contents[i].text
                quotes += 1
            elif additionnal_soup.find("div", class_="et_pb_text_inner").contents[i].name == "p":
                legend_information["Paragraph-" + str(p + 1)] = additionnal_soup.find("div", class_="et_pb_text_inner").contents[i].text
                p += 1
    else:
        for i in range(len(additionnal_soup.find("section", class_="svelte-10q1ed1").contents)):
            if additionnal_soup.find("section", class_="svelte-10q1ed1").contents[i].name == "blockquote":
                legend_information["Quote-" + str(quotes + 1)] = additionnal_soup.find("section", class_="svelte-10q1ed1").contents[i].text
                quotes += 1
            elif additionnal_soup.find("section", class_="svelte-10q1ed1").contents[i].name == "p":
                legend_information["Paragraph-" + str(p + 1)] = additionnal_soup.find("section", class_="svelte-10q1ed1").contents[i].text
                p += 1
    
    legends.append(legend_information)
    
json_file = open("../Frontend/BCodex/src/data.json", 'w', encoding="utf-8")    
json.dump(legends, json_file, indent=4, ensure_ascii=False)
json_file.close()

json_file = open("../Frontend/BCodex/src/weapons.json", 'w', encoding="utf-8")    
json.dump(weapons, json_file, indent=4, ensure_ascii=False)
json_file.close()

print(time.strftime("%H:%M:%S"),"- Finish scrapping legends successfully")