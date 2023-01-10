FROM node:16-alpine as builder


RUN mkdir /app
WORKDIR /app

COPY . /app
RUN rm -rf package-lock.json node_modules

RUN yarn install
RUN yarn prepare-config
RUN yarn build

FROM nginx:1.21-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
#CMD ["yarn", "start"]
