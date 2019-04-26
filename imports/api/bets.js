/*import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Bets = new Mongo.Collection("bets");

//process.env.API_KEY
//const alpha = require('alphavantage')({ key: PUBLIC_KEY });

//const alpha = require('alphavantage')({ key: process.env.API_KEY });
const PUBLIC_KEY = "AD7JAZ51CFHTA74D";
const alpha = require('alphavantage')({ key: PUBLIC_KEY });


//publish
if (Meteor.isServer) {
  
Meteor.publish("bets", function betsPublish() {
  return (Bets.find({}));
});

}
//sets answer to game creator's preference
// FIXME: remove user param
Meteor.methods({
  async "bets.insert"(tickerSymbol, highLow)  {
    check(tickerSymbol, String);
     check(highLow, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      console.log("!userId");
      throw new Meteor.Error("not-authorized");
    }

    // get today's date
    let d = new Date();
    let weekday = d.getDay()+1;
    let dayOfMonth = d.getDate();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let monthString = (month < 9) ? "0" + month : month;
    let todaysDate = year + "-" + monthString + "-" + dayOfMonth;

    // make sure this is not a duplicate bet
    let queryResponse = Bets.findOne({ $and: [{ gambler: Meteor.user().username }, { tickerSymbol: tickerSymbol }]});
    if(queryResponse != undefined){
      console.log(queryResponse);
      console.log("cant bet same tickersymbol same day");
      return;
    }

    // get info on tickerSymbol
    // let apiResponse = JSON.parse(alpha.data.daily_adjusted(tickerSymbol, 1));
    return await alpha.data.daily_adjusted(tickerSymbol, 1).then(data => {

      // attempt to parse
      let justNYSEThings = data["Time Series (Daily)"];
      let todaysData =  justNYSEThings[todaysDate];
      let todaysOpening = todaysData["1. open"];
      console.log("today's date: ", todaysDate);
      console.log("today's data: ", justNYSEThings[todaysDate]);
      console.log("Today's opening: ", todaysOpening);

      // there ought to be some date around here somewhere
      if(data == undefined || data == null) {
        console.log("No stock data available for ", tickerSymbol);
        return "No stock data available for " + tickerSymbol + " on " + todaysDate;
      }
      else{
        // insert bet
        Bets.insert({
          gambler : Meteor.user().username,
          tickerSymbol : tickerSymbol,
          highOrLow : highLow,
          createdAt : todaysDate,
          openingPrice: todaysOpening
        });
        console.log("SUCCESS: " + Meteor.user().username + " predicted that " + tickerSymbol +
        " will close " + highLow + "er than it's opening price of " + todaysOpening);
        var result ="SUCCESS: " + Meteor.user().username + " predicted that " + tickerSymbol +
        " will close " + highLow + "er than it's opening price of " + todaysOpening;
        return result;
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

// this does not belong here
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
});*/

import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Accounts } from "meteor/accounts-base";

export const Bets = new Mongo.Collection("bets");

//process.env.API_KEY
const alpha = require('alphavantage')({ key: process.env.API_KEY });
//const PUBLIC_KEY = "AD7JAZ51CFHTA74D";
//const alpha = require('alphavantage')({ key: PUBLIC_KEY });


//publish
if (Meteor.isServer) {
  Meteor.publish("bets", function betsPublish() {
    return (Bets.find({}));
  });
}

//sets answer to game creator's preference
// FIXME: remove user param
Meteor.methods({
  async "bets.insert"(tickerSymbol, highLow)  {
     check(tickerSymbol, String);
     check(highLow, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      console.log("!userId");
      throw new Meteor.Error("not-authorized");
    }

    // get today's date
    let d = new Date();
    let weekday = d.getDay() + 1;
    let dayOfMonth = d.getDate();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let monthString = (month < 9) ? "0" + month : month;
    let todaysDate = year + "-" + monthString + "-" + dayOfMonth;

    // make sure this is not a duplicate bet
    let queryResponse = Bets.findOne({ $and: [{ gambler: Meteor.user().username }, { tickerSymbol: tickerSymbol }]});
    if(queryResponse != undefined){
      console.log(queryResponse);
      console.log("cant bet same tickersymbol same day");
      return;
    }

    // get info on tickerSymbol
    return await alpha.data.daily_adjusted(tickerSymbol, 1).then(data => {
      // attempt to parse
      let justNYSEThings = data["Time Series (Daily)"];
      let todaysData =  justNYSEThings[todaysDate];
      let todaysOpening = todaysData["1. open"];
      console.log("today's date: ", todaysDate);
      console.log("today's data: ", justNYSEThings[todaysDate]);
      console.log("Today's opening: ", todaysOpening);

      // there ought to be some date around here somewhere
      if(data == undefined || data == null) {
        console.log("No stock data available for ", tickerSymbol);
        return "No stock data available for " + tickerSymbol + " on " + todaysDate;
      }
      else{
        // insert bet
        Bets.insert({
          gambler : Meteor.user().username,
          gamblerID: Meteor.user().userId,
          tickerSymbol : tickerSymbol,
          highOrLow : highLow,
          createdAt : todaysDate,
          openingPrice: todaysOpening
        });
        var result ="SUCCESS: " + Meteor.user().username + " predicted that " + tickerSymbol +
        " will close " + highLow + "er than it's opening price of " + todaysOpening;
        console.log(result);
        return result;
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
      return true;
    }
    else{
      return false;
    }
  }
});

// this does not belong here
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
    return (Bets.findOne({gameInProgress : true}) != undefined);
  }
});

// evaluates all single player bets
Meteor.methods({
  async "bets.evaluateAll"() {
    let allBets = [];
    allBets = Bets.find({});
    for (let i = 0; i < allBets.length ; i++) {
      // get "this" bet and fields
      let bet = allBets[i];
      let gamblerID = bet["gamblerID"];
      let tickerSymbol = bet["tickerSymbol"];
      let highLow = bet["highOrLow"];
      let betDate = bet["todaysDate"];

      // call api and eval "this" bet
      await alpha.data.daily_adjusted(tickerSymbol, 1).then(data => {
        // get "this" stocks closing values
        let justNYSEThings = data["Time Series (Daily)"];
        let betData = justNYSEThings[betDate];
        let betOpening = parseFloat(betData["1. open"]);
        let closePrice = parseFloat(betData["4. close"]);

        //get winz
        let wins = parseInt(Meteor.users.findOne({gamblerID: gamblerID}))["wins"];

        // if user bet "high"
        if (highLow === "high") {
          if (closePrice > betOpening){
            //user wins
            Meteor.users.update({_id:gamblerID}, { $set: {wins: wins + 1} });
          }
          else{
            //user is a loser
          }
        }
        //if user bet "low"
        else if (highLow === "low") {
          if (closePrice < betOpening){
            //user wins
            Meteor.users.update({_id:gamblerID}, { $set: {wins: wins + 1} });
          }
          else {
            // user is a loser
          }
        }
      })
    }
    Bets.remove({});
  }
});
