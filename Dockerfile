FROM node:14-alpine as build-stage
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

# production stage
FROM nginx:stable as production-stage
COPY --from=build-stage /app/build /var/www
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
