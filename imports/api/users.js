import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

SimpleSchema.extendOptions(["autoform"]);

export const Users = new Mongo.Collection("users");

//schema definition
const UserSchema = new SimpleSchema({
  userName: { type: String },
  wins: { type: Number } ,
  createdAt: { type: Date }
});

Users.attachSchema(UserSchema);

//add user to database
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
      throw new Meteor.Error("Username already exists!");
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

//update user bio info
Meteor.methods({
  "users.updateProfile"(text) {
    if(!this.userId){
      throw new Meteor.Error("not-authorized");
    } else{
      Users.update({}, {
        $set:{
          bio: text
        }
      });
    }
  }
})
