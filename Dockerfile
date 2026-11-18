# syntax=docker/dockerfile:1

# --- build stage: produce the static web bundle ---
FROM node:20-alpine AS build
WORKDIR /app

# Install deps first so this layer is cached until package files change.
# package-lock.json is optional here (the repo doesn't commit one yet);
# add one and switch to `npm ci` for fully reproducible builds.
COPY package.json package-lock.json* ./
RUN npm install

# Build the web export (outputs to /app/dist).
COPY . .
# Optional: bake a backend base URL into the bundle (inlined at build time).
# Empty by default, so the app uses the in-memory mock.
ARG EXPO_PUBLIC_API_URL=""
ENV EXPO_PUBLIC_API_URL=$EXPO_PUBLIC_API_URL
RUN npx expo export --platform web

# --- runtime stage: serve the bundle with nginx ---
FROM nginx:1.27-alpine AS runtime

# app.json sets experiments.baseUrl "/sunflower-room", so the bundle expects
# to be served from that path. Place it there and let nginx route to it.
COPY --from=build /app/dist /usr/share/nginx/html/sunflower-room
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/sunflower-room/ >/dev/null 2>&1 || exit 1
