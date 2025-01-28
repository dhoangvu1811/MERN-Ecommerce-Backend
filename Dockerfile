# Sử dụng image Node.js chính thức làm base image
FROM node:20

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Sao chép file .env vào thư mục làm việc
COPY .env .env

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn của bạn vào container
COPY . .

# Expose cổng mà ứng dụng sẽ chạy
EXPOSE 3001

# Lệnh để khởi động ứng dụng
CMD ["npm", "start"]
