FROM node:lts-alpine as build


RUN mkdir -p /app/node_modules && chown -R node:node /app
WORKDIR /app

COPY package.json ./

ENV NODE_OPTIONS=--max_old_space_size=32448

RUN npm config set registry http://192.168.0.35:4873/

RUN npm install

COPY --chown=node:node . .

RUN npm run build --prod

FROM nginx:latest

COPY --from=build /app/dist/comms-webapp/browser /usr/share/nginx/html

EXPOSE 443
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

