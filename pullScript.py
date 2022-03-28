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

# loadSet("aneo")

def necSampler(no):
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
# necSampler(0)

# placeholder function always outputs false. terminal functor
def falseReturner(x):
    return False

def trueAll(x):
    return True

# filters document for the condition provided. Outputs txt file to local directory.
def filtertime(set, condName = "Filtered", condition = falseReturner):
    filtered = []
    with io.open("SetData/" + set + "JSON.txt", mode="r", encoding="utf-8") as f:
        parsed = json.loads(f.read())
        for card in parsed:
            if (condition(card)):
                filtered.append([set, card["collector_number"], card["name"]])
    with open(set + condName + ".txt", 'w') as filehandle:
        filehandle.writelines("%s %s %s\n" % (card[0], card[1], card[2]) for card in filtered)
    shutil.move(set + condName + '.txt', "SetRolls/" + set + condName + '.txt')

# Filtration functions

def common(card):
    if ("common" == card['rarity'] 
        and "Saga" not in card['type_line']
        and "Land" not in card['type_line']):
            try:
                if ("showcase" in card['frame_effects']) :
                # this actually checks only if ['frame_effects'] throws a keyerror..
                    return False
            except:
                print("non-showcase Common detected- single sided (not saga)")
                return True
    return False

def uncommon(card):
    if ("uncommon" == card['rarity'] 
        and "Saga" not in card['type_line']):
            try:
                if ("showcase" in card['frame_effects']) :
                    return False
            except:
                print("non-showcase Uncommon detected- single sided (not saga)")
                return True
    return False

def sagasUC(card):
    try:
        if ("Saga" in card['type_line'] 
                and "mythic" != card['rarity'] 
                and "rare" != card['rarity']):
            print("U/C Saga detected")
            return True
    except KeyError:
        return False
    return False

def rare(card):
    try:
        if ("rare" == card['rarity']):
            print("Rare detected")
            return True
    except KeyError:
        return False
    return False

def mythic(card):
    try:
        if ("mythic" == card['rarity']):
            print("Mythic detected")
            return True
    except KeyError:
        return False
    return False

def extendedart(card):
    try:
        if ("extendedart" in card['frame_effects']):
            print("Extended art detected")
            return True
    except KeyError:
        return False

def showcase(card):
    try:
        if ("showcase" in card['frame_effects']
                and "etched" not in card['frame_effects']):
            print("Showcase art detected - not etched")
            return True
    except KeyError:
        return False
    return False

def showcaseUC(card):
    try:
        if ("showcase" in card['frame_effects']
                and "rare" != card['rarity'] 
                and "mythic" != card['rarity']):
            print("Showcase art detected - common or uncommon")
            return True
    except KeyError:
        return False
    return False


def ukiyo(card) :
    try:
        if ("fullart" in card['frame_effects']
                and "Basic Land" in card['type_line']):
            print("Ukiyo Land detected")
            return True
    except KeyError:
        return False
    return False

def basics(card) :
    if ("common" == card['rarity'] 
        and "Land" in card['type_line']):
            try:
                if "showcase" in card['frame_effects'] :
                    return False
            except:
                print("non-Ukiyo common land detected")
                return True
    return False

def wildC(card) :
    return ("common" == card['rarity']
                and "Land" not in card['type_line']) # lands don't drop in WC

def wildU(card) :
    return ("uncommon" == card['rarity'])

def wildR(card) :
    return ("rare" == card['rarity'])

def wildM(card) :
    return ("mythic" == card['rarity'])

print("Filters begin")
filtertime("nec", "ExtendedArt", extendedart) # no non-crackable cards (<77)
# filtertime("nec", "Showcase", showcase) # does not appear in packs
filtertime("neo", "ExtendedArt", extendedart)
filtertime("neo", "ShowcaseUC", showcaseUC)
filtertime("neo", "SagasUC", sagasUC)
filtertime("neo", "Common", common)
filtertime("neo", "Uncommon", uncommon)
filtertime("neo", "Rare", rare)
filtertime("neo", "Mythic", mythic)
filtertime("neo", "Ukiyo", ukiyo)
filtertime("neo", "Basics", basics)

filtertime("neo", "WCC", wildC)
filtertime("neo", "WCU", wildU)

exit()

# EDITED FILES

filtertime("neo", "Showcase", showcase) # removed the 4 hidetsugu.
filtertime("neo", "WCR", wildR) # removed neo417-428 Etcheds; added necWCR to this
filtertime("neo", "WCM", wildM) # removed neo417-428 Etcheds; added necWCR to this

filtertime("nec", "WCR", wildR) # removed non-crackable cards (<77)
filtertime("nec", "WCM", wildM) # removed non-crackable cards (<77)

filtertime("neo", "Full", trueAll) # combined into neoFoil
filtertime("aneo", "Full", trueAll) # combined into neoFoil
filtertime("nec", "Full", trueAll) # removed non-crackable cards (<77)