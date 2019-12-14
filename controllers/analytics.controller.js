const analytics = require('../models/analytics.model');

exports.saveAnalytics = function (req, res) {
    analytics.saveAnalytics(req, res);
};

exports.getAnalytics = function (req, res) {
    analytics.getAnalytics(req, res);
};