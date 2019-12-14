const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'damodhar.meshram.a1@gmail.com',
      pass: 'Hurix@1234'
    }
  });


let UserSchema = new Schema({
    userid: { type: String, required: true, max: 100, unique: true },
    username: { type: String, required: true, max: 100 },
    lastname: { type: String, required: true, max: 300 },
    email: { type: String, required: true, max: 300, unique: true },
    password: { type: String, required: true, max: 300 },
    dateandtime: { type: String, required: true, max: 300 }
});

//add new user
UserSchema.statics.registerUser = async function (user, res) {
    this.count({}).then(count => {
        user.userid = count;
        user.dateandtime = Date.now();
        this.create(user).then(user => {
            res.json({ status: 200, message: "Success", user: user });
        }).catch(err => {
            res.json({ status: 400, message: err.errmsg });
        });
    })
};


//login check
UserSchema.statics.login = async function (user, res) {
    console.log(user);
    this.find({"username": user.username, "password": user.password}).then(user => {
        if (user.length == 0) {
            res.json({ status: 400, message: "Fail" });
        }
        else {
            res.json({ status: 200, message: "Success", user: user });
        }
    }).catch(err => {
        res.json({ status: 401, message: err });
    });
};


//change password
UserSchema.statics.changePassword = async function (user,userid, res) {
    let query = {'userid':userid};
    this.findOneAndUpdate(query,user,{upsert:true}).then(response=>{
        res.json({ status: 200, message: "Success" });
    }).catch(err => {
        res.json({ status: 401, message: err });
    });
};


//forgot password
UserSchema.statics.forgotPassword = async function (emailid, res) {
    //create query
    let query = {'email':emailid};
    this.find(query).then(user => {
        if (user.length == 0) {
            res.json({ status: 400, message: "Email not found!" });
        }
        else 
        {
            //send reset password link send to the user
            var mailOptions = {
                from: 'damodhar.meshram.a1@gmail.com',
                to: 'damomeshram@gmail.com',
                subject: 'Sending Email using Node.js',
                text: 'That was easy!'
              };

              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            
            res.json({ status: 200, message: "Success"});
        }
    }).catch(err => {
        res.json({ status: 401, message: err });
    });
};


// Export the model
module.exports = mongoose.model('users', UserSchema);