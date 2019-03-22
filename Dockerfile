FROM node:8
WORKDIR /app

COPY ./src ./src
COPY ./assets ./assets
COPY ./index.html ./
COPY ./index.template.html ./
COPY ./package.json ./
COPY server.js ./
COPY webpack.config.js ./
COPY webpack.production.config.js ./
COPY .babelrc ./

# build project
RUN npm install

EXPOSE 8088

CMD ["npm", "start"]
