# Sử dụng một image Node.js chính thức làm base image
FROM node:20-alpine AS build

# Set working directory trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies cần thiết
RUN yarn

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng React
RUN yarn build

# Cung cấp thư mục build để chạy ứng dụng
# Dùng Nginx để phục vụ ứng dụng React đã build
FROM nginx:alpine

# Sao chép build folder từ container trước đó vào thư mục mà Nginx sử dụng để phục vụ tệp tĩnh
COPY --from=0 /app/build /usr/share/nginx/html

# Expose cổng 80 cho Nginx
EXPOSE 80

# Chạy Nginx để phục vụ ứng dụng
CMD ["nginx", "-g", "daemon off;"]
