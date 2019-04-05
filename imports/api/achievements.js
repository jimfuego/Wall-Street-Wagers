import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Achievements = new Mongo.Collection("achievements");

if (Meteor.isServer) {
  Meteor.publish("achievements", function guessesPublish() {
    return (Achievements.find({}));
  });
}

//sets answer to game creator's preference
Meteor.methods({
  "achievements.insert"(answer)  {
    check(answer, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    //stores solution from game creator
    //if document exists
    if(Achievements.findOne({}) != undefined){
      Achievements.update({}, {
        $set:{
          answer :answer,
          player : Meteor.user().username,
          gameInProgress : true
        }
      });
    }
    //document doe snot exist
    else {
      Achievements.insert({
        answer : answer,
        player : Meteor.user().username,
        gameInProgress : true
      });
    }
  }
});

Meteor.methods({
  "achievements.delete"() {
    Achievements.remove({});
  }
});

//checks if @param guess matches the answer string
Meteor.methods({
  "achievements.checkSolution"(guess)  {
    check(guess, String);
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    if (Achievements.findOne({answer : guess}) != undefined) {
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
  "achievements.endGame" () {
    Achievements.update({}, {
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
  "achievements.checkInProgress"() {
    return (Achievements.findOne({gameInProgress : true})!=undefined);
  }
});
