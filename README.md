# Dự án MERN Backend

## Tổng quan

Đây là backend cho một ứng dụng MERN stack. Nó cung cấp các API RESTful để quản lý người dùng, sản phẩm, đơn hàng và thanh toán. Backend được xây dựng bằng Node.js, Express và MongoDB, bao gồm các tính năng như xác thực, dịch vụ email và ủy quyền dựa trên JWT.

## Tính năng

- **Quản lý người dùng**: Tạo, cập nhật, xóa và lấy thông tin người dùng.
- **Quản lý sản phẩm**: Thêm, cập nhật, xóa và lấy thông tin sản phẩm.
- **Quản lý đơn hàng**: Đặt hàng, quản lý chi tiết đơn hàng và liên kết sản phẩm với đơn hàng.
- **Tích hợp thanh toán**: Xử lý các hoạt động liên quan đến thanh toán.
- **Xác thực**: Xác thực dựa trên JWT và middleware bảo vệ các route.
- **Thông báo qua email**: Gửi thông báo email bằng dịch vụ EmailService.

## Yêu cầu

- Node.js (phiên bản 14 hoặc mới hơn)
- Docker (tùy chọn, để chạy dự án trong môi trường container)
- MongoDB (chạy cục bộ hoặc có thể truy cập qua chuỗi kết nối)

## Cài đặt

1. Clone repository:

   ```bash
   git clone <repository-url>
   cd projectMERN-backend
   ```

2. Cài đặt các phụ thuộc:

   ```bash
   npm install
   ```

3. Thiết lập biến môi trường:
   Tạo file `.env` trong thư mục gốc và thêm các biến sau:
   ```env
   MONGO_URI=<chuỗi-kết-nối-mongodb-của-bạn>
   JWT_SECRET=<jwt-secret-của-bạn>
   EMAIL_SERVICE_API_KEY=<api-key-dịch-vụ-email-của-bạn>
   ```

## Chạy dự án

### Cục bộ

1. Khởi động server:

   ```bash
   npm start
   ```

2. Server sẽ chạy tại `http://localhost:3000` theo mặc định.

### Sử dụng Docker

1. Build image Docker:

   ```bash
   docker build -t project-mern-backend .
   ```

2. Chạy container Docker:
   ```bash
   docker run -p 3000:3000 --env-file .env project-mern-backend
   ```

## Cấu trúc dự án

- **src/controllers**: Chứa các controller xử lý request.
- **src/middleware**: Middleware cho xác thực và các mục đích khác.
- **src/models**: Các model Mongoose cho các collection MongoDB.
- **src/routes**: Định nghĩa các route API.
- **src/services**: Logic nghiệp vụ và các dịch vụ tiện ích.

## API Endpoints

### Người dùng

- `POST /users` - Tạo người dùng mới
- `GET /users/:id` - Lấy thông tin người dùng
- `PUT /users/:id` - Cập nhật thông tin người dùng
- `DELETE /users/:id` - Xóa người dùng

### Sản phẩm

- `POST /products` - Thêm sản phẩm mới
- `GET /products` - Lấy tất cả sản phẩm
- `GET /products/:id` - Lấy thông tin sản phẩm
- `PUT /products/:id` - Cập nhật thông tin sản phẩm
- `DELETE /products/:id` - Xóa sản phẩm

### Đơn hàng

- `POST /orders` - Đặt đơn hàng mới
- `GET /orders` - Lấy tất cả đơn hàng
- `GET /orders/:id` - Lấy thông tin đơn hàng

### Thanh toán

- `POST /payments` - Xử lý thanh toán

## Giấy phép

Dự án này được cấp phép theo giấy phép MIT.
