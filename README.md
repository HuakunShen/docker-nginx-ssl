# dockerize(nginx+ssl)

Web App Deployment with docker, Nginx and SSL

## ubuntu+nginx+certbot - Dockerfile

```Dockerfile
FROM ubuntu:18.04

RUN apt update -y \
    && apt install nginx -y \
    && apt-get install software-properties-common -y \
    && add-apt-repository ppa:certbot/certbot -y \
    && apt-get update -y \
    && apt-get install python-certbot-nginx -y \
    && apt-get clean

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
```

## Nginx Configuration - default.conf

```
server {
        listen 80 default_server;
        listen [::]:80 default_server;
        root /var/www/html;
        index index.html index.htm index.nginx-debian.html;
        server_name domain.com www.domain.com;
        location / {
            root /var/www/html;
            try_files $uri /index.html;
        }
        location /api/ {
            proxy_pass http://server/api/;
        }
}
```

## docker-compose.yml

```yaml
version: '3.8'
services:
  server:
    image: node:12-alpine
    ports:
      - '8080:80'
    volumes:
      - ./server:/root/server
    env_file:
      - ./deploy/server.env
    entrypoint: sh /root/server/start_server.sh
  frontend:
    build:
      context: ./deploy
      dockerfile: Dockerfile
    ports:
      - '80:80'
      - '443:443'
    volumes:
      - ./frontend/build:/var/www/html
      - ./deploy/default.conf:/etc/nginx/sites-available/default
    depends_on:
      - server
```

## Deploy and Setup SSL

```bash
docker-compose up -d
docker exec -it <frontend_container> bash       # bash into the nginx container
certbot --nginx -d domain.com -d www.domain.com     # setup SSL certificate
```
