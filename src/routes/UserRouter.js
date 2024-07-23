const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/sign-up', UserController.createUser);
router.post('/sign-in', UserController.loginUser);
router.put('/update_user/:id', UserController.updateUser);
router.delete('/delete_user/:id', authMiddleware, UserController.deleteUser);
router.get('/getAll', authMiddleware, UserController.getAllUser);
router.get('/get-details/:id', UserController.getDetailsUser);
module.exports = router;
