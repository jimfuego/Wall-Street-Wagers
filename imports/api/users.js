import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

//add user to database
Meteor.methods({
  "user.insert"(user, password) {
    let profile = {profile: "Default profile value"};
    let wins = {wins: 0};
    let gamesPlayed = {gamesPlayed: 0};
    return Accounts.createUser({
      username: user,
      password: password,
      profile: profile,
      wins: wins,
      gamesPlayed: gamesPlayed
    });
  }
});

// gets total wins for @param user
Meteor.methods({
  "user.getWins"(user) {
    return Accounts.findOne({userName: user}, {_id: 0, username: 0, password: 0, profile: 0, gamesPlayed: 0});
  }
});

// gets total games played for @param user
Meteor.methods({
  "user.getBetsPlaced"(user) {
    return Accounts.findOne({userName: user}, {_id: 0, username: 0, password: 0, profile: 0, wins: 0});
  }
});
