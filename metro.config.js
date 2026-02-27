// metro.config.cjs
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Block expo-sqlite web worker to prevent WASM bundling error on web
config.resolver.blockList = [
  ...(config.resolver.blockList || []),
  /node_modules\/expo-sqlite\/web\/worker\.ts/,
  /node_modules\/expo-sqlite\/web\/wa-sqlite\/.*/,
];

module.exports = withNativeWind(config, {
  input: "./app/globals.css",
});
