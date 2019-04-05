import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Bets = new Mongo.Collection("bets");

// const PUBLIC_KEY = process.env.API_KEY;
const PUBLIC_KEY = "AD7JAZ51CFHTA74D";
const alpha = require('alphavantage')({ key: PUBLIC_KEY });

//publish
Meteor.publish("bets", function betsPublish() {
  return (Bets.find({}));
});

//sets answer to game creator's preference
// FIXME: remove user param
Meteor.methods({
  "bets.insert"(user, tickerSymbol, highLow)  {
    check(tickerSymbol, String);
    check(highLow, String);
    check(user, String);

    alert("key: ", PUBLIC_KEY);

    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    //get info on tickerSymbol
    let apiResponse = JSON.parse(alpha.data.daily_adjusted(tickerSymbol, 1));
    let openingPrice = apiResponse[0].open;
    if(apiResponse == undefined || apiResponse == null) {
      alert("No stock data available for ", tickerSymbol);
    }
    else{
      //find one user&tickerSymbol, return error, or something
      if(Bets.findOne({gambler: user, tickerSymbol: tickerSymbol}) != undefined){
        return;
      }

      //document does not exist
      else {
        Bets.insert({
          tickerSymbol : tickerSymbol,
          gambler : Meteor.user().user,
          highOrLow : highLow,
          createdAt : new Date
        });
        alert(Meteor.user().user + " predicted that " + tickerSymbol +
        " will close " + highLow + "er than it's opening price of "
        + openingPrice);
      }
    }
  }
});

//deletes all bets (don't do this)
Meteor.methods({
  "bets.deleteAll"() {
    Bets.remove({});
  }
});

//deletes bet for specified user and tickersymbol (do this)
Meteor.methods({
  "bets.deleteOne"(username, tickerSymbol) {
    Bets.remove({username: username, tickerSymbol: tickerSymbol});
  }
});

//checks if @param guess matches the answer string
Meteor.methods({
  "bets.checkSolution"(guess)  {
    check(guess, String);
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    if (Bets.findOne({answer : guess}) != undefined) {
      // Answer.remove({});
      //game over - winner
      return true;
    }
    else{
      //continue game
      return false;
    }
  }
});

Meteor.methods({
  "bets.endGame" () {
    Bets.update({}, {
      $set:{
        answer :"",
        player : "",
        gameInProgress : false
      }
    });
  }
});

//returns true if a game is in progress
Meteor.methods({
  "bets.checkInProgress"() {
    return (Bets.findOne({gameInProgress : true})!=undefined);
  }
});
