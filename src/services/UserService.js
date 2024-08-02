const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const { genneralAccessToken, genneralRefreshToken } = require('./jwtService');
const createUserService = async (newUser) => {
    const { email, password } = newUser;

    try {
        // Kiểm tra xem email đã tồn tại chưa
        const checkUser = await User.findOne({ email: email });
        if (checkUser !== null) {
            return {
                status: 'error',
                message: 'Email đã tồn tại',
            };
        }

        // Mã hóa mật khẩu
        const hash = await bcrypt.hashSync(password, 10);

        // Tạo người dùng mới
        const createUser = await User.create({ email, password: hash });

        // Kiểm tra xem người dùng đã được tạo thành công hay chưa
        if (createUser) {
            return {
                status: 'success',
                message: 'Tạo tài khoản thành công',
                data: createUser,
            };
        } else {
            return {
                status: 'error',
                message: 'Tạo tài khoản thất bại',
            };
        }
    } catch (e) {
        return {
            status: 'error',
            message: e.message,
        };
    }
};
const loginUserService = async (userLogin) => {
    const { email, password } = userLogin;

    try {
        //kiểm tra xem email đã xác định chưa
        const checkUser = await User.findOne({
            email: email,
        });
        if (checkUser === null) {
            return {
                status: 'error',
                message: 'Email người dùng không xác định',
            };
        }

        //so sánh password đã hash với password người dùng nhập vào
        const comparePassword = bcrypt.compareSync(
            password,
            checkUser.password
        );
        if (!comparePassword) {
            return {
                status: 'error',
                message: 'Mật khẩu hoặc email không chính xác',
            };
        }

        //tạo accessToken và refreshToken mỗi lần người dùng đăng nhập
        const access_token = genneralAccessToken({
            id: checkUser.id,
            isAdmin: checkUser.isAdmin,
        });
        const refresh_token = genneralRefreshToken({
            id: checkUser.id,
            isAdmin: checkUser.isAdmin,
        });

        return {
            status: 'success',
            message: 'Đăng nhập thành công',
            access_token,
            refresh_token,
        };
    } catch (e) {
        return {
            status: 'error',
            message: e.message,
        };
    }
};
const updateUserService = async (id, data) => {
    try {
        //kiểm tra xem người dùng đã tồn tại chưa
        const checkUser = await User.findById(id);
        if (!checkUser) {
            return {
                status: 'error',
                message: 'Người dùng không xác định!',
            };
        }

        //cập nhật thông tin người dùng theo id
        const updatedUser = await User.findByIdAndUpdate(id, data, {
            new: true,
        });

        return {
            status: 'success',
            message: 'Cập nhật thông tin user thành công',
            updatedUser,
        };
    } catch (error) {
        return {
            status: 'error',
            message: error.message,
        };
    }
};
const deleteUserService = async (id) => {
    try {
        //kiểm tra xem người dùng đã tồn tại chưa
        const checkUser = await User.findOne({
            _id: id,
        });
        if (checkUser === null) {
            return {
                status: 'error',
                message: 'Người dùng không xác định!',
            };
        }

        //xóa người dùng theo id
        await User.findByIdAndDelete(id);
        return {
            status: 'success',
            message: 'Xóa người dùng thành công!',
        };
    } catch (e) {
        return {
            status: 'error',
            message: e.message,
        };
    }
};
const getAllUserService = async () => {
    try {
        //lấy tất cả người dùng
        const allUser = await User.find();
        return {
            status: 'success',
            message: 'Lấy danh sách người dùng thành công',
            data: allUser,
        };
    } catch (e) {
        return {
            status: 'error',
            message: e.message,
        };
    }
};
const getDetailsUserService = async (id) => {
    try {
        //lấy thông tin chi tiết người dùng theo id
        const user = await User.findOne({
            _id: id,
        });
        if (user === null) {
            return {
                status: 'error',
                message: 'Người dùng không xác định!',
            };
        }

        return {
            status: 'success',
            message: 'Lấy thông tin người dùng thành công',
            data: user,
        };
    } catch (e) {
        return {
            status: 'error',
            message: e.message,
        };
    }
};
const deleteManyUserService = async (ids) => {
    try {
        //xóa người dùng theo id
        await User.deleteMany({ _id: ids });
        return {
            status: 'success',
            message: 'Xóa người dùng tuỳ chọn thành công!',
        };
    } catch (e) {
        return {
            status: 'error',
            message: e.message,
        };
    }
};
module.exports = {
    createUserService,
    loginUserService,
    updateUserService,
    deleteUserService,
    getAllUserService,
    getDetailsUserService,
    deleteManyUserService,
};
