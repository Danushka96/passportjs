var express = require('express')
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});
var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

router.get('/home', function(req,res){
    console.log('hit here')
    res.json({
        "message" : "hi"
    }).status(200).send();
})

// Profile Route
router.get('/profile', auth, ctrlProfile.profileRead);

// Authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;