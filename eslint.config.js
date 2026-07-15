import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintImport from 'eslint-plugin-import';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintA11y from 'eslint-plugin-jsx-a11y';
import eslintPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintUnusedImports from 'eslint-plugin-unused-imports';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {ignores: ['public/**/*']},
  {files: ['**/*.{ts,tsx,js,jsx}']},
  {
    languageOptions: {
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.json'],
      },
    },
  },
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: eslintImport,
      react: eslintReact,
      'react-hooks': eslintReactHooks,
      'jsx-a11y': eslintA11y,
      prettier: eslintPrettier,
      'unused-imports': eslintUnusedImports,
    },
  },
  {
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-vars': 'error',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': 'off',
      'jsx-a11y/anchor-is-valid': 0,
      'react/prop-types': 0,
      'react/no-unescaped-entities': 0,
      'react/jsx-no-target-blank': 0,
      'no-mixed-spaces-and-tabs': 0,
      'no-cond-assign': 0,
      'react/jsx-key': 0,
      'react/display-name': 0,
      'no-lone-blocks': 0,
      'jsx-a11y/accessible-emoji': 0,
      'prettier/prettier': 0,
      'import/no-extraneous-dependencies': 0,
      'no-case-declarations': 0,
      '@typescript-eslint/default-param-last': 0,
      '@typescript-eslint/no-shadow': 0,
      'jsx-a11y/media-has-caption': 0,
      'jsx-a11y/click-events-have-key-events': 0,
      'jsx-a11y/no-static-element-interactions': 0,
      'jsx-a11y/no-noninteractive-element-interactions': 0,
      'no-unused-expressions': 0,
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-expressions': [
        0,
        {
          allowTernary: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
      'no-use-before-define': 0,
      '@typescript-eslint/no-use-before-define': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'snake_case', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
      ],
      '@typescript-eslint/ban-types': 0,
      '@typescript-eslint/no-explicit-any': 'off',
      'jsx-a11y/no-autofocus': 0,
      'import/no-unresolved': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      'prefer-destructuring': [
        'error',
        {
          object: true,
          array: false,
        },
      ],
    },
  },
];
