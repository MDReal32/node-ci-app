# Builder App
FROM node:latest as builder

# Copy source to container
COPY .. /app
WORKDIR /app

# Install node dependencies
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn

# Test App
RUN yarn test

# Build App
RUN yarn build

# Runner App
FROM nginx:latest as runner
COPY --from=builder /app/dist /app
COPY --from=builder /app/.ci/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/.ci/conf.d /etc/nginx/conf.d
COPY --from=builder /app/node_modules /app/node_modules

# Install node via nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
RUN . ~/.nvm/nvm.sh && nvm install node

# Install pm2
RUN npm install pm2 -g

# Run app with pm2
RUN pm2 start /app/index.js --name "app"

EXPOSE 80
CMD nginx -g "daemon off;"
