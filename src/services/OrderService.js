const Order = require('../models/OrderProduct');
const Product = require('../models/ProductModel');

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
        ispaid,
        paidAt,
    } = newOrder;
    try {
        // Kiểm tra và cập nhật số lượng sản phẩm
        const checkStockPromises = orderItems.map(async (item) => {
            const productData = await Product.findByIdAndUpdate(
                {
                    _id: item.product,
                    // Kiểm tra số lượng sản phẩm còn trong kho lớn hơn hoặc bằng số lượng sản phẩm được mua trong đơn hàng
                    countInStock: { $gte: item.amount },
                },
                {
                    $inc: {
                        countInStock: -item.amount,
                        selled: +item.amount,
                    },
                },
                { new: true }
            );
            if (!productData) {
                return {
                    status: 'error',
                    message: 'Sản phẩm không đủ số lượng',
                    id: item.product,
                };
            }
            return {
                status: 'success',
                id: item.product,
            };
        });

        //chờ tất cả các promise hoàn thành và kiểm tra kết quả trả về
        const results = await Promise.all(checkStockPromises);
        const failedItems = results.filter((item) => item.status === 'error');

        if (failedItems.length > 0) {
            return {
                status: 'error',
                message: `Sản phẩm với ID ${failedItems
                    .map((item) => item.id)
                    .join(', ')} không đủ số lượng`,
                data: failedItems,
            };
        }

        // Nếu tất cả sản phẩm đều có đủ số lượng, tiến hành tạo đơn hàng
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
            ispaid,
            paidAt,
        });

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
const getAllOrderService = async (id) => {
    try {
        //kiểm tra xem đơn hàng có tồn tại không
        const checkOrder = await Order.find({
            user: id,
        });
        if (checkOrder === null) {
            return {
                status: 'error',
                message: 'Đơn hàng không tồn tại',
            };
        }
        return {
            status: 'success',
            message: 'Lấy danh sách đơn hàng thành công',
            data: checkOrder,
        };
    } catch (e) {
        return {
            status: 'error',
            message: e.message,
        };
    }
};
const getDetailsOrderService = async (id) => {
    try {
        //kiểm tra xem đơn hàng có tồn tại không
        const checkOrder = await Order.findOne({
            _id: id,
        });
        if (checkOrder === null) {
            return {
                status: 'error',
                message: 'Đơn hàng không tồn tại',
            };
        }
        return {
            status: 'success',
            message: 'Lấy thông tin đơn hàng thành công',
            data: checkOrder,
        };
    } catch (e) {
        return {
            status: 'error',
            message: e.message,
        };
    }
};
const cancelOrderService = async (id, data) => {
    try {
        // Kiểm tra và cập nhật số lượng sản phẩm
        const checkStockPromises = data.map(async (item) => {
            const productData = await Product.findByIdAndUpdate(
                {
                    _id: item.product,
                    // Kiểm tra số lượng sản phẩm đã bán lớn hơn hoặc bằng số lượng sản phẩm được mua trong đơn hàng
                    selled: { $gte: item.amount },
                },
                {
                    $inc: {
                        countInStock: +item.amount,
                        selled: -item.amount,
                    },
                },
                { new: true }
            );
            if (!productData) {
                return {
                    status: 'error',
                    message: 'Sản phẩm không tồn tại',
                    id: item.product,
                };
            }
            return {
                status: 'success',
                id: item.product,
            };
        });

        //chờ tất cả các promise hoàn thành và kiểm tra kết quả trả về
        const results = await Promise.all(checkStockPromises);
        const failedItems = results.filter((item) => item.status === 'error');

        if (failedItems.length > 0) {
            return {
                status: 'error',
                message: `Sản phẩm với ID ${failedItems
                    .map((item) => item.id)
                    .join(', ')} không tồn tại`,
                data: failedItems,
            };
        }

        //kiểm tra xem đơn hàng có tồn tại không
        const checkOrder = await Order.findOne({
            _id: id,
        });
        if (checkOrder === null) {
            return {
                status: 'error',
                message: 'Đơn hàng không tồn tại',
            };
        }

        //xóa sản phẩm
        await Order.findByIdAndDelete(id);
        return {
            status: 'success',
            message: 'Huỷ đơn hàng thành công',
        };
    } catch (e) {
        return {
            status: 'error',
            message: e.message,
        };
    }
};
const getAllOrderAdminService = async (id) => {
    try {
        const allOrder = await Order.find();
        if (allOrder === null) {
            return {
                status: 'error',
                message: 'Không có đơn hàng nào',
            };
        }
        return {
            status: 'success',
            message: 'Lấy danh sách đơn hàng thành công',
            quanlity: allOrder.length,
            data: allOrder,
        };
    } catch (e) {
        return {
            status: 'error',
            message: e.message,
        };
    }
};
module.exports = {
    createOrderService,
    getAllOrderService,
    getDetailsOrderService,
    cancelOrderService,
    getAllOrderAdminService,
};
