require('dotenv').config();
const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = process.env.SECRET_KEY;

function signUp(req,res) {
   var hash = bcrypt.hashSync(req.body.password, 8);
   db.Users.create({
      name:  req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hash,
      role: req.body.role
   })
   .then( result => {
     res.send(result)
   })
   .catch(err => {
     res.send(err)
   })
}

function signIn(req, res) {
  db.Users.find({
    where: {
      username : req.body.username
    }
  })
  .then(user => {
    bcrypt.compare(req.body.password, user.password, function(err, result) {
      if(result) {
        let token = jwt.sign({role: user.role, id: user.id}, secret);
        console.log(token);
        res.send(token)
      } else {
        res.send("Password Salah..")
      }
    })
  })
  .catch(err => res.send(err.message));
}


function createUser(req,res) {
  var hash = bcrypt.hashSync(req.body.password,8)
  db.Users.create({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hash,
    role: req.body.role
  })
  .then(result => {
    res.send(result)
  })
  .catch(err => {
    res.send(err)
  })
}

function getAllUsers(req,res) {
  db.Users.findAll()
  .then( users => res.send(users))
  .catch(err => res.send(err))
}

function getSingleUser(req,res) {
  let id = req.params.id
  db.Users.findById(id)
  .then(users => res.send(users))
  .catch(err => res.send(err));
}

function updateUser(req,res) {
  var hash = bcrypt.hashSync(req.body.password, 8)
  var id = req.params.id
  db.Users.findById(id)
  .then( users => {
    db.Users.update({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hash,
      role: req.body.role
    }, {
      where: {
        id: id
      }
    })
    res.send('Update data success')
  })
  .catch( err => res.send(err));
}

function deleteUser(req,res) {
  let id = req.params.id
  db.Users.findById(id)
  .then(user => {
    db.Users.destroy({
      where: {
        id: req.params.id
      }
    })
  .then(data => res.send(user))
  .catch(err => res.send(err))
  })
}

module.exports = {
  signUp, signIn, createUser, getAllUsers, getSingleUser,
  updateUser, deleteUser
}
