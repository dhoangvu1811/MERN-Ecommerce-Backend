const Product = require('../models/ProductModel');
const createProductService = async (newProduct) => {
    const {
        name,
        image,
        type,
        countInStock,
        price,
        rating,
        description,
        selled,
        discount,
    } = newProduct;
    try {
        // kiểm tra sản phẩm đã tồn tại chưa
        const checkProduct = await Product.findOne({
            name: name,
        });
        if (checkProduct !== null) {
            return {
                status: 'error',
                message: 'Sản phẩm đã tồn tại',
            };
        }

        //tạo sản phẩm mới
        const createProduct = await Product.create({
            name,
            image,
            type,
            countInStock,
            price,
            rating,
            description,
            selled,
            discount,
        });

        //trả về thông báo khi tạo sản phẩm thành công
        if (createProduct) {
            return {
                status: 'success',
                message: 'Tạo sản phẩm thành công',
                data: createProduct,
            };
        } else {
            return {
                status: 'error',
                message: 'Tạo sản phẩm thất bại',
            };
        }
    } catch (e) {
        return {
            status: 'error',
            message: e.message,
        };
    }
};
const updateProductService = async (id, data) => {
    try {
        //kiểm tra xem sản phẩm có tồn tại không
        const checkProduct = await Product.findOne({
            _id: id,
        });
        if (checkProduct === null) {
            return {
                status: 'error',
                message: 'Sản phẩm không tồn tại',
            };
        }

        //cập nhật sản phẩm
        const updateProduct = await Product.findByIdAndUpdate(id, data, {
            new: true,
        });
        return {
            status: 'success',
            message: 'Cập nhật sản phẩm thành công',
            data: updateProduct,
        };
    } catch (e) {
        return {
            status: 'error',
            message: e.message,
        };
    }
};
const getDetailsProductService = async (id) => {
    try {
        //kiểm tra xem sản phẩm có tồn tại không
        const checkProduct = await Product.findOne({
            _id: id,
        });
        if (checkProduct === null) {
            return {
                status: 'error',
                message: 'Sản phẩm không tồn tại',
            };
        }
        return {
            status: 'success',
            message: 'Lấy thông tin sản phẩm thành công',
            data: checkProduct,
        };
    } catch (e) {
        return {
            status: 'error',
            message: e.message,
        };
    }
};
const deleteProductService = async (id) => {
    try {
        //kiểm tra xem sản phẩm có tồn tại không
        const checkProduct = await Product.findOne({
            _id: id,
        });
        if (checkProduct === null) {
            return {
                status: 'error',
                message: 'Sản phẩm không tồn tại',
            };
        }

        //xóa sản phẩm
        await Product.findByIdAndDelete(id);
        return {
            status: 'success',
            message: 'Xóa sản phẩm thành công',
        };
    } catch (e) {
        return {
            status: 'error',
            message: e.message,
        };
    }
};
const getAllProductService = async (limit, page, sort, filter) => {
    try {
        // Kiểm tra giá trị hợp lệ của limit và page
        if (limit <= 0) limit = 10;
        if (page < 0) page = 0;
        //đếm số lượng product
        const totalProduct = await Product.countDocuments();
        if (filter) {
            const label = filter[0];
            //tìm kiếm theo biểu thức chính quy của filter[1] và giới hạn product trên 1 trang và bỏ qua product trước nó
            const allProductFilter = await Product.find({
                [label]: { $regex: filter[1] },
            })
                .limit(limit)
                .skip(page * limit);
            return {
                status: 'success',
                message: 'lấy danh sách sản phẩm thành công',
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit),
                data: allProductFilter,
            };
        }
        if (sort) {
            //sắp xếp product theo giá trị của sort và bỏ qua product trước nó
            const objectSort = { [sort[1]]: sort[0] };
            const allProductSort = await Product.find()
                .limit(limit)
                .skip(page * limit)
                .sort(objectSort);
            return {
                status: 'success',
                message: 'lấy danh sách sản phẩm thành công',
                total: totalProduct,
                pageCurrent: Number(page + 1),
                //tính tổng số trang dựa vào tổng số product và số lượng product trên 1 trang (limit) làm tròn lên
                totalPage: Math.ceil(totalProduct / limit),
                data: allProductSort,
            };
        }
        //giới hạn product trên 1 trang và bỏ qua product trước nó
        const allProduct = await Product.find()
            .limit(limit)
            .skip(page * limit);
        return {
            status: 'success',
            message: 'lấy danh sách sản phẩm thành công',
            total: totalProduct,
            pageCurrent: Number(page + 1),
            //tính tổng số trang dựa vào tổng số product và số lượng product trên 1 trang (limit) làm tròn lên
            totalPage: Math.ceil(totalProduct / limit),
            data: allProduct,
        };
    } catch (e) {
        return {
            status: 'error',
            message: e.message,
        };
    }
};
module.exports = {
    createProductService,
    updateProductService,
    getDetailsProductService,
    deleteProductService,
    getAllProductService,
};
