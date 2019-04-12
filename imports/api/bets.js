import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Bets = new Mongo.Collection("bets");
//process.env.API_KEY
// const PUBLIC_KEY = "";
// const alpha = require('alphavantage')({ key: PUBLIC_KEY });
const alpha = require('alphavantage')({ key: process.env.API_KEY });

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
});

//returns an array of dates to be used as keys to access JSON data
//(work in priogress)
// function getPastWeek(year, month, day) {
//   let dates = new Array();
//   for (let i = 0, j = 0; dates.length < 5; i++) {
//     // if leap year && it's March
//     if ((year % 4 == 0) && (month == 2)){
//       // do leap year things, get crazy
//     }
//     // no leap year || not march
//     else{
//       // if month has 31 days
//       if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 ||
//           month == 9 || month == 11) {
//           // if weekend keep rewinding
//           if (day == 0 || day == 6){
//           }
//           // if weekday record and keep rewinding
//           else{
//           }
//       }
//       // if month has 31 days
//       else if (month == 1 || month == 3 || month == 5 ||  month == 8 ||
//                month == 10) {
//
//       }
//     }
//   }
//   return dates;
// }
