 # packcracker

Node / Express API to generate draft / set / collector boosters! WIP. Now comes with a nifty React frontend to scratch that pack opening serotonin!
Check in later when I get around to hosting it on Heroku or something. 

![Screengrab](screengrab.png)

- [x] Establish distributions for set and draft boosters
- [x] pull full png image directory from scryfall. If failure- check Gatherer.
- [x] Sort the image directory - use script on Scryfall JSON for the set. (Somewhat done. Python helper now can parse, we just need to write the condition on the cards like catching keyerrors etc.)
- [x] Split up card pool into independent roll pools!
- [x] Make javascript / express roll on each pool and deliver via API!
- [ ] Deliver static images (how? learn)
- [x] Start work on React front end
- [x] Add framing and menu options for the react front end
- [x] Make back end deliver the scryfall .png link as well
- [ ] Fix nav bar (rename, add logo)
- [ ] Convert to multipage app - react routing should match the server API - for draft and collector boosters.
- [ ] Get around to deleting the images, since we're grabbing the scryfall png link directly. 


 - [x] Hosted on DigitalOcean!
 - [x] Bought the domain name!
 - [x] Fixed the horrific fetch bug (thank god for Axios)
 - [ ] Figure out proxy and naming - nginx ?
 - [ ] Add https support
 - [ ] check on the name for google domains