
const path = require('path');
const { generateTheme } = require('antd-theme-generator');

const options = {
  antDir: path.join(__dirname, './node_modules/antd'),

  stylesDir: path.join(__dirname, './static/less/modifiableThemeColors'),

  // 默认是使用antd的默认主题样式 themes/default.less
  varFile: path.join(__dirname, './static/less/modifiableThemeColors/vars.less'),

  mainLessFile: path.join(__dirname, './static/less/modifiableThemeColors/main.less'),

  // 按需配置 希望在线可变更的主题色变量
  themeVariables: [
    '@primary-color',
    '@text-color'
  ],

  // 编译输出的主题less文件
  outputFilePath: path.join(__dirname, './static/less/modifiableThemeColors/themeColor.less') // if provided, file will be created with generated less/styles
}

generateTheme(options).then(less => {
  console.log('Theme generated successfully');
})
  .catch(error => {
    console.log('Error', error);
  })