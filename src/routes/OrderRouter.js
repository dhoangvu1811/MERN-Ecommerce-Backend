const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authUserMiddleware } = require('../middleware/authMiddleware');

router.post('/create/:id', authUserMiddleware, OrderController.createOrder);
router.get('/getAllOrder/:id', authUserMiddleware, OrderController.getAllOrder);
router.get(
    '/getDetailsOrder/:id',
    authUserMiddleware,
    OrderController.getDetailsOrder
);

module.exports = router;
