FROM node:14

RUN npm install -g http-server @vue/cli

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]