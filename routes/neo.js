var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(`Kamigawa Neon Dynasty landing page. Here is a random number : ${Math.random()}`);
});

router.get('/set', function(req, res, next) {
    res.json(rollSetBoosterDistribution());
});

router.get('/draft', function(req, res, next) {
    res.json(rollSetBoosterDistribution());
});

router.get('/collector', function(req, res, next) {
    res.json('Kamigawa Neon Dynasty collector booster call landing page.');
});

function getRandomInt(min, max) { // min <= roll <= max (inclusive roll)
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// setbooster functions
function rollArtCard() { // 5% are foilstamped
    return getRandomInt(1,81);
} 

function rollFoil() { // Showcase, Borderless, Commander included. Full roll
    return getRandomInt(1,10);
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
    return [seed, slot];
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
            break;
        case (seed > 0.936):
            slot = [1,2];
            break;
        case (seed > 0.905):
            slot = [1,1];
            break;
        case (seed > 0.735):
            slot = [0,2];
            break;
        case (seed > 0.49):
            slot = [1,0];
            break;
    }
    return [seed,`slot = ${slot}`];
}

function rollShowcase() { // single faced showcase C/U
    return 0;
}

function rollSaga() {
    // all 2Faced cards are sagas. ONLY C/Us; R/M sagas drop only in the R/M slot
    return getRandomInt(1,10);
}

function rollUs(n) {
    // n single faced Us
}
function rollCs(n) {
    // n single faced Cs
}

function rollLandSlot() {
    // can be foil.
    // 7% foil ukiyo
    // 33% nonfoil ukiyo
    // otherwise uniform other with 5% foil
    return getRandomInt(1,10);
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
    return [seed, slot];
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
    return [packID,booster];
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
