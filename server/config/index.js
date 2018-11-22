const dburls = {
  0: 'mongodb://127.0.0.1/zjson',
  1: 'mongodb://10.40.154.118:26001/zjson'
}

module.exports = {
  port: 3300,
  dburl: dburls[1],
  sharedJsonExp: 2 * 24 * 60 * 60 * 1000
}
