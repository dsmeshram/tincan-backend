const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AnalyticsSchema = new Schema({
    vId: String,
    appId: String,
    userId: String,
    deviceId: String,
    sessionStartTime: { type: String, required: true },
    sessionEndTime: { type: String, required: true },
    activity: [
        {
            screen: String,
            start: String,
            end: String,
            memory: { type: Array, default: [] },
            network: { type: Array, default: [] },
        }
    ]
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
    let data = JSON.parse(req.body);
    if (data && (!!data) && (data.constructor === Object)) {
        analytics.sessionStartTime = data.startTime;
        analytics.sessionStartTime = data.endTime;
        analytics.memory = data.memory;
        analytics.network = data.network;
        this.create(analytics).then(details => {
            res.json({ status: 200, message: "Success" });
        }).catch(err => {
            res.json({ status: 400, message: err.errmsg });
        });
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