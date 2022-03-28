# packcracker

Node / Express API to generate draft / set / collector boosters! WIP. 
Check in later for the React frontend. 

- [x] Establish distributions for set and draft boosters
- [x] pull full png image directory from scryfall. If failure- check Gatherer.
- [x] Sort the image directory - use script on Scryfall JSON for the set. (Somewhat done. Python helper now can parse, we just need to write the condition on the cards like catching keyerrors etc.)
- [x] Split up card pool into independent roll pools!
- [x] Make javascript / express roll on each pool and deliver via API!
- [ ] Deliver static images (how? learn)
- [ ] Start work on React front end