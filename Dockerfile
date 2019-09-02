# docker build -t node-docker-pos-client .
# docker save -o /home/alex/docker/node-docker-pos-client.tar node-docker-pos-client
#
# copy node-docker-pos-client.tar to production server
# scp node-docker-pos-client.tar alex@192.168.1.6:/home/alex/docker
#
# docker load -i node-docker-pos-client.tar
# docker run -d -p 80:80 --name pos-client node-docker-pos-client

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