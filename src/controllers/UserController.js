const UserService = require('../services/UserService');
const jwtService = require('../services/jwtService');
const createUser = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({
                status: 'error',
                message: 'Vui lòng nhập đầy đủ thông tin',
            });
        }

        // Kiểm tra định dạng email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: 'error',
                message: 'Email không đúng định dạng',
            });
        }

        // Kiểm tra mật khẩu
        if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'error',
                message: 'Xác nhận mật khẩu không khớp',
            });
        }

        // Gọi createUserService tạo người dùng
        const response = await UserService.createUserService(req.body);

        if (response.status === 'error') {
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Có lỗi xảy ra, vui lòng thử lại sau',
        });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //kiểm tra dữ liệu đầu vào
        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Vui lòng nhập đầy đủ thông tin',
            });
        }

        //kiểm tra định dạng email
        const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const isCheckEmail = reg.test(email);
        if (!isCheckEmail) {
            return res.status(400).json({
                status: 'error',
                message: 'Email không đúng định dạng',
            });
        }

        const response = await UserService.loginUserService(req.body);
        // Xóa refresh_token khỏi response trước khi trả về client
        const { refresh_token, ...newResponse } = response;
        // Set cookie refresh_token
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: true,
        });
        if (response.status === 'error') {
            return res.status(400).json(response);
        }
        return res.status(200).json(newResponse);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Có lỗi xảy ra, vui lòng thử lại sau',
        });
    }
};
const updateUser = async (req, res) => {
    try {
        //lấy tham số được truyền trong URL của request và dữ liệu được truyền trong body của request
        const userId = req.params.id;
        const data = req.body;
        const { email, name, address, phone, image } = data;
        if (!email || !name || !address || !phone || !image) {
            return res.status(400).json({
                status: 'error',
                message: 'Vui lòng nhập đầy đủ thông tin',
            });
        }

        if (!userId) {
            return res.status(400).json({
                status: 'error',
                message: 'ID người dùng là bắt buộc!',
            });
        }

        // Gọi updateUserService để cập nhật thông tin người dùng
        const response = await UserService.updateUserService(userId, data);
        if (response.status === 'error') {
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        //lấy tham số được truyền trong URL của request
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({
                status: 'error',
                message: 'ID người dùng là bắt buộc!',
            });
        }

        // Gọi deleteUserService để xóa người dùng
        const response = await UserService.deleteUserService(userId);
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
const getAllUser = async (req, res) => {
    try {
        // Gọi getAllUserService để lấy danh sách người dùng
        const response = await UserService.getAllUserService();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};
const getDetailsUser = async (req, res) => {
    try {
        //lấy tham số được truyền trong URL của request
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({
                status: 'error',
                message: 'ID người dùng là bắt buộc!',
            });
        }

        // Gọi getDetailsUserService để lấy thông tin chi tiết người dùng
        const response = await UserService.getDetailsUserService(userId);
        if (response.status === 'error') {
            return res.status(400).json(response);
        }
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e,
        });
    }
};
const refreshToken = async (req, res) => {
    // console.log('req.cookies', req.headers);
    try {
        //lấy token từ header của request và kiểm tra xem token có tồn tại không
        const token = req.headers.cookie.split('=')[1];
        if (!token) {
            return res.status(400).json({
                status: 'error',
                message: 'Token bắt buộc!',
            });
        }

        // Gọi refreshTokenService để tạo mới token
        const response = await jwtService.refreshTokenService(token);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};
const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({
            status: 'success',
            message: 'Đăng xuất thành công',
        });
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};
const deleteManyUser = async (req, res) => {
    try {
        //lấy tham số được truyền trong URL của request
        const userIds = req.body.ids;
        if (!userIds) {
            return res.status(400).json({
                status: 'error',
                message: 'ID người dùng là bắt buộc!',
            });
        }

        // Gọi deleteUserService để xóa người dùng
        const response = await UserService.deleteManyUserService(userIds);
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
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser,
    deleteManyUser,
};
