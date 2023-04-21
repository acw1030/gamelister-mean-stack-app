var express = require('express');
var router = express.Router();

//Delete old posts once limit (3000?) has been reached. This is ok because user pages will still repopulate content

class Post {
  constructor(_id, url, date, author, service, thumbnail, avatar, maintext, subtext, isrepost, reposter, mediacount, isvideo) {
    this._id = _id;
    this.url = url; //link when clicked
    this.date = date;
    this.author = author; //user account (left link)
    this.service = service; //post service (right link)

    this.thumbnail = thumbnail; //thumbnail picture
    this.avatar = avatar; //og author's avatar
    this.maintext = maintext; //Twitter/Pawoo: og author's username, Pixiv/Kemono: post title
    this.subtext = subtext; //Twitter/Pawoo: og author's handle, Pixiv/Kemono: author's user name

    this.isrepost = isrepost;
    this.reposter = reposter; //reposter's username

    this.isvideo = isvideo; //true/false
    this.mediacount = mediacount; // 0+
  }
}

//get all posts
router.get('/', function (req, res, next) {
  if (req.query.hasOwnProperty('service')) {
  }
  if (req.query.hasOwnProperty('author')) {
  }
});

//get single post
router.get('/:id', function (req, res, next) {
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