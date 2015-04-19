var express = require('express');
var app = express();

// Setting up creature here, because databases are hard
creatures = [
{
  "id": "0",
  "name": "Bill",
  "type": "Ieki",
  "color": "blue",
  "stats": {
    "defense": 11,
    "intelligence": 15,
    "skill": 12
  },
  "hunger": 100,
  "fatigue": 100,
  "status": "idle",
  "time": 0
},
{
  "id": "1",
  "name": "Ted",
  "type": "Ekana",
  "color": "red",
  "stats": {
    "defense": 15,
    "intelligence": 12,
    "skill": 13
  },
  "hunger": 50,
  "fatigue": 100,
  "status": "sleep",
  "time": 4
}
];

app.get('/creatures/:creature_id', function(req, res) {
  res.status(200).send(creatures[req.params.creature_id]);
});

app.put('/creatures/:creature_id/rest', function(req, res) {
  creatures[req.params.creature_id].fatigue = 100; // pet is no longer fatigued
  creatures[req.params.creature_id].status = "sleeping"; // the pet is sleeping for 9 visits
  creatures[req.params.creature_id].time = 9;

  res.status(204).send(creatures[req.params.creature_id]);
});

app.put('/creatures/:creature_id/feed', function(req, res) {
  creatures[req.params.creature_id].hunger = 100; // pet is no longer hungry
  creatures[req.params.creature_id].status = "eating"; // the pet is eating for 9 visits
  creatures[req.params.creature_id].time = 9; // the pet is eating for 9 visits

  res.status(204).send(creatures[req.params.creature_id]);
});

app.put('/creatures/:creature_id/visit/:page_url', function(req, res) {
  if (creatures[req.params.creature_id].time > 0) {
    creatures[req.params.creature_id].time -= 1;
  }

  // get category of the page
  // hard-coding it to "games"
  var category = "games";

  var skills = ["games", "kids and teens", "recreation", "sports", "shopping"];
  var defense = ["health", "regional", "world", "society", "home"];
  var intelligence = ["arts", "buisness", "computers", "news", "science", "reference"];

  var stat;

  if (skills.indexOf(category) != -1) {
    creatures[req.params.creature_id].hunger -= 2;
    creatures[req.params.creature_id].fatigue -= 2;
    stat = "skills";
  }
  else if(defense.indexOf(category) != -1) {
    creatures[req.params.creature_id].fatigue -= 2;
    stat = "defense";
  }
  else if(intelligence.indexOf(category) != -1) {
    creatures[req.params.creature_id].hunger -= 2;
    stat = "intelligence";
  }

  if (creatures[req.params.creature_id].time < 1) {  // we can go to the stat
    if (stat != undefined) {
      creatures[req.params.creature_id].status = stat;
      creatures[req.params.creature_id].time = 9;
      creatures[req.params.creature_id][stat] += 1;
    }
    else {
      if (creatures[req.params.creature_id].fatigue < 25) {
        creatures[req.params.creature_id].status = "tired";
        creatures[req.params.creature_id].time = 99;
      }
      else if (creatures[req.params.creature_id].hunger < 25) {
        creatures[req.params.creature_id].status = "hungry";
        creatures[req.params.creature_id].time = 99;
      }
      else {
        creatures[req.params.creature_id].status = "idle";
      }
    }
  }
  else {
  }



  res.status(204).send(creatures[req.params.creature_id]);
});

var server = app.listen(3000, function() {
  console.log("running");
});
