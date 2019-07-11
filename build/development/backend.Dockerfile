FROM node:12.4.0

WORKDIR /code

COPY . .
RUN yarn

ENV PORT=8080
# ENV NODE_ENV=production
ENV REDIS_DOMAIN_NAME=redis

RUN yarn ts:build
RUN yarn workspace @chattr/site build
RUN cp -r packages/site/build/* packages/backend/static

CMD ["yarn", "workspace", "@chattr/backend", "start"]