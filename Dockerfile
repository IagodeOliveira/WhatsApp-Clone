FROM node:16-alpine3.13
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
RUN npm install react-scripts@3.3.1 -g
CMD ["npm", "start"]