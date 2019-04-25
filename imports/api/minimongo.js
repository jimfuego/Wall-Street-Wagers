import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
//import { Accounts } from "meteor/accounts-base";
import { check } from "meteor/check";


export const Front = new Mongo.Collection("loggedin");

/*if(Meteor.isServer){
<<<<<<< HEAD
Meteor.publish('null', function (){
=======
Meteor.publish('null', function (){ 
>>>>>>> origin/Sameshit
  return Meteor.users.find({});
})
}*/

if (Meteor.isServer) {
  Meteor.publish("loggedin", function guessesPublish() {
    return Front
<<<<<<< HEAD
        .find({}, {
          // FIXME: don't limit or sort... maybe sort
        });
=======
      .find({}, {
        // FIXME: don't limit or sort... maybe sort
      });
>>>>>>> origin/Sameshit
  });
}
Meteor.methods({

  "null.insert"(user){
    check(user, String);
    // check(highLow, String);
    // check(user, String);


    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      console.log("!userId");
      throw new Meteor.Error("not-authorized");
    }

    else {
      Front.insert({
<<<<<<< HEAD
        user: Meteor.user().username

=======
        user: Meteor.user().username 
        
>>>>>>> origin/Sameshit
      });
      //console.log(Meteor.user().username + "was inserted")
      return;
    }

<<<<<<< HEAD
  }
});

Meteor.methods({
  "null.find"(){
    let allusers=Front.find({});
    return allusers;
    //console.log(allusers)
    //return Front.find({});
  }

});

Meteor.methods({
  "null.deleteAll"() {
    //check(user, String);
=======

  }



});


Meteor.methods({
    "null.find"(){
      let allusers=Front.find({});
      return allusers;
      //console.log(allusers)
    //return Front.find({});
  }

}); 

Meteor.methods({
  "null.deleteAll"() {
        //check(user, String);
>>>>>>> origin/Sameshit
    Front.remove({
      user: Meteor.user().username
    });
  }
});

//console.log(Front.find({"text" : "Another dummy line"}));

// if (Meteor.isServer) {
//   Meteor.publish("user", function guessesPublish() {
//     return (Users.find({}));
//   });
// }
//add user to database
/*Meteor.methods({
  "user.insert"(user, password)  {
    let profile = { profile: "Default profiel value" };
    let wins = { wins: 0 };
    let gamesPlayed = { gamesPlayed: 0 };
    return Accounts.createUser({ username: user, password: password, profile: profile, wins: wins, gamesPlayed: gamesPlayed });
  }
});

// gets total wins for @param user
Meteor.methods({
  "user.getWins"(user){
    return Accounts.findOne({ userName : user }, { _id: 0, username: 0, password: 0, profile: 0, gamesPlayed: 0});
  }
});

// gets total games played for @param user
Meteor.methods({
  "user.getBetsPlaced"(user){
    return Accounts.findOne({ userName : user }, { _id: 0, username: 0, password: 0, profile: 0, wins: 0});
  }
});*/
<<<<<<< HEAD
=======



>>>>>>> origin/Sameshit
