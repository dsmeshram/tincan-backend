const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var gplay = require('google-play-scraper');

let AppDetailsSchema = new Schema({
    ostype: {type: String, required: true, max: 100},
    packagename:{type: String, required: true,max: 100,unique:true},
    versions: {type: String, required: true,max: 100},
    min_max_sdk: {type: String, required: true,max: 100},
    libs :{type: Array,default:[]}
});

AppDetailsSchema.statics.getApplicationReview = async function(packagenamename,res){
    return gplay.reviews({
        appId: packagenamename,
        sort: gplay.sort.RATING
      }).then(response=>{
        console.log(response);
        res.json(response);
    }).catch(err=>{
        res.json( { status:400,message:err.errmsg});
      });
}

AppDetailsSchema.statics.getApplicationMetadata = async function(packagenamename,res){
    return gplay.app({
        appId: packagenamename
      }).then(response=>{
        console.log(response);
        res.json(response);
    }).catch(err=>{
        res.json( { status:400,message:err.errmsg});
      });
}

//add app details
AppDetailsSchema.statics.addappdetails = async function(appdetails,res){
    this.create(appdetails).then(details=>{
        res.json( { status:200,message:"Success"});
      }).catch(err=>{
        res.json( { status:400,message:err.errmsg});
      });
}

//get app details
AppDetailsSchema.statics.getappdetails = async function(packagename,res){
  this.find({ "packagename": packagename }).then(appdetails => {
    if (appdetails.length == 0) {
        res.json({ status: 400, message: "Fail" });
    }
    else {
        res.json({ status: 200, message: "Success", appdetails: appdetails });
    }
}).catch(err => {
    res.json({ status: 401, message: err });
});
}

// Export the model
module.exports = mongoose.model('appdetails', AppDetailsSchema);