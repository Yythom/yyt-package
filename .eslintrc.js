const basePlugins = ['react', 'react-hooks']

const baseParserOptions = {
    ecmaVersion: 10,
    ecmaFeatures: {
        jsx: true,
    },
}

const baseEnv = {
    browser: true,
    node: true,
    es6: true,
}

const baseRules = {
    'react/react-in-jsx-scope': 0,
    'react/react-in-tsx-scope': 0,
    'guard-for-in': 'off',
    'no-await-in-loop': 'warn',
    'no-tabs': 'off',
    'no-empty': 'off',
    'prefer-destructuring': 'off',
    'jsx-a11y/html-has-lang': 'off',
    'no-unused-vars': 'off',
    'react/prop-types': 'off',
    indent: ['error', 4, { SwitchCase: 1 }],
    'react/jsx-indent': ['error', 4],
    'react/jsx-indent-props': ['error', 4],
    semi: ['error', 'never'],
    'react/jsx-filename-extension': 'off',
    'no-console': 'off',
    'max-len': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-underscore-dangle': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/no-danger': 'off',
    eqeqeq: 'off',
    'no-restricted-globals': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-restricted-syntax': 'off',
    'no-param-reassign': 'off',
    'no-shadow': 'off',
    'jsx-a11y/alt-text': 'off',
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'arrow-body-style': 'off',
    'no-return-assign': 'off',
    'no-multi-assign': 'off',
    'no-unused-expressions': 'off',
    'react/button-has-type': 'off',
    'react/destructuring-assignment': 'off',
    'import/no-unresolved': 'off',
    'consistent-return': 'off',
    'react/no-array-index-key': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'no-script-url': 'off',
    'prefer-template': 'off',
    'no-bitwise': 'off',
    'operator-linebreak': ['error', 'after'],
    'func-names': 'off',
    'no-use-before-define': 'off',
    'react/jsx-no-target-blank': 'off',
    'no-plusplus': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-useless-escape': 'off',
    'react/jsx-wrap-multilines': 'off',
    'import/prefer-default-export': 'off',
    'no-return-await': 'off',
    'no-nested-ternary': 'off',
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
    'no-useless-constructor': 'off',
    'no-mixed-operators': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'import/no-import-module-exports': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'react/function-component-definition': 'off',
    'react/require-default-props': 'off',
    'react/no-unused-prop-types': 'off',
}

module.exports = {
    root: true,
    parser: '@babel/eslint-parser',
    plugins: [...basePlugins],
    env: { ...baseEnv },
    parserOptions: {
        ...baseParserOptions,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'airbnb',
        'airbnb/hooks',
    ],
    rules: {
        ...baseRules,
    },

    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            plugins: [...basePlugins, '@typescript-eslint/eslint-plugin'],
            parserOptions: {
                ...baseParserOptions,
                project: ['tsconfig.json'],
            },
            extends: [
                'eslint:recommended',
                'plugin:react/recommended',
                'plugin:react-hooks/recommended',
                'airbnb',
                'airbnb/hooks',
                'airbnb-typescript',
            ],
            rules: {
                ...baseRules,
                '@typescript-eslint/semi': ['error', 'never'],
                '@typescript-eslint/no-unused-vars': 'off',
                '@typescript-eslint/indent': 'off',
                '@typescript-eslint/ban-ts-comment': 'off',
                '@typescript-eslint/no-shadow': 'off',
                '@typescript-eslint/no-use-before-define': 'off',
                '@typescript-eslint/type-annotation-spacing': 'error',
                '@typescript-eslint/no-unused-expressions': 'off',
            },
        },
    ],
}
