const express = require('express');
const router = express.Router();
const  usersController = require('../controllers/usersController')

/* GET users page. */


router.get('/login', usersController.login); //users/login (el "users" ya viene por default en el router)
router.get('/register', usersController.register);


/*Export */

module.exports = router;

