FROM node:16-alpine3.16 AS builder
WORKDIR /app
COPY package.json /app/package.json
RUN npm install

COPY . /app
RUN npm run build

FROM nginx:1.23.4-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

COPY nginx_entrypoint.sh ./nginx_entrypoint.sh

EXPOSE 80

CMD ["/bin/sh", "-x", "./nginx_entrypoint.sh",  "nginx", "-g", "daemon off;"]