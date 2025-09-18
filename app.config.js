import "dotenv/config";

export default {
  expo: {
    name: "prev-heart-app",
    slug: "prev-heart-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/prev_heart_icon_1024.png",
    scheme: "prevheartapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/coracao_splash_expo_v2.png",
      resizeMode: "contain",
      backgroundColor: "#0095DB",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "dev.expo.prevheart",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon_adaptive_foreground_1024.png",
        backgroundColor: "#0095DB",
      },
      edgeToEdgeEnabled: true,
      package: "dev.expo.prevheart",
      googleServicesFile: "./google-services.json",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["expo-router", "expo-localization"],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: "65ca059a-bb1e-4b0c-b65f-e74755a6aaaf",
      },
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
    },
    owner: "williamexpo001",
  },
};
