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
