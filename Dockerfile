# Build Tailwind CSS
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY src/input.css ./src/input.css
COPY *.html ./
RUN mkdir -p css && npx @tailwindcss/cli -i ./src/input.css -o ./css/style.css --minify

# Serve static files with nginx
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY *.html /usr/share/nginx/html/
COPY js/ /usr/share/nginx/html/js/
COPY imgs/ /usr/share/nginx/html/imgs/
COPY --from=build /app/css/style.css /usr/share/nginx/html/css/style.css

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ > /dev/null || exit 1
