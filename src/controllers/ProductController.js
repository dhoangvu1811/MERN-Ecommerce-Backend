const ProductService = require('../services/ProductService');
const createProduct = async (req, res) => {
    try {
        const { name, image, type, countInStock, price, rating, description } =
            req.body;
        if (!name || !image || !type || !countInStock || !price || !rating) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required',
            });
        }
        const response = await ProductService.createProductService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body;
        if (!productId) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The productId is required!',
            });
        }
        const response = await ProductService.updateProductService(
            productId,
            data
        );
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};
const getDetailProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required!',
            });
        }
        const response = await ProductService.getDetailsProductService(
            productId
        );
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};
const deleteProduct = async (req, res) => {
    try {
        //lấy tham số được truyền trong URL của request
        const productId = req.params.id;
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required!',
            });
        }
        const response = await ProductService.deleteProductService(productId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};
const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query;
        const response = await ProductService.getAllProductService(
            Number(limit) || 8,
            Number(page) || 0,
            sort,
            filter
        );
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};
module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct,
};
