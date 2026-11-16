# Sunflower Room

Expo (React Native) app. Web build: https://migielaa.github.io/sunflower-room/

## Develop
```
npm install
npx expo start
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
