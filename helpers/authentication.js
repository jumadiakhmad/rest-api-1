require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secret = process.env.SECRET_KEY;

function admin(req,res,next) {
  let token = req.headers.token
  if(token) {
    jwt.verify(token,secret, (err,decoded) => {
      if(decoded.role == 'admin') {
        next()
      } else {
        res.send('hanya untuk admin')
      }
    })
  } else {
    res.send('Silahkan login untuk pertama kali')
  }
}

function auth(req,res,next) {
  let token = req.headers.token
  if(token) {
    jwt.verify(token,secret, (err,decoded) => {
      console.log(decoded);
      if(decoded.role.toLowerCase() == 'admin' || decoded.id == req.params.id) {
        next()
      } else {
        res.send('This route for admin and authentication user only')
      }
    })
  } else {
    res.send('Silahkan login terlebih dahulu')
  }
}


module.exports = {
  admin, auth
}
