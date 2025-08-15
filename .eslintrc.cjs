module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
  ],
  plugins: [
      '@typescript-eslint',
      'react-hooks',
      'react-refresh',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['dist'], // Аналог globalIgnores(['dist'])
  rules: {
    // Правила с поддержкой автоисправления для --fix
    'no-unused-vars': 'off', // Отключаем стандартное правило
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Для TypeScript
    'semi': ['error', 'always'], // Требовать точку с запятой
    'quotes': ['error', 'single', { allowTemplateLiterals: true }], // Одинарные кавычки
    'indent': ['error', 2], // Отступы 2 пробела
    'comma-dangle': ['error', 'always-multiline'], // Висячие запятые
    'object-curly-spacing': ['error', 'always'], // Пробелы внутри объектов
    'array-bracket-spacing': ['error', 'never'], // Пробелы в массивах
    'no-trailing-spaces': 'error', // Удаление пробелов в конце строк
    'eol-last': ['error', 'always'], // Пустая строка в конце файла
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }], // Правило react-refresh
  },
};
