var express = require('express');
var router = express.Router();

var fs = require('fs');
var _ = require('underscore');

function roll(pool) {
    var array = fs.readFileSync(`../SetRolls/${pool}.txt`).toString().split("\n");
    array.pop();
    return _.sample(array);
}

function testInput() {
    var array = fs.readFileSync('../SetRolls/neoFoil.txt').toString().split("\n");
    for(i in array) {
        console.log(array[i]);
    }
    return array;
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(`Kamigawa Neon Dynasty landing page. Here is the parsed input : ${testInput()}`);
});

router.get('/set', function(req, res, next) {
    res.json(rollSetBoosterDistribution());
});

router.get('/draft', function(req, res, next) {
    res.json(rollDraftBoosterDistribution());
});

router.get('/collector', function(req, res, next) {
    res.json('Kamigawa Neon Dynasty collector booster call landing page uwu.');
});

function getRandomInt(min, max) { // min <= roll <= max (inclusive roll)
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// setbooster functions
function rollArtCard() { // 5% are foilstamped
    return roll("aneoFull")
} 

function rollFoil() { // Showcase, Borderless, Commander included. Full roll
    return roll("neoFoil") // UNIFORM ROLL
}

function rollRM() { // Showcase, Borderless included. nonfoil.
    var seed = Math.random();
    var slot = "rare";
    switch (true) {
        // fall through the switch downwards, catching each case
        // distribution on mythic roll 
        case (seed > 0.86486486486):
            slot = "mythic";
    }
    // return [seed, slot];
    if (slot == 'rare') {
        return roll("neoRare");
    } else {
        return roll("neoMythic");
    }
}

function rollWildcard2() { // Showcase, Borderless, Commander included. Full roll + Ukiyo
    var seed = Math.random();
    // 0 -> common, 1 -> unc, 2 -> rare, then reroll rare slots
    var slot = [0,0]
    switch (true) {
        // fall through the switch downwards, catching each case
        // distribution on number of uncommon
        case (seed > 0.979):
            slot = [2,2];
            return [roll("neoWCR"), roll("neoWCR")];
            break;
        case (seed > 0.936):
            slot = [1,2];
            return [roll("neoWCU"), roll("neoWCR")];
            break;
        case (seed > 0.905):
            slot = [1,1];
            return [roll("neoWCU"), roll("neoWCU")];
            break;
        case (seed > 0.735):
            slot = [0,2];
            return [roll("neoWCC"), roll("neoWCR")];
            break;
        case (seed > 0.49):
            slot = [1,0];
            return [roll("neoWCU"), roll("neoWCC")];
            break;
    }
    return [roll("neoWCC"), roll("neoWCC")];
}

function rollShowcase() { // single faced showcase C/U
    return roll("neoShowcaseUC");
}

function rollSaga() {
    // all 2Faced cards are sagas. ONLY C/Us; R/M sagas drop only in the R/M slot
    return roll("neoSagasUC");
}

function rollUs(n) {
    // n single faced Us
    var uncs = []
    for (var i = 0; i < n; i++) {
        uncs.push(roll("neoUncommon"));
    }
    return uncs;
}
function rollCs(n) {
    // n single faced Cs
    var cs = []
    for (var i = 0; i < n; i++) {
        cs.push(roll("neoCommon"));
    }
    return cs;
}

function rollLandSlot() {
    // can be foil.
    // 7% foil ukiyo
    // 33% nonfoil ukiyo
    // otherwise uniform other with 5% foil
    
    var seed = Math.random();
    switch (true) {
        // fall through the switch downwards, catching each case
        // distribution on mythic roll 
        case (seed > 0.66):
            return roll("neoUkiyo");
    }
    return roll("neoBasics");
}

function rollListCard() {
    var seed = Math.random();
    var slot = "ad or token";
    switch (true) {
        // fall through the switch downwards, catching each case
        // distribution on mythic roll 
        case (seed > 0.75):
            slot = "List card";
    }
    return roll("tneoAll");
}

function rollSixCU() { // split this function, DEPRECATED!
    var seed = Math.random();
    var uncommons = 1;
    switch (true) {
        // fall through the switch downwards, catching each case
        // distribution on number of uncommon
        case (seed > 0.98):
            uncommons++;
            
        case (seed > 0.945):
            uncommons++;

        case (seed > 0.875):
            uncommons++;

        case (seed > 0.75):
            uncommons++;
            
        case (seed > 0.35):
            uncommons++;
                
    }
    return [seed,`uncommons = ${uncommons}, commons = ${6-uncommons}`];
}

function extractSet(booster) {
    var res = [];
    res.push(booster['artCard']);
    res.push(booster['foil']);
    res.push(booster['rare']);
    res.push(booster['wildcard'][0]);
    res.push(booster['wildcard'][1]);
    res.push(booster['showcase']);
    res.push(booster['saga']);
    res.push(booster['u2'][0]);
    res.push(booster['u2'][1]);
    res.push(booster['c3'][0]);
    res.push(booster['c3'][1]);
    res.push(booster['c3'][2]);
    res.push(booster['land']);
    res.push(booster['list']);
    cardIDs = [];
    
    // console.log(res);
    for (let i = 0; i < (res.length); i++) {
        
        cardIDs.push(res[i].split(' ').slice(0,3))
    }
    return cardIDs;
}

// distn: https://media.wizards.com/2022/images/daily/en_qkixzKwLq3.jpg
function rollSetBoosterDistribution() {
    var packID = 1;
    var booster = {
        artCard : rollArtCard(),
        foil : rollFoil(),
        rare : rollRM(),
        wildcard : rollWildcard2(),
        showcase : rollShowcase(),
        saga : rollSaga(),
        u2 : rollUs(2),
        c3 : rollCs(3),
        land : rollLandSlot(),
        list : rollListCard()
    };
    //console.log(booster)
    
    console.log(extractSet(booster))
    
    return [packID,booster,extractSet(booster)];
}

function rollDraftBoosterDistribution() {
    var packID = 1;
    var booster = {
        rare : rollRM(),
        saga : rollSaga(),
        u3 : rollUs(3),
        c9 : rollCs(9),
        land : rollLandSlot()
    }
}

function rollCollectorBoosterDistribution() {
    var packID = 1;
    var booster = {
        
    }
}

module.exports = router;
