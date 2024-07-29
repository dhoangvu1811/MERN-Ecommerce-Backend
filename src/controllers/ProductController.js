const ProductService = require('../services/ProductService');
const createProduct = async (req, res) => {
    try {
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
        } = req.body;

        //kiểm tra xem các trường có được nhập không
        if (
            !name ||
            !image ||
            !type ||
            !countInStock ||
            !price ||
            !rating ||
            // !selled ||
            // !discount ||
            !description
        ) {
            return res.status(400).json({
                status: 'error',
                message: 'Vui lòng nhập đầy đủ thông tin',
            });
        }

        //gọi hàm tạo sản phẩm từ ProductService
        const response = await ProductService.createProductService(req.body);
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
const updateProduct = async (req, res) => {
    try {
        //lấy tham số được truyền trong URL của request và dữ liệu được truyền trong body của request
        const productId = req.params.id;
        const data = req.body;

        //kiểm tra xem productId có được truyền vào không
        if (!productId) {
            return res.status(400).json({
                status: 'error',
                message: 'ProductId là bắt buộc!',
            });
        }

        //gọi hàm updateProductService từ ProductService để cập nhật sản phẩm
        const response = await ProductService.updateProductService(
            productId,
            data
        );
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
const getDetailProduct = async (req, res) => {
    try {
        //lấy tham số được truyền trong URL của request
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({
                status: 'error',
                message: 'ProductId là bắt buộc!',
            });
        }

        //gọi hàm getDetailsProductService từ ProductService để lấy thông tin chi tiết sản phẩm
        const response = await ProductService.getDetailsProductService(
            productId
        );
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
const deleteProduct = async (req, res) => {
    try {
        //lấy tham số được truyền trong URL của request
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({
                status: 'error',
                message: 'ProductId là bắt buộc!',
            });
        }

        //gọi hàm deleteProductService từ ProductService để xóa sản phẩm
        const response = await ProductService.deleteProductService(productId);
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
const getAllProduct = async (req, res) => {
    try {
        //lấy các tham số được truyền trong query của request
        const { limit, page, sort, filter } = req.query;

        //gọi hàm getAllProductService từ ProductService để lấy danh sách sản phẩm
        const response = await ProductService.getAllProductService(
            Number(limit) || 10,
            Number(page) || 0,
            sort,
            filter
        );
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            status: 'error',
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
