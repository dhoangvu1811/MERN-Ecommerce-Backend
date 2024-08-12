const Order = require('../models/OrderProduct');

const createOrderService = async (newOrder) => {
    const {
        orderItems,
        paymentMethod,
        shippingPrice,
        totalPrice,
        name,
        address,
        city,
        phone,
        user,
    } = newOrder;
    try {
        // tạo sản phẩm mới
        const createOrder = await Order.create({
            orderItems,
            shippingAddress: {
                name,
                address,
                city,
                phone,
            },
            paymentMethod,
            shippingPrice,
            totalPrice,
            user,
        });
        // trả về thông báo khi tạo sản phẩm thành công
        if (createOrder) {
            return {
                status: 'success',
                message: 'Thanh toán thành công',
                data: createOrder,
            };
        } else {
            return {
                status: 'error',
                message: 'Thanh toán thất bại',
            };
        }
    } catch (e) {
        return {
            status: 'error',
            message: e.message,
        };
    }
};
module.exports = {
    createOrderService,
};
