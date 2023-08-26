WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --prod

FROM nginx:alpine
COPY --from=build /app/dist/YOUR_ANGULAR_APP_NAME /usr/share/nginx/html