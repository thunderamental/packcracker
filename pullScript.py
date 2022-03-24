# Python script to get Scryfall Assets. Why? Because I already did it and I'm not rewriting it in fucken javascript.

from locale import setlocale
import requests
import shutil
import io
import time
import json
# hardcoded for NEO.
# Converts a MTGO .dec style list to the format we use to get Scryfall deck images. Has strict format rules.
def setListGen():
    decklist = []
    for n in range(513):
        decklist.append(["neo", str(n)])
    with open("neo.txt", 'w') as filehandle:
        filehandle.writelines("%s %s\n" % (card[0], card[1]) for card in decklist)
    return decklist

def getCardIcon(set,code):
    response = requests.get("https://api.scryfall.com/cards/"+set+"/"+code)
    try: 
        image_url = response.json()["image_uris"]["png"]
    except: # except double face cards
        image_url = response.json()["card_faces"][0]["image_uris"]["png"]
    fileName = set + code + ".png"
    imgReq = requests.get(image_url, stream = True)
    if imgReq.status_code == 200: # if the request was successful
        imgReq.raw.decode_content = True # make sure we can write the file
        with open(fileName,'wb') as f:
            shutil.copyfileobj(imgReq.raw, f)
    else:
        print("Error retrieving image.")
    
    # shutil is fucking amazing
    shutil.move(set + code + ".png", "SetImages/neo/" + set + code + ".png")
    time.sleep(0.05)

def parse(fileName):
    decklist = []
    #with open(fileName, 'r') as f:
    with io.open(fileName, mode="r", encoding="utf-8") as f:
        deckraw = f.readlines()
        for card in deckraw:
            if card != "\n":
                decklist.append(card.split())
    # print(decklist)
    return decklist

def getDeckIcons(fileName):
    decklist = set(tuple(x) for x in parse(fileName))
    for card in list(decklist):
        try: 
            getCardIcon(card[0],card[1])
        except:
            print(card[0],card[1])


def getSetCardsJSON(set):
    response = requests.get("https://api.scryfall.com/sets/" + set)
    parsed = response.json()
    count = parsed["card_count"]
    jsonarray = []
    for n in range(1, count+1):
        response = requests.get("https://api.scryfall.com/cards/" + set + '/' + str(n))
        parsed = response.json()
        jsonarray.append(parsed)
    with open('neoJSON.txt', 'w', encoding="utf-8") as fout:
        json.dump(jsonarray, fout)
    return jsonarray


#getSetCardsJSON('neo');
with io.open("neoJSON.txt", mode="r", encoding="utf-8") as f:
    parsed = json.loads(f.read())
    print(parsed[500]) # VERY NICE

    # get number of cards in set
    # for cards in set, harvest JSON into array(?)
    # store array somewhere. as text file ??
    
    # json.dump! try out. 
    # can read back natively as json.loads

# setListGen()
# getDeckIcons("neo.txt")

