var passport = require('passport')
var mongoose = require('mongoose')
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
    res.status(status)
    res.json(content)
};

module.exports.register = function(req, res){

    if(!req.body.name || !req.body.email || !req.body.password){
        sendJSONresponse(res, 400, {
            "message": "All Field Required"
        })
        return
    }

    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);

    //console.log("name: "+user.name+" email: "+user.email+" password "+user.hash);

    user.save(function(err){
        var token;
        token  = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });
    });
}

module.exports.login = function(req, res){
    
    if(!req.body.email || !req.body.password){
        sendJSONresponse(res, 400, {
            "message": "All Field Required"
        })
        return
    }

    passport.authenticate('local', function(err, user, info){
        var token;

        if(err){
            res.status(400).json(err);
            return;
        }

        if(user){
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token":token
            });
        } else {
            res.status(401).json(info);
        }
    })(req,res);
};
