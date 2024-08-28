const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const sendEmailCreateOrder = async (email, orderItems) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });
    let listProduct = '';
    const attachImage = [];
    orderItems.forEach((item) => {
        const price = item.price.toLocaleString();
        listProduct += `<li>
            <div>
      <div>Bạn đặt sản phẩm <b>${item.name}</b> với số lượng: <b>${item.amount}</b> và giá của sản phẩm: <b>${price}</b> VNĐ</div>
      <div><img src=${item.image} alt="imgProduct"/></div>
      </div>
        </li>`;
        attachImage.push({
            filename: item.name,
        });
    });
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: process.env.MAIL_ACCOUNT, // list of receivers
        subject: 'Đặt hàng tại ShopDHVok', // Subject line
        text: 'Thành công', // plain text body
        html: `<div><b>Thành công</b></div><ul> ${listProduct}</ul>`, // html body
        attachments: attachImage, // file image
    });
};
module.exports = {
    sendEmailCreateOrder,
};
