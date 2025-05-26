import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: [
      // "eslint:recommended",
      'next/core-web-vitals',
      'next/typescript',
      'next',
      'prettier'
    ],
    "rules": {
      // "@next/next/no-img-element": "off",
      "react/no-unescaped-entities": 0,
      'react/no-unescaped-entities': 'off',
      "no-unused-vars": "off",
      '@next/next/no-page-custom-font': 'off',
      "@typescript-eslint/no-unused-vars": "off",




    }
  })
]

export default eslintConfig