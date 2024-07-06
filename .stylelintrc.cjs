module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'], // // 這裡保證 stylelint-config-recommended-vue 放在最後，不然 vue 文件會報錯
    plugins: ['stylelint-order'],
    rules: {
        // 禁止空塊
        'block-no-empty': true,
        // 顏色6位長度
        'color-hex-length': 'long',
        // 兼容自定義標籤名
        'selector-type-no-unknown': [
            true,
            {
                ignoreTypes: []
            }
        ],
        "selector-class-pattern": null, 
        "selector-id-pattern": null,
        // 忽略偽類選擇器 ::v-deep
        'selector-pseudo-element-no-unknown': [
            true,
            {
                ignorePseudoElements: ['v-deep']
            }
        ],
        // 禁止低優先級的選擇器出現在高優先級的選擇器之後。
        'no-descending-specificity': null,
        // 不驗證@未知的名字，為了兼容scss的函數
        'at-rule-no-unknown': null,
        // 禁止空註釋
        'comment-no-empty': true,
        // 禁止簡寫屬性的冗餘值
        'shorthand-property-no-redundant-values': true,
        // 禁止值的瀏覽器引擎前綴
        'value-no-vendor-prefix': true,
        // property-no-vendor-prefix
        'property-no-vendor-prefix': true,
        // 屬性的排序
        'order/properties-order': [
            'position',
            'top',
            'right',
            'bottom',
            'left',
            'z-index',
            'display',
            'justify-content',
            'align-items',
            'float',
            'clear',
            'overflow',
            'overflow-x',
            'overflow-y',
            'margin',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left',
            'border',
            'border-style',
            'border-width',
            'border-color',
            'border-top',
            'border-top-style',
            'border-top-width',
            'border-top-color',
            'border-right',
            'border-right-style',
            'border-right-width',
            'border-right-color',
            'border-bottom',
            'border-bottom-style',
            'border-bottom-width',
            'border-bottom-color',
            'border-left',
            'border-left-style',
            'border-left-width',
            'border-left-color',
            'border-radius',
            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',
            'width',
            'min-width',
            'max-width',
            'height',
            'min-height',
            'max-height',
            'font-size',
            'font-family',
            'font-weight',
            'text-align',
            'text-justify',
            'text-indent',
            'text-overflow',
            'text-decoration',
            'white-space',
            'color',
            'background',
            'background-position',
            'background-repeat',
            'background-size',
            'background-color',
            'background-clip',
            'opacity',
            'filter',
            'list-style',
            'outline',
            'visibility',
            'box-shadow',
            'text-shadow',
            'resize',
            'transition'
        ]
    }
}