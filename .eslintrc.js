module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'standard',
    ],
    rules: {
        'indent': [
            'error', 4,
            {
                'SwitchCase': 1,
            },
        ],
        'comma-dangle': [
            'error',
            'always-multiline',
        ],
        'quote-props': 0,
        'space-before-function-paren': [
            'error',
            {
                'anonymous': 'never',
                'named': 'never',
                'asyncArrow': 'never',
            },
        ],
        'semi': [
            'error',
            'always',
        ],
        'new-cap': 0,
    },
};
