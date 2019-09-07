let pages = {
  'report': {
    filePath: '/index/',
    name: 'report',
    inject: 'body',
    commWinChunks: [],
    proxyContext: [
      '/report/report/tradeTrendAnalysis/day/dayAnalysis'
    ]
  },

}
try {
  module.exports = pages
} catch (err) {
  console.log(err);
}