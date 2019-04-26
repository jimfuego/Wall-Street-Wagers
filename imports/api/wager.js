import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Wager = new Mongo.Collection("wager");

const alpha = require('alphavantage')({ key: process.env.API_KEY });

//const PUBLIC_KEY = "AD7JAZ51CFHTA74D";
//const alpha = require('alphavantage')({ key: PUBLIC_KEY });

//should fix null property of username
if (Meteor.isServer) {
  Meteor.publish("wager", function wagerPublish() {
    //this.userID
    return Wager
      .find({challengee: Meteor.user().username,
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
async "wager.insert"(challengee,tickerSymbolInputInput,challengerbet,state){
    //check(challengee, String);
    //check(challengerbet, String);


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
    let queryResponse = Wager.findOne({ $and: [{ challenger: Meteor.user().username }, { tickerSymbolInputInput: tickerSymbolInputInput }]});
    if(queryResponse != undefined){
      console.log(queryResponse);
      console.log("cant bet same tickersymbol same day");
      return;
    }

    return await alpha.data.daily_adjusted(challengerbet, 1).then(data => {
      // attempt to parse
      let justNYSEThings = data["Time Series (Daily)"];
      let todaysData =  justNYSEThings[todaysDate];
      let todaysOpening = todaysData["1. open"];
      console.log("today's date: ", todaysDate);
      console.log("today's data: ", justNYSEThings[todaysDate]);
      console.log("Today's opening: ", todaysOpening);

      // there ought to be some date around here somewhere
      if(data == undefined || data == null) {
        console.log("No stock data available for ", tickerSymbolInputInput);
        return "No stock data available for " + tickerSymbolInputInput + " on " + todaysDate;
      }
    else {
      Wager.insert({
        challenger: Meteor.user().username,
        challengee: challengee,
        tickerSymbolInputInput:tickerSymbolInputInput,
        challengerbet : challengerbet,
        statechange:state,
        createdAt : todaysDate,
        openingPrice: todaysOpening

      });
      //console.log(Meteor.user().username + "challenges you")
      var todaysOpeningPrice=todaysOpening;
      return todaysOpeningPrice;
    }


    })

}
});

  Meteor.methods({
    "wager.find"(){
      let challenger=Wager.find({});
      return challenger;
      //console.log(allusers)
    //return Front.find({});
  }

});

//should fix null property
    Meteor.methods({
    "wager.findmychallenges"(){
      let challenger=Wager.find({challengee:Meteor.user().username}).fetch();
      return challenger;
      //console.log(allusers)
    //return Front.find({});
  }

});


Meteor.methods({

  "wager.insertchallengeebet"(challengeebet,id,statechange){
     check(challengeebet, String);
    //Wager.find({_id:this.userId})
      Wager.update({
        _id:id},
        {
          $set:
          {
            challengeebet : challengeebet,
            statechange: statechange}
    });


  }


});


Meteor.methods({

  "wager.updatechallengeestate"(challengeestate,id){
     check(challengeestate, String);
    //Wager.find({_id:this.userId})
      Wager.update({
        _id:id},
        {
          $set:
          {
            statechange : challengeestate}
    });


  }


});




Meteor.methods({

"wager.fetchthisdatabasemayne"(id,challengerbet,challengeebet){
  console.log(id);
  console.log(challengerbet);
  console.log(challengeebet);
  let databasedeets=Wager.find({_id:id,challengerbet:challengerbet,challengeebet:challengeebet}).fetch();
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

/*Meteor.methods({
    "wager.size"(){
     var collectionNames = Wager.stats(), stats = [];
     stats = stats.size(function(a, b) { return b['size'] - a['size']; });    
    

     return stats;

      //console.log(allusers)
    //return Front.find({});
  }

});*/
