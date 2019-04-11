import { Meteor } from 'meteor/meteor';
import "../imports/api/alphaVantage.js";
import "../imports/api/achievements.js";
import "../imports/api/bets.js";
import "../imports/api/market.js";
import "../imports/api/users.js";
import "../imports/api/minimongo.js";
import "../imports/api/wager.js";

import { DDPRateLimiter } from "meteor/ddp-rate-limiter";
import { WebApp } from 'meteor/webapp';

WebApp.addHtmlAttributeHook(() => ({ lang: 'en' }));

// Get list of all method names on Lists
const LISTS_METHODS = [
 "user.getWins",
];

// Only allow 5 list operations per connection per second

if (Meteor.isServer) {
 DDPRateLimiter.addRule({
   name(name) {
     return LISTS_METHODS.includes(name);
   },

   // Rate limit per connection ID
   connectionId() { return true; }
 }, 5, 1000);
}

Meteor.startup(() => {

});
