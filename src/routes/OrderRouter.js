const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authUserMiddleware } = require('../middleware/authMiddleware');

router.post('/create/:id', authUserMiddleware, OrderController.createOrder);

module.exports = router;
