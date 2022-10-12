# Builder App
FROM node:latest as builder

# Copy source to container
COPY . /app
WORKDIR /app

# Install node dependencies
RUN yarn && yarn build

# Test App
RUN yarn test

# Runner App
FROM nginx:latest
COPY --from=builder /app/build /app
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

# Install node via nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
RUN . ~/.nvm/nvm.sh && nvm install node

# Install pm2
RUN npm install pm2 -g

# Run app with pm2
RUN pm2 start /app/index.js --name "app"

EXPOSE 80
CMD nginx -g "daemon off;"
