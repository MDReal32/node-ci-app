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

# Install node via apt
RUN apt-get update && apt-get install -y curl gnupg2 && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# Run node app
RUN echo "node /app/index.js &" > /app/run.sh && \
    chmod +x /app/run.sh

EXPOSE 80
CMD nohup /app/run.sh && nginx -g "daemon off;"
