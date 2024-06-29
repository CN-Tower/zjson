module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['chore', 'feat', 'fix', 'test', 'docs', 'perf', 'style', 'merge', 'revert', 'release', 'refactor']
    ],
    'subject-case': [0]
  }
}
