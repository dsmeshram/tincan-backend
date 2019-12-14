const analytics = require('../models/analytics.model');

exports.saveAnalytics = function (req, res) {
    analytics.saveAnalytics(req, res);
};