import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintPrettier from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';

export default tsEslint.config(
  {
    ignores: [
      '.eslintrc.cjs',
      '*.config.cjs',
      '*.config.mjs',
      '*.d.ts',
      'public',
    ],
  },
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ...react.configs.flat.recommended,
    ...react.configs.flat['jsx-runtime'],
  },
  {
    plugins: {
      'react-hooks': eslintReactHooks,
    },
    // @ts-ignore
    rules: eslintReactHooks.configs.recommended.rules,
  },
  eslintPrettier,
);
