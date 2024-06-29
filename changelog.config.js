module.exports = {
  disableEmoji: false,
  format: '{type}{scope}: {emoji}{subject}',
  list: ['chore', 'feat', 'fix', 'test', 'docs', 'perf', 'style', 'merge', 'revert', 'release', 'refactor'],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject'],
  scopes: [],
  types: {
    chore: {
      description: '项目构建',
      emoji: '📦',
      value: 'chore'
    },
    feat: {
      description: '新增功能',
      emoji: '🎸',
      value: 'feat'
    },
    fix: {
      description: '修复代码',
      emoji: '🐛',
      value: 'fix'
    },
    test: {
      description: '增加测试',
      emoji: '🔎',
      value: 'test'
    },
    docs: {
      description: '更新文档',
      emoji: '📖',
      value: 'docs'
    },
    perf: {
      description: '优化代码',
      emoji: '⚡️',
      value: 'perf'
    },
    style: {
      description: '样式更新',
      emoji: '🎉',
      value: 'style'
    },
    merge: {
      description: '合并代码',
      emoji: '👥',
      value: 'merge'
    },
    revert: {
      description: '回退提交',
      emoji: '📤',
      value: 'revert'
    },
    release: {
      description: '版本发布',
      emoji: '🏹',
      value: 'release'
    },
    refactor: {
      description: '重构代码',
      emoji: '💡',
      value: 'refactor'
    }
  }
}
