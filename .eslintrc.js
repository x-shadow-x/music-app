module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
    rules: {
        'indent': [
            'error',
            4
        ],
        'max-len': ['error', 120],
        'prefer-destructuring': ['error', {
            'VariableDeclarator': {
                object: false
            }}
        ],
        'no-plusplus': [
            'error', {
                'allowForLoopAfterthoughts': true
            }
        ],
        'no-unused-expressions': ['error', {
            'allowTernary': true,
            'allowShortCircuit': true
        }],
        "no-underscore-dangle": ["off", "always"],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'linebreak-style': 'off',
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
};
