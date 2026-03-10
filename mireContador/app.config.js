const IS_HOMOLOG = process.env.APP_VARIANT === 'homolog';

export default {
    name: IS_HOMOLOG ? "mireContador (HML)" : "mireContador",
    slug: "mireContador",
    owner: "guizx123",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "mirecontador",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
        supportsTablet: true,
        bundleIdentifier: IS_HOMOLOG ? "com.anonymous.mireContador.homolog" : "com.anonymous.mireContador"
    },
    android: {
        adaptiveIcon: {
            backgroundColor: "#E6F4FE",
            foregroundImage: "./assets/images/android-icon-foreground.png",
            backgroundImage: "./assets/images/android-icon-background.png",
            monochromeImage: "./assets/images/android-icon-monochrome.png"
        },
        package: IS_HOMOLOG ? "com.anonymous.mireContador.homolog" : "com.anonymous.mireContador",
        softwareKeyboardLayoutMode: "adjustResize",
        statusBar: {
            barStyle: "dark-content",
            backgroundColor: "#F8FAFC",
            translucent: false
        }
    },
    updates: {
        url: "https://u.expo.dev/c8c4440f-5725-4a3d-8348-03b2784b4d0c"
    },
    runtimeVersion: {
        policy: "appVersion"
    },
    plugins: [
        "expo-router",
        [
            "expo-splash-screen",
            {
                "image": "./assets/images/splash-icon.png",
                "imageWidth": 200,
                "resizeMode": "contain",
                "backgroundColor": "#ffffff",
                "dark": {
                    "backgroundColor": "#000000"
                }
            }
        ],
        "expo-sqlite"
    ],
    extra: {
        router: {},
        eas: {
            projectId: "c8c4440f-5725-4a3d-8348-03b2784b4d0c"
        },
        variant: IS_HOMOLOG ? "homolog" : "production"
    }
};
