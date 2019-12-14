const apps = require('../models/apps.model');

//Simple version, without validation or sanitation
exports.appsByClient = function (req, res) {
    apps.findAppsByUserID(req.params.userid,res);
};

exports.appregistration= function (req, res) {
    apps.registerApp(req.body,res);
};

exports.appremove= function (req, res) {
    apps.removeApp(req.params.userid,req.params.appid,res);
};

exports.keyValidation = function(req,res){
    apps.keyvalidation(req.params.key,res);
}
