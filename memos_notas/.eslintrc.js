module.exports = {
    "env": {
        "browser" : true,
        "es2021"  : true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser"        : "@typescript-eslint/parser",
    "parserOptions" : {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion" : "latest",
        "sourceType"  : "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        '@typescript-eslint/no-shadow' : ['warn'],
        'indent'                       : ['warn', 4, { 'offsetTernaryExpressions': true }],
        'key-spacing'                  : [
            'warn',
            {
                align: {
                    afterColon  : true,
                    beforeColon : true,
                    on          : 'colon',
                },
            },
        ],
        'no-prototype-builtins'         : 0,
        'no-shadow'                     : 'off',
        'no-undef'                      : 'off',
        'prettier/prettier'             : 0,
        'react-hooks/exhaustive-deps'   : 0,
        'react-native/no-inline-styles' : 0,
        'react/jsx-indent'              : ['warn', 4],
        'react/jsx-indent-props'        : ['warn', 4],
        "react/react-in-jsx-scope"      : 0,
        'sort-keys'                     : 'warn',
    }
}
