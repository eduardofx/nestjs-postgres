FROM node
WORKDIR /usr/src/app

COPY . .

RUN npm install -g typescript && npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]