import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

SimpleSchema.extendOptions(["autoform"]);

export const Users = new Mongo.Collection("users");

const UserSchema = new SimpleSchema({
  userName: { type: String },
  wins: { type: Number } ,
  createdAt: { type: Date }
});

Users.attachSchema(UserSchema);

//sets answer to game creator's preference
Meteor.methods({
  "users.insert"(user)  {


    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    //stores solution from game creator
    //if document exists
    if(Users.findOne({ userName : user}) != undefined){
      //username already exists
    }
    //document doe snot exist
    else {
      Users.insert({
        userName : user,
        wins : 0,
        createdAt : Date.now()
      });
    }
  }
});
