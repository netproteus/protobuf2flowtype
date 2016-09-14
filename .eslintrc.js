module.exports = {
    parser: "babel-eslint",
    parserOptions: {
        sourceType: 'module'
    },
    plugins: [
        'flowtype'
    ],
    env: {
        node: true,
        es6: true,
        browser: true
    },
    rules: {
        'brace-style': ['error', '1tbs'],
        'camelcase': ['error', {'properties': 'never'}],
        'comma-dangle': ['error', 'never'],
        'comma-spacing': 'error',
        'comma-style': ['error', 'last'],
        'consistent-return': 'error',
        'curly': 'error',
        'eol-last': 'error',
        'func-style': ['error', 'declaration'],
        'indent': ['error', 4, {'SwitchCase': 1}],
        'key-spacing': 'error',
        'keyword-spacing': 'error',
        'max-depth': ['error', 5],
        'max-nested-callbacks': 'error',
        'no-func-assign': 'error',
        'no-inline-comments': 'error',
        'no-inner-declarations': 'error',
        'no-lonely-if': 'error',
        'no-multi-spaces': 'error',
        'no-new': 'error',
        'no-shadow': 'error',
        'no-spaced-func': 'error',
        'no-undef': 'error',
        'no-unused-vars': 'error',
        'no-use-before-define': ['error', 'nofunc'],
        'no-var': 'error',
        'one-var': ['error', 'never'],
        'prefer-const': 'error',
        'quotes': ['error', 'single', 'avoid-escape'],
        'semi': ['error', 'always'],
        'space-before-function-paren': ['error', {'anonymous': 'never', 'named': 'never'}],
        'space-infix-ops': 'error',
        'spaced-comment': ['error', 'always'],
        'strict': ['error', 'never'],
        'flowtype/define-flow-type': 1,
        'flowtype/space-before-type-colon': ['error', 'never']
    },
    settings: {
        flowtype: {
            onlyFilesWithFlowAnnotation: true
        }
    }
};
