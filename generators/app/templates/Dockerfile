FROM node:8.5.0

RUN apt-get update && apt-get upgrade -y

RUN apt-get install -y build-essential python-software-properties curl

RUN apt-get install -y ruby

RUN npm install node-gyp -g

RUN npm install -g gulp-cli

RUN npm install -g babel-core

ADD . .

RUN npm install socket.io socket.io-client -g

RUN npm install

EXPOSE 3000

#WORKDIR dist