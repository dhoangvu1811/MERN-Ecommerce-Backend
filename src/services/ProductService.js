const Product = require('../models/ProductModel');
const createProductService = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, countInStock, price, rating, description } =
            newProduct;
        try {
            const checkProduct = await Product.findOne({
                name: name,
            });
            if (checkProduct !== null) {
                resolve({
                    status: 'ok',
                    message: 'The name of product is already!',
                });
            }
            const createProduct = await Product.create({
                name,
                image,
                type,
                countInStock,
                price,
                rating,
                description,
            });
            if (createProduct) {
                resolve({
                    status: 'ok',
                    message: 'Create product success',
                    data: createProduct,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
const updateProductService = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            });
            if (checkProduct === null) {
                resolve({
                    status: 'ok',
                    message: 'The product is defined!',
                });
            }
            const updateProduct = await Product.findByIdAndUpdate(id, data, {
                new: true,
            });
            resolve({
                status: 'ok',
                message: 'Update product success',
                data: updateProduct,
            });
        } catch (e) {
            reject(e);
        }
    });
};
const getDetailsProductService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            });
            if (checkProduct === null) {
                resolve({
                    status: 'ok',
                    message: 'the product is not defined!',
                });
            }
            resolve({
                status: 'ok',
                message: 'Get details success',
                data: checkProduct,
            });
        } catch (e) {
            reject(e);
        }
    });
};
const deleteProductService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id,
            });
            if (checkProduct === null) {
                resolve({
                    status: 'ok',
                    message: 'the product is not defined!',
                });
            }
            await Product.findByIdAndDelete(id);
            resolve({
                status: 'ok',
                message: 'Delete product success',
            });
        } catch (e) {
            reject(e);
        }
    });
};
const getAllProductService = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
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
                resolve({
                    status: 'ok',
                    message: 'Get all product success',
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit),
                    data: allProductFilter,
                });
            }
            if (sort) {
                //sắp xếp product theo giá trị của sort và bỏ qua product trước nó
                const objectSort = { [sort[1]]: sort[0] };
                const allProductSort = await Product.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(objectSort);
                resolve({
                    status: 'ok',
                    message: 'Get all product success',
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    //tính tổng số trang dựa vào tổng số product và số lượng product trên 1 trang (limit) làm tròn lên
                    totalPage: Math.ceil(totalProduct / limit),
                    data: allProductSort,
                });
            }
            //giới hạn product trên 1 trang và bỏ qua product trước nó
            const allProduct = await Product.find()
                .limit(limit)
                .skip(page * limit);
            resolve({
                status: 'ok',
                message: 'Get all product success',
                total: totalProduct,
                pageCurrent: Number(page + 1),
                //tính tổng số trang dựa vào tổng số product và số lượng product trên 1 trang (limit) làm tròn lên
                totalPage: Math.ceil(totalProduct / limit),
                data: allProduct,
            });
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    createProductService,
    updateProductService,
    getDetailsProductService,
    deleteProductService,
    getAllProductService,
};
