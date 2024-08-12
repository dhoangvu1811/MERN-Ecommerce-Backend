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
module.exports = {
    createOrder,
};
