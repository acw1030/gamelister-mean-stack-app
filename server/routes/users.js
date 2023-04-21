var express = require('express');
var router = express.Router();

class User {
    constructor(_id, name) {
        this._id = _id;
        this.name = name;
        this.icon = "";  
        this.banner = "";
        this.acct_meta = []; //acct to fetch name, icon, banner from
        this.acct_twi = []; //{"id":"6253282","handle":"kiri_pt"}
        this.acct_paw = []; //{"id":"6130779","handle":"kiri_pt"}
        this.acct_pix = []; //{"id":"15006083"}
        this.acct_kem = []; //{"service":"fanbox","id":"8249062"}
    }
}

//get all users
router.get('/', function (req, res, next) {
});

//get single user
router.get('/:id', function (req, res, next) {
    let id = req.params;
    res.send(id);
});

module.exports = router;

/*
function save( user, cb ) {
  db.collection('users').save(user, function( err1, writeResult ) {
     db.collection('users').findOne( user, function( err2, savedUser ) {
        cb( err1 || err2, savedUser );
     } );
  } );
}
module.exports.save = save;

function findAll( cb ) {
   db.collection('users').find().toArray( function(err, users) {
       cb( err, users.map( transformUser ) );
  } );
}
module.exports.findAll = findAll;


function findById( id, cb ) {
  db.collection('users').findOne( { '_id' : new mongo.ObjectID(id) }, function( err, user ) {
     cb( err, transformUser( user ) );
  } );
}
module.exports.findById = findById;


function findByEmail( email, cb ) {
  db.collection('users').findOne({ email : email}, function( err, user ) {
     cb( err, transformUser( user ) );
  } );
}
module.exports.findByEmail = findByEmail;*/