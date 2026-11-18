// EXPO_PUBLIC_* vars are inlined at build time by Expo.
// Set EXPO_PUBLIC_API_URL to a base URL (e.g. your GitHub Pages site) to fetch
// live data over HTTP. Leave it unset to use the bundled in-memory mock.
export const API_URL: string = process.env.EXPO_PUBLIC_API_URL ?? '';
