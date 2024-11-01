import globals, { node } from 'globals'
import pluginJs from '@eslint/js'

export default [
    { languageOptions: { globals: globals.node } },
    pluginJs.configs.recommended,
    {
        env: {
            es2021: true,
            node: true,
            jest: true,
        },
    },
]
