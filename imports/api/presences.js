import { Meteor } from "meteor/meteor";
//import { Accounts } from "meteor/accounts-base";
import Presences from "meteor/tmeasday:presence"
//import { Mongo } from "meteor/mongo";


//export const Presences = new Mongo.Collection("presences");

if (Meteor.isServer) {
Meteor.publish('userPresence', function() {
  // Setup some filter to find the users your user
  // cares about. It's unlikely that you want to publish the
  // presences of _all_ the users in the system.

  // If for example we wanted to publish only logged in users we could apply:
  // filter = { userId: { $exists: true }};

  return Presences.find({});
});
}
