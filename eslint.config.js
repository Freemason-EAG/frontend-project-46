// eslint.config.js
import globals from 'globals'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

export default [
  js.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      ...stylistic.configs.recommended.rules,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest, // ← добавил Jest globals!
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  {
    ignores: ['dist/', 'bin/'],
  },
]
