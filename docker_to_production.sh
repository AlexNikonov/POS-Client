docker build -t node-docker-pos-client .
docker save -o /home/alex/docker/node-docker-pos-client.tar node-docker-pos-client

scp /home/alex/docker/node-docker-pos-client.tar alex@192.168.1.6:/home/alex/docker

ssh alex@192.168.1.6 docker stop pos-client
ssh alex@192.168.1.6 docker container rm $(docker container ls -q -f 'status=exited' -f 'exited=0')
ssh alex@192.168.1.6 docker rmi node-docker-pos-client

ssh alex@192.168.1.6 docker load -i /home/alex/docker/node-docker-pos-client.tar
ssh alex@192.168.1.6 docker run -d -p 80:80 --name pos-client node-docker-pos-client