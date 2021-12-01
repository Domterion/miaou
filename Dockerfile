FROM docker.io/node:16-alpine

LABEL maintainer="dominic@domm.me" \
      description="Miaou Docker image"

RUN apk update 
RUN apk add --no-cache \
      git \
      chromium \ 
      nss \ 
      freetype \
      harfbuzz \ 
      ca-certificates \
      ttf-freefont

WORKDIR /opt/miaou

COPY . .

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN npm i 
RUN npm run lint
RUN npm run build

RUN npx prisma migrate deploy

CMD ["npm", "run", "start"]

