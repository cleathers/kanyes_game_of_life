FROM node:7.5

RUN npm install webpack -g

ADD . /var/www

VOLUME ["/var/www"]

WORKDIR /var/www

CMD webpack
