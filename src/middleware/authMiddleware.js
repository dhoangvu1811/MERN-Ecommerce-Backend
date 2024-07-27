const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const authMiddleware = (req, res, next) => {
    //tách chuỗi token sau đó lấy phần thứ 2
    const token = req.headers.token?.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'Lỗi xác thực',
                status: 'error',
            });
        }
        if (user?.isAdmin) {
            //nếu có quyền admin thì request được đi tiếp
            next();
        } else {
            return res.status(404).json({
                message: 'Cần quyền admin',
                status: 'error',
            });
        }
    });
};
const authUserMiddleware = (req, res, next) => {
    //tách chuỗi token sau đó lấy phần thứ 2
    const token = req.headers.token?.split(' ')[1];
    const userId = req.params.id;
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(401).json({
                message: 'Lỗi xác thực',
                status: 'error',
            });
        }
        if (user?.id === userId || user?.isAdmin) {
            //nếu có quyền admin thì request được đi tiếp hoặc id người dùng trùng với id trong token
            next();
        } else {
            return res.status(404).json({
                message: 'Cần quyền admin hoặc id người dùng không đúng',
                status: 'error',
            });
        }
    });
};
module.exports = {
    authMiddleware,
    authUserMiddleware,
};
