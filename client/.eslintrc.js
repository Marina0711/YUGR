module.exports = {
    env: {
        'browser': true,
        'es2021': true
    },
    extends: [
        'eslint:recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    plugins: [
        'react',
        'react-native',
        '@typescript-eslint',
        'simple-import-sort',
        // 'simple-import-sort/imports',
        'react-hooks'
    ],
    rules: {
        'indent': [
            'error',
            4,
            { 'SwitchCase': 1 }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-trailing-spaces': [
            'error',
            {
                'skipBlankLines': false,
                'ignoreComments': false
            }
        ],
        'max-len': [
            'error',
            120,
            2,
            {
                'ignoreUrls': true,
                'ignoreComments': false,
                'ignoreRegExpLiterals': false,
                'ignoreStrings': true,
                'ignoreTemplateLiterals': false
            }
        ],
        'no-multiple-empty-lines': [
            'error',
            {
                'max': 1,
                'maxBOF': 1
            }
        ],
        'react/jsx-sort-props': [
            'error',
            {
                'shorthandFirst': true,
                'noSortAlphabetically': true,
                'callbacksLast': true,
                'reservedFirst': true,
                'ignoreCase': true
            }
        ],
        'react/sort-prop-types': [
            'error',
            {
                'callbacksLast': true,
                'requiredFirst': true,
                'sortShapeProp': true
            }
        ],
        'import/prefer-default-export': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'simple-import-sort/imports': [
            'error',
            {
                'groups': [
                    // React
                    [
                        '^react'
                    ],
                    // Packages.
                    [
                        '^@?\\w'
                    ],
                    // Side effect imports.
                    [
                        '^\\u0000'
                    ],
                    // Api
                    [
                        '^(?!@).*api.*$'
                    ],
                    // Components
                    [
                        '^\\.(?!@).*components.*$'
                    ],
                    // Hooks
                    [
                        '^(?!@).*hooks.*$'
                    ],
                    // Relative imports, put parent imports last
                    [
                        '^\\./(?=.*/)(?!/?$)',
                        '^\\.\\.(?!/?$)',
                        '^\\.\\./?$'
                    ],
                    // Folders imports.
                    [
                        '.*partials.*',
                        '^\\.(?!/?$)',
                        '^\\./?$'
                    ],
                    // Style imports including styles of other packages
                    [
                        '.*css$'
                    ],
                ],
            }
        ],
        'no-console': 'off',
        'no-undef': 'off',
        'no-case-declarations': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'curly': ['error', 'all'],
        'operator-linebreak': ['error', 'before'],
        'implicit-arrow-linebreak': 'off',
        'react/jsx-closing-tag-location': 'error',
        'object-curly-spacing': [2, 'always'],
        'no-duplicate-imports': ['error'],
        'react/function-component-definition': [
            'error',
            {
                'namedComponents': 'arrow-function',
                'unnamedComponents': 'arrow-function'
            }
        ],
    }
};
