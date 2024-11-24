import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.jest,
            },
        },
    },
    pluginJs.configs.recommended,
]
