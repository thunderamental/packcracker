# Python script to get Scryfall Assets. Why? Because I already did it and I'm not rewriting it in fucken javascript.

from locale import setlocale
import requests
import shutil
import io
import time
import json
import os

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
    shutil.move(set + code + ".png", "SetImages/" + set + '/' + set + code + ".png")
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

def getSetPNGs(fileName): # thanks s7b!
    decklist = set(tuple(x) for x in parse(fileName))
    print(list(decklist)[0][0])
    if not os.path.exists("SetImages/" + str(list(decklist)[0][0]) + '/'):
        os.makedirs(os.path.dirname(
            "SetImages/" + str(list(decklist)[0][0]) + '/'
            ))
    for card in list(decklist):
        try: 
            getCardIcon(card[0],card[1])
        except:
            print(card[0],card[1])

# calls the scryfall API, eats JSON , writes into into text files, moves them into ./SetData
def getSetCardsJSON(set, count=0): # test the default count later
    response = requests.get("https://api.scryfall.com/sets/" + set)
    parsed = response.json()
    count = parsed["card_count"]
    print("cards in set : " + str(count))
    jsonarray = []
    for n in range(1, count+1):
        response = requests.get("https://api.scryfall.com/cards/" + set + '/' + str(n))
        print("Called api on " + str(n))
        parsed = response.json()
        jsonarray.append(parsed)
        time.sleep(0.05)
    with open(set + 'JSON.txt', 'w', encoding="utf-8") as fout:
        json.dump(jsonarray, fout)

    decklist = []
    for n in range(1,count+1): # 1 to set count.
        decklist.append([set, str(n)])
    with open(set + ".txt", 'w') as filehandle:
        filehandle.writelines("%s %s\n" % (card[0], card[1]) for card in decklist)

    shutil.move(set + 'JSON.txt', "SetData/" + set + 'JSON.txt')
    shutil.move(set + '.txt', "SetData/" + set + '.txt')

# getSetPNGs("SetData/nec.txt")

def loadSet(set) :
    getSetCardsJSON(set)
    getSetPNGs("SetData/" + set + ".txt")


def sampler(no):
    with io.open("SetData/necJSON.txt", mode="r", encoding="utf-8") as f:
        parsed = json.loads(f.read())
        # print(parsed[500]) # indexes correctly. nice
        sample = parsed[no] # zerobased indexing. this actually returns the index+1 collector number card.
        print(json.dumps(sample, indent=4, sort_keys=True))
        with open('sample', 'w', encoding="utf-8") as fout:
            fout.write(json.dumps(sample, indent=4, sort_keys=True))

        # get number of cards in set
        # for cards in set, harvest JSON into array(?)
        # store array somewhere. as text file ??
        
        # json.dump! try out. 
        # can read back natively as json.loads
sampler(0)

def falseReturner(x):
    return False

def filtertime(set, condition = falseReturner):
    filtered = []
    with io.open("SetData/" + set + "JSON.txt", mode="r", encoding="utf-8") as f:
        parsed = json.loads(f.read())
        for card in parsed:
            if (condition(card)):
                filtered.append([set, card["collector_number"]])
    with open(set + "Filtered.txt", 'w') as filehandle:
        filehandle.writelines("%s %s\n" % (card[0], card[1]) for card in filtered)

def showcase(card):
    return False

def extendedart(card):
    print("Extended art detected")
    try:
        return ("extendedart" in card['frame_effects'])
    except KeyError:
        return False

filtertime("nec", extendedart)