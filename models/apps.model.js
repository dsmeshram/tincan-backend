const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let AppSchema = new Schema({
    userid:{type:String, required:true,max:100},
    appid:{type:String, required:true,max:100,unique:true},
    appname: {type: String, required: true, max: 100},
    packagename: {type: String, required: true,max: 300,unique:true},
    signature: {type: String, required: false,max: 300,default:"DEBUGE_KEY"},
    dateandtime: {type: String, required: true,max: 300},
    key:{type:String,max:200}
});


//Get all aps via clientID
AppSchema.statics.findAppsByUserID = async function (userid,res) {
  this.find({"userid":userid}).then(apps=>{
    res.json( { status:200,message:"Success",apps:apps});
  }).catch(err=>{
    res.json( { status:400,message:err});
  });
};


 
//Get all aps via clientID
AppSchema.statics.registerApp = async function (app,res) {
  this.count({}).then(count=>{
    app.appid = count + 1;
    
    let key = app.appname+"#"+app.packagename+"#"+app.userid;
    var encoded = new Buffer.from(key).toString('base64');
    let keyobject = {key:encoded};
    console.log(app);
    app.dateandtime = Date.now();
    this.create(app).then(app=>{
      let query = {'_id':app._id};
      this.findOneAndUpdate(query,keyobject,{upsert:true}).then(response=>{
          res.json({ status: 200, message: "Success" ,key:keyobject.key,appid:app.appid});
      }).catch(err => {
          res.json({ status: 401, message: err });
      });
    }).catch(err=>{
      console.log(err);
      res.json( { status:400,message:err.errmsg});
    });
  })
};

//Delet all aps via clientID
AppSchema.statics.removeApp = async function (userid,appid,res) {
  this.find({"userid":userid,"appid":appid}).then(response=>{
    res.json({ status:200,message:"Success"})
  }).catch(err=>{
    res.json({ status:400,message:"Fail"})
  });
};

//Delet all aps via clientID
AppSchema.statics.keyvalidation = async function (key,res) 
{
  this.find({"key":key}).then(response=>{
    if(response.length == 0){
      res.json({ status:400,message:"Fail"})
    }else{
      res.json({ status:200,message:"Success",appdetails:response})
    }
    res.json({ status:200,message:"Success"})
  }).catch(err=>{
    res.json({ status:400,message:"Fail"})
  });
};

// Export the model
module.exports = mongoose.model('apps', AppSchema);