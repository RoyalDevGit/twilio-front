FROM node:16-alpine3.12
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN yarn install
# Disable next.js telemetry (see https://nextjs.org/telemetry#how-do-i-opt-out)
RUN npx next telemetry disable
RUN yarn build
EXPOSE 3000
CMD yarn start