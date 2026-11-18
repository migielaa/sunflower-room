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

## Native builds (EAS)
```
npm i -g eas-cli
eas login
eas build:configure          # first time only, links the project
eas build -p android --profile preview   # installable .apk
eas build -p ios --profile preview       # iOS simulator build
```
Device iOS builds require an Apple Developer account.
