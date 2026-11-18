# Sunflower Room

Expo (React Native) app. Web build: https://migielaa.github.io/sunflower-room/

## Develop
```
npm install
npx expo start
```

## Data source
The UI reads data through a `ClassroomRepository` (`src/data/`). By default it
uses a bundled in-memory mock, so the app runs with no configuration.

To fetch live data over HTTP, set a base URL that serves `today.json`:
```
EXPO_PUBLIC_API_URL=https://migielaa.github.io/sunflower-room npx expo start
```
The repo ships `public/today.json` (served from the web build), so the Pages
site works as a read-only backend out of the box. Point `EXPO_PUBLIC_API_URL`
at any backend returning the same shape (`src/models.ts → TodayData`) to swap it
— a REST API, serverless function, Supabase/Firebase wrapper, etc.

## Run with Docker (web)
Builds the web export and serves it with nginx. Good for self-hosting the web
app; native builds use EAS (below), not Docker.

### Prebuilt image (GHCR)
`.github/workflows/docker.yml` publishes `ghcr.io/migielaa/sunflower-room:latest`
on every push to `master`.
```
docker pull ghcr.io/migielaa/sunflower-room:latest
docker run -d --rm -p 8080:80 --name sunflower-room ghcr.io/migielaa/sunflower-room:latest
```
Open http://localhost:8080 (redirects to `/sunflower-room/`). Change the host
port with `-p <port>:80`; stop with `docker stop sunflower-room`.

If the pull is denied, the package is private: GitHub > Packages >
sunflower-room > Package settings > Change visibility > Public (or
`docker login ghcr.io` with a token that has `read:packages`).

The published image uses the in-memory mock. To point it at a backend, build
your own image with `EXPO_PUBLIC_API_URL` (below), since it is baked in at build time.

### Build locally
```
docker build -t sunflower-room .
docker run --rm -p 8080:80 sunflower-room
```
Then open http://localhost:8080 (it redirects to the `/sunflower-room/` base
path from `app.json`). To bake in the HTTP backend, pass it at build time:
```
docker build --build-arg EXPO_PUBLIC_API_URL=https://your-backend -t sunflower-room .
```

## Native builds (EAS)
```
npm i -g eas-cli
eas login
eas build:configure          # first time only, links the project
eas build -p android --profile preview   # installable .apk
eas build -p ios --profile preview       # iOS simulator build
```
Device iOS builds require an Apple Developer account.
