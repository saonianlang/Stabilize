module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: ['plugin:vue/essential', 'plugin:vue/strongly-recommended', 'eslint:recommended', '@vue/prettier'],
    plugins: ['html'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/name-property-casing': ['error', 'kebab-case'],
        'vue/component-name-in-template-casing': ['error', 'kebab-case'],
        'vue/no-use-v-if-with-v-for': ['error', {allowUsingIterationVar: true}],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-const-assign': 2,
        'prefer-const': 2,
        'prettier/prettier': [
            2,
            {
                printWidth: 150,
                tabWidth: 4,
                singleQuote: true,
                bracketSpacing: false,
                htmlWhitespaceSensitivity: 'ignore'
            }
        ],
        'no-undef': 2
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true
            }
        }
    ]
};
