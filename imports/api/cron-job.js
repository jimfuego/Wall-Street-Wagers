import { Meteor } from "meteor/meteor";
import { CronJob } from 'cron';

Meteor.startup(() => {
    new CronJob({
        cronTime: '1 * * * * *',
        // use this wrapper if you want to work with mongo:
        onTick: Meteor.bindEnvironment(() => {
            // stuff happens
            const d = new Date();
            console.log('At One Second:', d);
        }),
        start: true,
        timeZone: 'America/Los_Angeles',
    });
});




// const CronJob = require('node-cron');
// console.log('Before job instantiation');
// const job = new CronJob('1 * * * * *', function() {
//     const d = new Date();
//     console.log('At One Second:', d);
// });
// console.log('After job instantiation');
// job.start();





// const cron = require('node-cron');
//
// const task = cron.schedule('1 * * * *', () => {
//     console.log('running a task every minute');
// });
//
// task.start();