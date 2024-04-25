import 'dotenv/config';

interface ExpoConfig {
    name: string;
    slug: string;
    version: string;
    orientation: string;
    icon: string;
    userInterfaceStyle: string;
    splash: {
        image: string;
        resizeMode: string;
        backgroundColor: string;
    };
    assetBundlePatterns: string[];
    ios: {
        supportsTablet: boolean;
    };
    android: {
        adaptiveIcon: {
            foregroundImage: string;
            backgroundColor: string;
        };
    };
    web: {
        favicon: string;
    };
    plugins: (string | { fonts: string[] })[][];
    platforms: string[];
    extra: {
        clerkPublishableKey?: string;
    };
}

const config: ExpoConfig = {
    name: "bathroom-finder-frontend",
    slug: "bathroom-finder-frontend",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "light",
    splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
        supportsTablet: true
    },
    android: {
        adaptiveIcon: {
            foregroundImage: "./assets/images/adaptive-icon.png",
            backgroundColor: "#ffffff"
        }
    },
    web: {
        favicon: "./assets/images/favicon.png"
    },
    plugins: [
        [
            "expo-font",
            {
                fonts: ["./assets/fonts/EudoxusSans-Regular.ttf"]
            }
        ]
    ],
    platforms: ["ios", "android"],
    extra: {
        clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
    }
};

export default config;
