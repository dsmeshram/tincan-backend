const user = require('../models/users.model');


exports.registerUser= function (req, res) {
    user.registerUser(req.body,res);
};

exports.loginUser= function (req, res) {
    user.login(req.body,res);
};

exports.changePassword = function(req,res){
    user.changePassword(req.body,req.params.userid,res);
}

exports.forgotPassword = function(req,res){
    user.forgotPassword(req.params.email,res);
}


