# docker build -t node-docker-pos-client .
# docker save -o /home/alex/docker/node-docker-pos-client.tar node-docker-pos-client
#
# copy node-docker-pos-client.tar to production server
# docker run -d -p 8080:80 --name pos-client node-docker-pos-client

# develop stage
FROM node:alpine as develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# build stage
FROM develop-stage as build-stage
RUN npm run build

# production-stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]