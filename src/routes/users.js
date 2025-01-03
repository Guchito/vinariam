const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const helper = require('../helpers/helpers');
const validator = require('../middlewares/validator'); //requiero al middle de validaciones
const guest = require('../middlewares/guest')
const user = require('../middlewares/user');


/* ROUTES USERS */

router.get('/login', guest, usersController.login); //users/login (el "users" ya viene por default en el router)
router.post('/login', validator.login, usersController.processLogin);
router.get('/register', guest , usersController.register);
router.post('/processRegister', helper.uploadImg().any(), validator.register, usersController.processRegister);
router.post('/sendMail', user ,usersController.sendMail);
router.get('/sentMail', usersController.sentMail);
router.get('/profile', user ,usersController.profile);
router.get('/logout', user ,usersController.logout);
router.get('/edit', user ,usersController.editUser);
router.post('/edit', helper.uploadImg().any(), validator.edit, usersController.updateUser);
router.get('/password', user ,usersController.passwordRender);
router.post('/password', validator.editPassword, usersController.passwordPost);


/*Export */

module.exports = router;

