const OrderService = require('../services/OrderService');

const createOrder = async (req, res) => {
    try {
        const {
            paymentMethod,
            shippingPrice,
            totalPrice,
            name,
            address,
            city,
            phone,
        } = req.body;

        //kiểm tra xem các trường có được nhập không
        if (
            !paymentMethod ||
            !shippingPrice ||
            !totalPrice ||
            !name ||
            !address ||
            !city ||
            !phone
        ) {
            return res.status(400).json({
                status: 'error',
                message: 'Vui lòng nhập đầy đủ thông tin',
            });
        }

        //gọi hàm tạo sản phẩm từ ProductService
        const response = await OrderService.createOrderService(req.body);
        if (response.status === 'error') {
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: e.message,
        });
    }
};
const getAllOrder = async (req, res) => {
    try {
        //lấy tham số được truyền trong URL của request
        const userOrderId = req.params.id;
        if (!userOrderId) {
            return res.status(400).json({
                status: 'error',
                message: 'orderId là bắt buộc!',
            });
        }

        const response = await OrderService.getAllOrderService(userOrderId);
        if (response.status === 'error') {
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: e,
        });
    }
};
const getDetailsOrder = async (req, res) => {
    try {
        //lấy tham số được truyền trong URL của request
        const orderId = req.query.idOrder;
        if (!orderId) {
            return res.status(400).json({
                status: 'error',
                message: 'orderId là bắt buộc!',
            });
        }

        const response = await OrderService.getDetailsOrderService(orderId);
        if (response.status === 'error') {
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: e,
        });
    }
};
const cancelOrder = async (req, res) => {
    try {
        //lấy tham số được truyền trong URL của request
        const orderId = req.query.idOrder;
        const data = req.body;
        // console.log(orderId, req.body[0].amount);
        if (!orderId) {
            return res.status(400).json({
                status: 'error',
                message: 'orderId là bắt buộc!',
            });
        }

        const response = await OrderService.cancelOrderService(orderId, data);
        if (response.status === 'error') {
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            status: 'error',
            message: e,
        });
    }
};
const getAllOrderAdmin = async (req, res) => {
    try {
        const response = await OrderService.getAllOrderAdminService();
        if (response.status === 'error') {
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'error',
            message: e,
        });
    }
};
module.exports = {
    createOrder,
    getAllOrder,
    getDetailsOrder,
    cancelOrder,
    getAllOrderAdmin,
};
