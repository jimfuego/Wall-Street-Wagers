import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Bets = new Mongo.Collection("bets");

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
    let dayOfMonth = d.getDate() - 1;
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

//returns true if a game is in progress
Meteor.methods({
  "bets.getUserBets"() {
    return (Bets.findOne({_id : Meteor.user().userId}));
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
