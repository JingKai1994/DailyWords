module.exports = {
    root: true,
    env: {
        browser: true, // 支持瀏覽器環境的檢測
        es2021: true, // 支持es2021語法的檢測
        node: true // 支持node環境的檢測
    },
    extends: ['@nuxt/eslint-config'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest', // 解析文件的時候使用最新的ecmaVersion
        sourceType: 'module' // 文件是ES6模塊規範
    },
    plugins: ['vue'],
    rules: {
        indent: ["error", 4],
        camelcase: 'off', // 駝峰
        semi: [2, 'never'], // 要求或禁止使用分號代替 ASI,即禁用行尾使用分號
        quotes: ['error', 'single'], // 強制使用一致的反勾號、雙引號或單引號
        'no-debugger': 2, // 不能debugg
        'no-empty': 2, // 塊語句中的內容不能為空
        'no-extra-parens': 2, // 禁止非必要的括號
        'no-extra-semi': 2, // 禁止多餘的冒號
        'comma-dangle': [2, 'never'], // 鍵值對最後一個不能有,
        'spaced-comment': ['error', 'always'] // 註釋必須空格
    }
}