import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Bets = new Mongo.Collection("bets");

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

    // Make sure the user is logged in before inserting a task
    // if (!this.userId) {
    //   throw new Meteor.Error("not-authorized");
    // }

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
