# Stage 1: Build React Native Web App
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install -g expo-cli && npm install

# Tambahkan ini untuk install dependensi web yang hilang
RUN npx expo install @expo/metro-runtime

# Copy project & build web
COPY . .
RUN npx expo export --platform web

# Stage 2: Serve the built app with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
