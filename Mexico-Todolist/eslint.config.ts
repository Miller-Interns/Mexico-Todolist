import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import ts from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'

export default defineConfig([
  {
    files: ['**/*.{js,ts,vue}'],

    languageOptions: {
      parser: vueParser,

      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: ts.parser,
      },

      globals: globals.browser,
    },

    plugins: {
      vue,
      '@typescript-eslint': ts.plugin,
      prettier,
    },

    rules: {
      'prettier/prettier': 'error',
    },

    ...vue.configs['flat/recommended'],
  },

  ...ts.configs.recommended,

  js.configs.recommended,
])
