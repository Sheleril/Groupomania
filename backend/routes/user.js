const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-avatar-config');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/me', userCtrl.getUserProfil);
router.put('/me/update', multer, userCtrl.updateUserProfil);
router.delete('/me/delete', userCtrl.deleteUserProfil);
router.get('/allusers', userCtrl.getAllUser);
router.delete('/allusers/:id', userCtrl.deleteUserByAdmin);
router.put('/me/uppass', userCtrl.updatePassword);

module.exports = router;