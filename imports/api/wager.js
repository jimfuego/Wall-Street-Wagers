import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Wager = new Mongo.Collection("wager");

 // const PUBLIC_KEY = process.env.WAGER_KEY;
 // const alpha = require('alphavantage')({ key: PUBLIC_KEY });

//should fix null property of username
if (Meteor.isServer) {
    Meteor.publish("wager", function wagerPublish() {
        //this.userID
        return Wager
            .find({
                challengee: Meteor.user().username,
            }, {
                // FIXME: don't limit or sort... maybe sort
            });
    });

    Meteor.publish("wagerresults", function publishWagerResults() {
        //this.userID
        return Wager
        //.find({ $or: [ { challengee: Meteor.user().username }, { challenger: Meteor.user().username } ] }
            .find({})

        // FIXME: don't limit or sort... maybe sort
        //);
    });
}

Meteor.methods({
    async "wager.insert"(challengee, tickerSymbolInputInput, challengerbet, state) {
        check(challengee, String);
        // check(challengerbet, Number);

        // Make sure the user is logged in before inserting a task
        if (!this.userId) {
            console.log("!userId");
            throw new Meteor.Error("not-authorized");
        } else {
            // get today's date
            let d = new Date();
            let weekday = d.getDay() + 1;
            let dayOfMonth = d.getDate() - 1;
            let year = d.getFullYear();
            let month = d.getMonth() + 1;
            let monthString = (month < 9) ? "0" + month : month;
            let todaysDate = year + "-" + monthString + "-" + dayOfMonth;

            // make sure this is not a duplicate bet
            let queryResponse = Wager.findOne({
                $and: [
                    {challenger: Meteor.user().username},
                    {tickerSymbolInputInput: tickerSymbolInputInput}
                ]
            });

            // make sure this is not a duplicate bet
            if (queryResponse != undefined) {
                console.log(queryResponse);
                console.log("cant bet same tickersymbol same day");
                return;
            }

            Wager.insert({
                challenger: Meteor.user().username,
                challengee: challengee,
                tickerSymbolInputInput: tickerSymbolInputInput,
                challengerbet: challengerbet,
                statechange: state,
                createdAt: todaysDate
            });

            // return await alpha.data.daily_adjusted(tickerSymbolInputInput, 1).then(data => {
            //     // attempt to parse
            //     let justNYSEThings = data["Time Series (Daily)"];
            //     let todaysData = justNYSEThings[todaysDate];
            //     let todaysOpening = todaysData["1. open"];
            //     console.log("today's date: ", todaysDate);
            //     console.log("today's data: ", justNYSEThings[todaysDate]);
            //     console.log("Today's opening: ", todaysOpening);
            //
            //     // there ought to be some date around here somewhere
            //     if (data == undefined || data == null) {
            //         console.log("No stock data available for ", tickerSymbolInputInput);
            //         return "No stock data available for " + tickerSymbolInputInput + " on " + todaysDate;
            //     } else {
            //         Wager.insert({
            //             challenger: Meteor.user().username,
            //             challengee: challengee,
            //             tickerSymbolInputInput: tickerSymbolInputInput,
            //             challengerbet: challengerbet,
            //             statechange: state,
            //             createdAt: todaysDate,
            //             openingPrice: todaysOpening
            //         });
            //         return todaysOpening;
            //     }
            // });
        }
    }
});

Meteor.methods({
    "wager.find"(){
        return  Wager.find({});
    }
});

//should fix null property
Meteor.methods({
    "wager.findmychallenges"(){
        return Wager.find({challengee:Meteor.user().username}).fetch();
    }
});

Meteor.methods({
    "wager.insertchallengeebet"(challengeebet, id, statechange) {
        check(challengeebet, String);
        //Wager.find({_id:this.userId})
        Wager.update({
                _id: id
            },
            {
                $set:
                    {
                        challengeebet: challengeebet,
                        statechange: statechange
                    }
            });
    }
});

Meteor.methods({
    "wager.updatechallengeestate"(challengeestate, id) {
        check(challengeestate, String);
        //Wager.find({_id:this.userId})
        Wager.update({
                _id: id
            },
            {
                $set:
                    {
                        statechange: challengeestate
                    }
            });
    }
});

Meteor.methods({
    "wager.fetchthisdatabasemayne"(id, challengerbet, challengeebet) {
        console.log(id);
        console.log(challengerbet);
        console.log(challengeebet);
        let databasedeets = Wager.find({_id: id, challengerbet: challengerbet, challengeebet: challengeebet}).fetch();
        return databasedeets;
    }
});

Meteor.methods({
    "wager.deletechallenger"(challengee){
        check(challengee, String);
        Wager.remove({
            challenger: Meteor.user().username,
            challengee: challengee
        });
        //console.log(allusers)
        //return Front.find({});
    }
});

// Meteor.methods({
//     async "wager.evaluateAll"(){
//         let allWagers = [];
//         allWagers =  Wager.find({});
//         for (let i = 0; i < allWagers.length ; i++) {
//             let wager = allWagers[i];
//             let challenger = wager["challenger"];
//             let challengee = wager["challengee"];
//             let tickerSymbolInputInput = wager["tickerSymbolInputInput"];
//             let statechange = wager["statechange"];
//             let betDate = wager["betDate"];
//             let challengerPrediction = wager["challengerBet"];
//             let challengeePrediction = wager["challengeeBet"];
//
//             //call API & eval "this" bet
//             await alpha.data.daily_adjusted(tickerSymbolInputInput, 1).then(data => {
//                 // get "this" stocks closing values
//                 let justNYSEThings = data["Time Series (Daily)"];
//                 let betData = justNYSEThings[betDate];
//                 let closePrice = parseFloat(betData["4. close"]);
//
//                 // get diff challenger/chalengee
//                 let chalengerDiff = Math.abs(closePrice - challengerPrediction);
//                 let chalengeeDiff = Math.abs(closePrice - challengeePrediction);
//
//                 //challenger win
//                 if(chalengeeDiff > chalengerDiff){
//                     //get/update chalenger winz
//                     let wins = parseInt(Meteor.users.findOne({username: challenger}))["wins"];
//                     Meteor.users.update({username: challenger}, { $set: {wins: wins + 1} });
//                 }
//                 // challengee win
//                 else if (chalengeeDiff < chalengerDiff){
//                     // get/update challengee wins
//                     let wins = parseInt(Meteor.users.findOne({username: challenger}))["wins"];
//                     Meteor.users.update({username: challengee}, { $set: {wins: wins + 1} });
//                 }
//             });
//             // await sleep(10000);
//         }
//         Wager.remove({});
//     }
// });
