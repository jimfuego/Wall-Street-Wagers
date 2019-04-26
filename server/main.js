import { Meteor } from 'meteor/meteor';
import "../imports/api/alphaVantage.js";
import "../imports/api/achievements.js";
import "../imports/api/bets.js";
import "../imports/api/market.js";
import "../imports/api/users.js";
import "../imports/api/minimongo.js";
import "../imports/api/presences.js"
import "../imports/api/wager.js"
import { CronJob } from 'cron';

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
    new CronJob({
        cronTime: '30 * * * * *',
        // use this wrapper if you want to work with mongo:
        onTick: Meteor.bindEnvironment(() => {
            // stuff happens
            const d = new Date();
            console.log('Thirty-second tick:', d);
            //eval single-player bets
            Meteor.call("bets.evaluateAll", (err) => {
                if (err) {
                    console.log("error evaluating single-player bets.js: ", err);
                } else {
                    console.log("Probably evaluated single-player bets");
                }
            });
            //eval multi-player bets
            Meteor.call("wager.evaluateAll", (err) => {
                if (err) {
                    console.log("error evaluating multi-player wager.js: ", err);
                } else {
                    console.log("Probably evaluated multi-player bets");
                }
            });
        }),
        start: true,
        timeZone: 'America/Los_Angeles',
    });
});
