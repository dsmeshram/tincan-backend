const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const apps_controller = require('../controllers/app.controller');
const user_controller = require('../controllers/user.controller');
const appdetails_controller = require('../controllers/appdetails.controller');



router.get('/apps/details/review/:packagename', appdetails_controller.getApplicationReview);

router.get('/apps/details/metadata/:packagename', appdetails_controller.getApplicationMetadata);


//GET apps by client ID
router.get('/apps/:userid', apps_controller.appsByClient);

//Post app registration
router.post('/apps', apps_controller.appregistration);

//remove app registration
router.delete('/apps/:userid/:appid', apps_controller.appremove);

//user managment
//Post user registration
router.post('/user', user_controller.registerUser);

//Post login registration
router.post('/userlogin', user_controller.loginUser);

//change password 
router.put('/user/:userid', user_controller.changePassword);

//change password 
router.post('/user/forgotpassword/:email', user_controller.forgotPassword);

//add app details
router.post('/app/details', appdetails_controller.adddetails);

//add app details
router.get('/app/details/:packagename', appdetails_controller.getappdetails);

//key validation
router.get('/apps/validation/:key', apps_controller.keyValidation);


module.exports = router;