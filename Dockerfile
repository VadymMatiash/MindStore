FROM node:8 as react-build

WORKDIR /app

COPY package*.json ./
COPY client/package.json client/package.json

RUN npm install
RUN npm run client-install

COPY . .

RUN npm run build

EXPOSE 5001
CMD ["npm", "start"]