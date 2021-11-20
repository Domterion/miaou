FROM docker.io/node:16-alpine

LABEL maintainer="dominic@domm.me" \
      description="Miaou Docker image"

RUN apk update 
RUN apk add git

WORKDIR /opt/miaou

COPY . .

RUN npm i 
RUN npm run lint
RUN npm run build

RUN npx prisma migrate deploy

CMD ["npm", "run", "start"]

