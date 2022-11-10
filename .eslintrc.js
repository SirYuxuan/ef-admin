module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/essential'],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'indent': ['error', 2, { SwitchCase: 1 }],
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'vue/no-unused-components': 'off',
    'semi': [2, 'never'],
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
    'quotes': [2, 'single'],
    'no-var': 2,
    'vue/multi-word-component-names': 0,
    'no-trailing-spaces': 0,
    'no-multiple-empty-lines': 0,
    'block-spacing': [2, 'always'],
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],
    'comma-spacing': [2, {
      'before': false,
      'after': true
    }],
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': [2, {
      'before': true,
      'after': true
    }],
    'object-curly-spacing': ['error', 'always'],
  }
}
