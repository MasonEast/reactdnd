//环境获取并设置
const config={
    version:'v5_1',
    projectName:'phoenix',
    projectPathName:'phoenix/',
};

(()=>{
    // example: npm run server --entryName=tradeOrderHeader
    // process.env.npm_config_argv:
    //{
    // "remain":[],
    // "cooked":["run","server","--entryName","tradeOrderHeader"],
    // "original":["run","server","--entryName=tradeOrderHeader"]
    // }
    // 获取npm参数
    let args = JSON.parse(process.env.npm_config_argv)['original'];
    // 设置环境、版本、项目路径、项目名
    process.env.NODE_ENV = args[1] === ('build') ? 'production' : 'development';
    process.env.version=config.version;
    process.env.projectPathName=config.projectPathName;
    process.env.projectName=config.projectName;
    //传参检测 针对单独配置情况
    if(args[2]){
        let fileArgs = args[2].split("=");
        if(fileArgs[0] == '--entryName'){
            process.env.EntryName = fileArgs[1];
        }
        //是否支持clean,默认true,仅全局压缩支持可以配置clean
        if(fileArgs[0] == '--clean'){
            process.env.CLEAN = true;
        }
    }
    return false;
})();

module.exports = {
	pageBaseConfig:{
        //公共的chunks
        baseChunks:['style/css',process.env.projectName+'vendor',process.env.projectName+'manifest'],
        //公共工具库chunks
        commChunks:[],
        baseProxyContext:[
            "/admin",
            "/cloud-report/",
            "/custom/",
            "/info/shop/data",
            "/info/warehouse/data/",
        ]
    },
    //开发环境的配置
    development:{
        //公共资源编译输出路径
        path:"/assets",
        publicPath:"/assets",
        // imgOutputPath:"/images",
        imgPublicPath:"/assets/",

        // ../../webapp/WEB-INF/views
    },
    //生产环境的配置
    production:{
        //公共资源编译输出路径
        publicPath:"//guanyisoft-demo-static-r.oss-cn-hangzhou.aliyuncs.com/static/assets/",
        path:"../ecerp-static/assets",
        imgOutputPath:"/images",
        imgPublicPath:"/static/assets/images/",
    }
}