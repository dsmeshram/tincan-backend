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

//add app details
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


// Export the model
module.exports = mongoose.model('analytics', AnalyticsSchema);