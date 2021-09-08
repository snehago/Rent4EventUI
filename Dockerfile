FROM node:lts-alpine as build-stage
# set working direction
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
# add app
COPY . .
# build app
RUN npm run build

# production stage
FROM nginx:stable as production-stage
COPY --from=build-stage /app/build /var/www
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
