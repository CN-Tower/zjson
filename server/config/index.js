const dbUrls = {
  0: 'mongodb://127.0.0.1/zjson',
  1: 'mongodb://user:pass@dbhost/zjson',
  2: 'mongodb://10.40.154.118/zjson',
}

module.exports = {
  port: 3000,
  dbUrl: dbUrls[ 0 ],
  sharedJsonExp: 2 * 24 * 60 * 60 * 1000
}
