const pages = require('./pageConstant')
const path = require('path')
const baseConfig = require('./baseConfig')
const jsPath = path.resolve(__dirname, '../js')
const webappViewsPath = path.resolve(__dirname, '../build/WEB-INF/views')
const views = path.resolve(__dirname, '../template/')


let filePathPrefix = 'template'
let fileExt = '.html'
if (process.env.NODE_ENV === 'production') {
    filePathPrefix = webappViewsPath
    fileExt = '.ftl'
}
createPageConfig = obj => {
    let enyObj = ''
    if (process.env.EntryName) {
        for (let key in obj) {
            if (key == process.env.EntryName) {
                enyObj = {}
                enyObj[key] = obj[key]
                break
            }
        }
    }
    let tempObj = {}
    for (let objKey in enyObj || obj) {
        let objItem = obj[objKey]
        let name = objItem['name']
        let path = objItem['filePath']
        let commChunks =
            objItem['hasDefaultCommChunks'] === false
                ? []
                : baseConfig.pageBaseConfig.commChunks
        let baseChunks =
            objItem['hasBaseChunks'] === false
                ? []
                : baseConfig.pageBaseConfig.baseChunks
        tempObj[process.env.projectPathName + objKey] = {
            /*
             * @config info
             * entryPath：入口配置
             * fileName:文件输出路径及名称
             * template:模板路径
             * hasDefaultCommChunks: true,//是否有默认公用chunks,默认为true
             * hasBaseChunks: true,//是否有basechunks,默认为true
             * initOptions:初始化htmlWebpackPlugin的配置
             * selfChunk: true 默认为true 本身chunk,
             * proxyContext:[]代理地址
             *
             * @example
             * entryPath: jsPath + "/tc/delivery/tradeOrderHeader/tradeOrderHeader.js",
             * filename: "tc/delivery/tradeOrderHeader.html",
             * commWinChunks:['gridFilter','batchSearchWindow','selectStockPrtWindow'],
             * template: views + "/tc/delivery/tradeOrderHeader.html",
             * chuncks: ["tradeOrderHeader"]
             * proxyContext:[]
             * */
            entryPath: jsPath + path + name + '/' + name + '.js',
            filename: filePathPrefix + path + name + fileExt,
            template: views + path + name + '/' + name + fileExt,
            cache: true,
            inject: objItem['inject'] || 'head',
            chunks: [
                //所有chunk
                //自身chunk
                ...(objItem['selfChunk'] === false
                    ? []
                    : [process.env.projectPathName + objKey]),
                //公共window chunk
                ...Array.from(objItem['commWinChunks'] || [], val => 'common/' + val),
                //基础公共chunk
                ...commChunks,
                //基础chunk
                ...baseChunks
            ],
            commWinChunks: objItem['commWinChunks'],
            proxyContext: objItem['proxyContext']
        }
    }
    return tempObj
}

module.exports = createPageConfig(pages)
