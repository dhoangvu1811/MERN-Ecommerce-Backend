const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const genneralAccessToken = (payload) => {
    const access_token = jwt.sign(
        {
            payload,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: '1m' }
    );
    return access_token;
};
const genneralRefreshToken = (payload) => {
    const refresh_token = jwt.sign(
        {
            payload,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: '365d' }
    );
    return refresh_token;
};
const refreshTokenService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, (err, user) => {
                if (err) {
                    resolve({
                        status: 'ERROR',
                        message: 'The authentication',
                    });
                }
                const { payload } = user;
                const access_token = genneralAccessToken({
                    id: payload?.id,
                    isAdmin: payload?.isAdmin,
                });
                resolve({
                    status: 'ok',
                    message: 'Get details success',
                    access_token,
                });
            });
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenService,
};
