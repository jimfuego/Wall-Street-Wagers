import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Bets = new Mongo.Collection("bets");

const alpha = require('alphavantage')({ key: process.env.API_KEY });

//publish
Meteor.publish("bets", function betsPublish() {
  return (Bets.find({}));
});

//sets answer to game creator's preference
// FIXME: remove user param
Meteor.methods({
  "bets.insert"(tickerSymbol)  {
    check(tickerSymbol, String);
    // check(highLow, String);
    // check(user, String);


    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      console.log("!userId");
      throw new Meteor.Error("not-authorized");
    }

    //get info on tickerSymbol
    // let apiResponse = JSON.parse(alpha.data.daily_adjusted(tickerSymbol, 1));

    alpha.data.daily_adjusted(tickerSymbol, 1).then(data => {
      // let openingPrice = apiResponse[0].open;
      if(data == undefined || data == null) {
        console.log("No stock data available for ", tickerSymbol);
      }
      let queryResponse = Bets.findOne({ $and: [{gambler: Meteor.user().username}, { tickerSymbol: tickerSymbol }]});
      if(queryResponse != undefined){
        console.log(queryResponse);
        console.log("cant bet same tickersymbol same day");
        return;
      }
      else{
        Bets.insert({
          tickerSymbol : tickerSymbol,
          gambler : Meteor.user().username,
          highOrLow : "",
          createdAt : Date.now()
        });
        console.log(Meteor.user().username + " predicted that " + tickerSymbol +
        " will close (hihgLow)er than it's opening price of (openingPrice)");
        console.log(data);
        return data;
      }
    })
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
