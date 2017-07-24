var express = require('express');
var router = express.Router();
var userController = require('../../controllers/userController')
var helpers = require('../../helpers/authentication')

// for users
router.get('/', helpers.admin, userController.getAllUsers);
router.get('/:id', helpers.auth, userController.getSingleUser);
router.post('/', helpers.admin, userController.createUser);
router.put('/:id', helpers.auth, userController.updateUser);
router.delete('/:id', helpers.admin, userController.deleteUser);

//for admin
router.post('/signin', userController.signIn);
router.post('/signup', userController.signUp);

module.exports = router;
