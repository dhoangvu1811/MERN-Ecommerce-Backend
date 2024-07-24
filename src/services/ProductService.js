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
const getAllProductService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allProduct = await Product.find();
            resolve({
                status: 'ok',
                message: 'Get all product success',
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
