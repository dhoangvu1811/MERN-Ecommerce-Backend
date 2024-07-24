const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const authMiddleware = (req, res, next) => {
    //tách chuỗi token sau đó lấy phần thứ 2
    const token = req.headers.token?.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR',
            });
        }
        const { payload } = user;
        if (payload?.isAdmin) {
            //nếu có quyền admin thì request được đi tiếp
            next();
        } else {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR',
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
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR',
            });
        }
        const { payload } = user;
        if (payload?.isAdmin || payload?.id === userId) {
            //nếu có quyền admin thì request được đi tiếp
            next();
        } else {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR',
            });
        }
    });
};
module.exports = {
    authMiddleware,
    authUserMiddleware,
};
