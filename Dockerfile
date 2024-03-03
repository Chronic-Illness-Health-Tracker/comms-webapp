FROM node:latest as build

WORKDIR /app

COPY package.json ./

RUN npm config set registry http://192.168.0.35:4873/

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:latest

COPY --from=build /app/dist/comms-webapp/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

