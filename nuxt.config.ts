// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // SEO 和 Meta
    //   app: {
    //     head: {
    //       title: "每日十單字",
    //       charset: "utf-8",
    //       viewport: "width=device-width, initial-scale=1",
    //       meta: [
    //         { name: "keywords", content: "Nuxt.js, 網站, sideproject" },
    //         { name: "description", content: "每日學習十單字" },
    //       ],
    //       link: [{ rel: "icon", type: "image/x-icon", href: "favicon.ico" }],
    //     },
    //     pageTransition: { name: "blur", mode: "out-in" }, // 頁面過渡效果
    //   },
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
    app: {
        pageTransition: { name: "blur", mode: "out-in" },
    },
    imports: {
        dirs: ["stores"],
    },
    runtimeConfig: {
        public: {
            GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
            SPREAD_SHEET_ID: process.env.SPREAD_SHEET_ID,
        },
    },
    plugins: ["~/plugins/dexie.ts"]
});
