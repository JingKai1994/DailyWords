// https://nuxt.com/docs/api/configuration/nuxt-config
import process from "node:process";
const sw = process.env.SW === "true";

export default defineNuxtConfig({
    // SEO 和 Meta
    app: {
        head: {
            title: "Daily Words",
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1",
            meta: [
                { name: "keywords", content: "Nuxt.js, 網站, sideproject" },
                {
                    name: "description",
                    content: "Daily Words | 每日學習十單字",
                },
            ],
            link: [{ rel: "icon", type: "image/x-icon", href: "favicon.ico" }],
        },
        pageTransition: { name: "blur", mode: "out-in" }, // 頁面過渡效果
    },
    // 源目录
    srcDir: "src/",
    devtools: { enabled: true },
    modules: [
        "@nuxtjs/stylelint-module",
        "@nuxt/image",
        "nuxt-icon",
        "nuxt-icons",
        "@nuxtjs/color-mode",
        "@element-plus/nuxt",
        "@nuxtjs/tailwindcss",
        "@pinia/nuxt",
        "dayjs-nuxt",
        "@vite-pwa/nuxt",
    ],
    colorMode: {
        classSuffix: "",
        storageKey: "nuxt-color-mode", // 存儲顏色模式
    },
    experimental: {
        viewTransition: true,
    },
    css: [
        "element-plus/theme-chalk/dark/css-vars.css",
        "~/assets/css/main.scss",
    ],
    imports: {
        dirs: ["stores"],
    },
    runtimeConfig: {
        public: {
            GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
            SPREAD_SHEET_ID: process.env.SPREAD_SHEET_ID,
        },
    },
    plugins: ["~/plugins/dexie.ts"],
    pwa: {
        strategies: sw ? "injectManifest" : "generateSW",
        srcDir: sw ? "service-worker" : undefined,
        filename: sw ? "sw.ts" : undefined,
        registerType: "autoUpdate",
        manifest: {
            name: "DailyWords APP",
            short_name: "DailyWords",
            description: "Learn 10 English words every day.",
            theme_color: "#ffffff",
            background_color: "#ffffff",
            icons: [
                {
                    src: "/logo-192.png",
                    sizes: "192x192",
                    type: "image/png",
                },
                {
                    src: "/logo-512.png",
                    sizes: "512x512",
                    type: "image/png",
                },
            ],
        },
        workbox: {
            globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
        },
        injectManifest: {
            globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
        },
        client: {
            installPrompt: true,
        },
        devOptions: {
            enabled: true,
            suppressWarnings: true,
            navigateFallback: "/",
            navigateFallbackAllowlist: [/^\/$/],
            type: "module",
        },
    },
});
