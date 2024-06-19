module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            // type枚舉
            2,
            'always',
            [
                'build', // 編譯相關的修改，例如發佈版本、對項目構建或者依賴的改動
                'feat', // 新功能
                'fix', // 修補bug
                'docs', // 文檔修改
                'style', // 代碼格式修改, 注意不是 css 修改
                'refactor', // 重構
                'perf', // 優化相關，比如提升性能、體驗
                'test', // 測試用例修改
                'revert', // 代碼回滾
                'ci', // 持續集成修改
                'config', // 配置修改
                'chore' // 其他改動
            ]
        ],
        'type-empty': [2, 'never'], // never: type不能為空; always: type必須為空
        'type-case': [0, 'always', 'lower-case'], // type必須小寫，upper-case大寫，camel-case小駝峰，kebab-case短橫線，pascal-case大駝峰，等等
        'scope-empty': [0],
        'scope-case': [0],
        'subject-empty': [2, 'never'], // subject不能為空
        'subject-case': [0],
        'subject-full-stop': [0, 'never', '.'], // subject以.為結束標記
        'header-max-length': [2, 'always', 72], // header最長72
        'body-leading-blank': [0], // body換行
        'footer-leading-blank': [0, 'always'] // footer以空行開頭
    }
}