FROM node:16-alpine AS react-builder
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
# flag prevents yarn from generating a lockfile and fails if update is needed
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=react-builder /app/build/ /usr/share/nginx/html