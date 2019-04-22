import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Wager = new Mongo.Collection("wager");

//should fix null property of username
if (Meteor.isServer) {
  Meteor.publish("wager", function wagerPublish() {
    return Wager
      .find({challengee: Meteor.user().username}, {
        // FIXME: don't limit or sort... maybe sort
      });
  });
}

Meteor.methods({

  "wager.insert"(challengee,tickerSymbolInputInput){
    check(challengee, String);
    /*check(state, String);
    check(accept, false);
    check(inprogress, Boolean);
    check(gameended, Boolean);*/

    // check(highLow, String);
    // check(user, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      console.log("!userId");
      throw new Meteor.Error("not-authorized");
    }

    else {
      Wager.insert({
        challenger: Meteor.user().username,
        challengee: challengee,
        tickerSymbolInputInput:tickerSymbolInputInput
        /*state:"",
        accept:false,
        inprogress:false,
        gameended:false*/
      });
      //console.log(Meteor.user().username + "challenges you")
      return;
    }
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