FROM docker.io/node:16-alpine

LABEL maintainer="dominic@domm.me" \
      description="Miaou Docker image"

WORKDIR /opt/miaou

COPY . .

RUN npm i 
RUN npm run lint
RUN npm run build

RUN npx prisma migrate deploy

CMD ["npm", "run", "start"]

