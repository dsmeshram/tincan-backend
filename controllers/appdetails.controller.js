const appdetails = require('../models/appdetails.model');

//Simple version, without validation or sanitation
exports.adddetails = function (req, res) {
    appdetails.addappdetails(req.body,res);
};

exports.getappdetails = function(req,res){
    appdetails.getappdetails(req.params.packagename,res);
}


exports.getApplicationReview = function(req,res){
    appdetails.getApplicationReview(req.params.packagename,res);
}

exports.getApplicationMetadata = function(req,res){
    appdetails.getApplicationMetadata(req.params.packagename,res);
}




