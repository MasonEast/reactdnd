const baseConfig = require('./baseConfig');
const pageConfig = require('./pageConfig');
const htmlWebpackPlugins = require('html-webpack-plugin');
const projectName= process.env.projectName || '';
//处理
handlehtmlWebpack = (obj) => {
    /*处理入口依赖及模板配置*/
    let tempObj = {
        filename: obj['filename'],
        template: obj['template'],
        cache: true,
        minify:false,
        chunks: obj['chunks'],
        inject: obj['inject']||'head',
        // excludeChunks:['style/stylePlus']
    };
    Object.assign(tempObj,obj.initOptions||{});
    return tempObj;
};

createCommChunks =(fileName)=>{
    let tempObj = {
        chunks: 'initial',
        test:new RegExp(fileName+".js"),
        minChunks: 1,
        name:"common/"+fileName,
        enforce: true,
    };
    let obj = {};
    obj["common/"+fileName] = tempObj;
    return obj
};

createBaseChunks=()=>{

}

module.exports ={
        generateEntrise: () => {
            /*入口文件配置生成 entry
            * 入口依赖及模板配置htmlWebpackPlugins
            * */
            let entries = {};
            let htmlPlugins = [];
            let splitTempChunks= [];
            let proxyContext= [];
            let splitChunks= {};
            Object.keys(pageConfig).forEach((key) => {
                let obj = pageConfig[key];
                //入口
                entries[key] = obj['entryPath'];
                //htmlPlugin
                htmlPlugins.push(new htmlWebpackPlugins(handlehtmlWebpack(obj)));
                //splitChunk
                splitTempChunks =[...splitTempChunks,...(obj['commWinChunks'] || [])];
                //proxyContents代理地址的集合
                proxyContext = [...proxyContext,...(obj['proxyContext'] || [])]
            });
            for(let item of splitTempChunks) {
                Object.assign(splitChunks,createCommChunks(item)) ;
            }
            return {
                entries,
                vendor:(()=>{
                    let temp={};
                    temp[projectName +"vendor"] = {
                        chunks: 'all',
                        test: /(node_modules)|(lib)/,
                        name: projectName + "vendor",
                        minChunks: 1,
                        enforce: true,
                        priority: 12,
                    }
                    return temp
                })(),
                htmlPlugins: htmlPlugins,
                paths: baseConfig[process.env.NODE_ENV],
                splitExtraChunks:splitChunks,
                proxyContext:[...baseConfig.pageBaseConfig.baseProxyContext,...proxyContext]
            };
    }
}
