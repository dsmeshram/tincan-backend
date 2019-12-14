const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AnalyticsSchema = new Schema({
    vId: { type: String, required: true, max: 100 },
    appId: { type: String, required: true, max: 100 },
    userId: { type: String, required: true, max: 100 },
    deviceId: { type: String, required: true, max: 100 },
    sessionStartTime: { type: Date, required: true },
    sessionEndTime: { type: Date, required: true },
    activity: {
        screen: { type: String, required: true, max: 100 },
        start: { type: Date, required: true },
        end: { type: Date, required: true },
        memory: { type: Array, default: [] },
        network: { type: Array, default: [] },
    }
});

//add analytics details
AnalyticsSchema.statics.saveAnalytics = async function (req, res) {
    let analytics = {};
    // user id
    analytics.userId = req.params.userId;
    // application id of perticular user
    analytics.appId = req.params.appId;
    // version id of app
    analytics.vId = req.params.vId;
    // device ID's of perticular user
    analytics.deviceId = req.params.deviceId;
    let data = req.body;
    if (data && (!!data) && (data.constructor === Object)) {
        analytics.sessionStartTime = new Date(data.sessionStartTime);
        analytics.sessionEndTime = new Date(data.sessionEndTime);
        let a = [];
        if (data.activity && data.activity.length != undefined) {
            if (data.activity.length) {
                // it is array of activities
                data.activity.forEach(activity => {
                    a.push(new Promise((resolve, reject) => {
                        analytics.activity = {
                            screen: activity.screen,
                            start: new Date(activity.start),
                            end: new Date(activity.end),
                            memory: (activity.memory && activity.memory.length ? activity.memory : []),
                            network: (activity.network && activity.network.length ? activity.network : [])
                        }
                        this.create(analytics).then(details => {
                            resolve();
                        }).catch(err => {
                            reject();
                        });
                    }));
                });
                Promise.all(a).then(status => {
                    res.json({ status: 200, message: "Success" });
                }, err => {
                    res.json({ status: 400, message: err.errmsg, details: "few activites are not stored" });
                });
            } else {
                res.json({ status: 400, message: "activity json can not be empty" });
            }
        } else {
            // it is single activity i.e. object
            analytics.activity = {
                screen: data.activity.screen,
                start: new Date(data.activity.start),
                end: new Date(data.activity.end),
                memory: (data.activity.memory && data.activity.memory.length ? data.activity.memory : []),
                network: (data.activity.network && data.activity.network.length ? data.activity.network : [])
            }
            this.create(analytics).then(details => {
                res.json({ status: 200, message: "Success" });
            }).catch(err => {
                res.json({ status: 400, message: err, details: "Failed to store activity" });
            });
        }
    } else {
        res.json({ status: 400, message: "body can not be empty" });
    }
}

// get analytics details
AnalyticsSchema.statics.getAnalytics = async function (req, res) {
    let query = {};
    if (req.params.userId) {
        query.userId = req.params.userId;
    }
    if (req.params.deviceId) {
        query.deviceId = req.params.deviceId;
    }
    if (req.params.vId) {
        query.vId = req.params.vId;
    }
    if (req.params.appId) {
        query.appId = req.params.appId;
    }
    this.find(query).then(analytics => {
        res.json({ status: 200, message: "Success", analytics: analytics });
    }).catch(err => {
        res.json({ status: 401, message: err });
    });
}


// Export the model
module.exports = mongoose.model('analytics', AnalyticsSchema);