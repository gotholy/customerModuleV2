FROM node:alpine
WORKDIR /app
EXPOSE 7777
COPY . .
RUN npm i 
CMD ["node", "--watch", "index.js"]
