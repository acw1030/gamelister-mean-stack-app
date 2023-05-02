var express = require('express');
var User = require('../models/user');
var List = require('../models/list');
var router = express.Router();

const RAWG_APIKEY = "0b0f7874e05f432a8ae36b0922cf90c8";

function hash(str) {
   let hash = 0;
   for (let i = 0, len = str.length; i < len; i++) {
      let chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
   }
   return hash;
}

//Authentication
router.all(['/lists*', '/users*'], (req, res, next) => {
   if (req.session.user) {
      next();
   } else {
      res.session.regenerate(err => {
         res.sendStatus(403);
      });
   }
});
router.post('/register', async function (req, res) {
   try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
         res.status(400).send('Email is already in use.');
      }
      else {
         let newUser = new User();
         newUser.username = req.body.username;
         newUser.email = req.body.email;
         newUser.password = hash(req.body.password);
         newUser.admin = false;
         newUser.locked = false;
         let user = await newUser.save();
         delete user.password;
         req.session.regenerate(() => {
            req.session.user = user;
            res.send(user);
         });
      }
   }
   catch (err) {
      res.sendStatus(500);
   }
});
router.post('/login', async function (req, res) {
   try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
         res.status(400).send('A user with that email was not found.');
      } else if (user.locked == true) {
         res.status(400).send('Account has been deactivated.');
      } else if (hash(req.body.password) == user.password) {
         req.session.regenerate(() => {
            delete user.password;
            req.session.user = user;
            res.send(user);
         });
      } else {
         res.status(400).send('Password is incorrect.');
      }
   }
   catch (err) {
      res.sendStatus(500);
   }
});
router.post('/logout', function (req, res) {
   req.session.regenerate(() => {
      res.sendStatus(200);
   });
});

//USERS
router.get('/user', function (req, res) {
   res.send(req.session.user);
});
router.get('/users', async function (req, res) {
   try {
      let users = undefined;
      if (req.query.search) {
         users = await User.find({
            $or: [
               { username: { '$regex': req.query.search, '$options': 'i' } },
               { email: { '$regex': req.query.search, '$options': 'i' } }
            ]
         });
      }
      else if (req.query.email) {
         users = await User.find({ email: req.query.email });
      }
      else {
         users = await User.find({})
      };
      for (u in users) {
         delete u.password;
      };
      res.send(users);
   }
   catch (err) {
      res.sendStatus(500);
   }
});
router.get('/users/:id', async function (req, res) {
   try {
      let user = await User.findOne({ _id: req.params.id });
      delete user.password;
      res.send(user);
   }
   catch (err) {
      res.sendStatus(500);
   }
});
router.put('/users/:id', async function (req, res) {
   try {
      let user = undefined;
      if (req.body.password) {
         user = await User.findOneAndUpdate({
            _id: req.params.id
         }, {
            $set: { password: hash(req.body.password) }
         }, {
            new: true
         });
      } else {
         user = await User.findOneAndUpdate({
            _id: req.params.id
         }, {
            $set: {
               username: req.body.username,
               email: req.body.email,
               admin: req.body.admin,
               locked: req.body.locked,
               lists: req.body.lists
            }
         }, {
            new: true
         });
      }
      delete user.password;
      res.send(user);
   }
   catch (err) {
      res.sendStatus(500);
   }
});
router.put('/users/:id/password', async function (req, res) {
   try {
      let user = await User.findOneAndUpdate({
         _id: req.params.id
      }, {
         $set: {
            password: hash(req.body.password)
         }
      }, {
         new: true
      });
      delete user.password;
      res.send(user);
   }
   catch (err) {
      res.sendStatus(500);
   }
});

//LISTS
router.get('/lists', async function (req, res) {
   try {
      let lists = [];
      if (req.query.user) {
         lists = await List.find({ owner: req.query.user });
      }
      else {
         lists = await List.find({});
      }
      res.send(lists);
   }
   catch (err) {
      res.sendStatus(500);
   }
});
router.get('/lists/:id', async function (req, res) {
   try {
      res.send(await List.findOne({ _id: req.params.id }));
   }
   catch (err) {
      res.sendStatus(500);
   }
});
router.post('/lists', async function (req, res) {
   try {
      let newList = new List();
      newList.name = req.body.name;
      newList.owner = req.body.owner;
      res.send(await newList.save());
   }
   catch (err) {
      res.sendStatus(500);
   }
});
router.put('/lists/:id', async function (req, res) {
   try {
      res.send(await List.findOneAndUpdate({
         _id: req.params.id
      }, {
         $set: {
            name: req.body.name,
            games: req.body.games
         }
      }, {
         new: true
      }));
   }
   catch (err) {
      res.sendStatus(500);
   }
});
router.delete('/lists/:id', async function (req, res) {
   try {
      res.send(await List.findOneAndDelete({ _id: req.params.id }));
   }
   catch (err) {
      res.sendStatus(500);
   }
});

//GAMES (RAWG API)
router.get('/games', async function (req, res) {
   try {
      let q_sort = '';
      switch (req.query.sort) {
         case '1':
            q_sort = `&ordering=-released`;
            break;
         case '2':
            q_sort = `&ordering=-metacritic`;
            break;
         case '3':
            q_sort = `&ordering=released`;
            break;
         case '4':
            q_sort = `&ordering=metacritic`;
            break;
         default:
      }
      let q_platform = '';
      switch (req.query.platform) {
         case '2':
            q_platform = `&parent_platforms=5`;
            break;
         case '3':
            q_platform = `&parent_platforms=2`;
            break;
         case '4':
            q_platform = `&parent_platforms=3`;
            break;
         case '5':
            q_platform = `&parent_platforms=7`;
            break;
         default:
      }
      let q_search = '';
      if (req.query.search !== '') q_search = `&search=${req.query.search}`;
      let q_page = `&page=${req.query.page}`;
      let response = await fetch(`https://api.rawg.io/api/games?key=${RAWG_APIKEY}${q_sort}${q_platform}${q_search}${q_page}&metacritic=1,100&search_precise=true`);
      let data = await response.json();
      res.send(data);
   }
   catch (err) {
      res.sendStatus(500);
   }
});
router.get('/games/:id', async function (req, res) {
   try {
      let response = await fetch(`https://api.rawg.io/api/games/${req.params.id}?key=${RAWG_APIKEY}`);
      let data = await response.json();
      res.send(data);
   }
   catch (err) {
      res.sendStatus(500);
   }
});

//Initialize database
router.get('/init', async function (req, res) {
   try {
      await User.deleteMany({});
      await List.deleteMany({});
      let newUser = new User();
      newUser.username = "Admin";
      newUser.email = "admin@test.com";
      newUser.password = hash("password");
      newUser.admin = true;
      newUser.locked = false;
      await newUser.save();
      res.send('Database initialized');
   }
   catch (err) {
      res.sendStatus(500);
   }
});

module.exports = router;