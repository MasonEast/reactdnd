
const puppeteer = require('puppeteer');
const fs = require('fs');
const versionMap = {
  'miaotest': ['miaotest', 'admin', '@@Zm1026', 'https://demo.guanyierp.com/admin/function_menu/data/allMenuList'],
  'yuntest': ['yuntest', 'admin', 'U4~9^7zz', 'https://demo.guanyierp.com/admin/function_menu/data/allMenuList'],
  'bbb': ['bbb', 'admin', '1992@Sjc', 'https://demo.guanyierp.com/admin/function_menu/data/allMenuList'],
  'ccc': ['ccc', 'admin', '1992@Sjc', 'https://demo.guanyierp.com/admin/function_menu/data/allMenuList'],
  'ddd': ['ddd', 'admin', '1992@Sjc', 'https://demo.guanyierp.com/admin/function_menu/data/allMenuList'],
  'sss': ['sss', 'admin', '1992@Sjc', 'https://demo.guanyierp.com/admin/function_menu/data/allMenuList'],
  'aaaetest': ['aaaetest@126.com', 'GYtest@2015', 'https://demo.guanyierp.com/admin/function_menu/data/allMenuList'],
}


const nodeArg = (process.argv.splice(2) && process.argv.splice(2).length) || ['yuntest'];
puppeteer.launch({ headless: true, nodeArg, versionMap }).then(async browser => {
  let cookieUrl = "";
  let attrs = versionMap[nodeArg[0]];
  if (attrs.length === 3) {
    cookieUrl = attrs[2];
  } else {
    cookieUrl = attrs[3];
  }
  const page = await browser.newPage();
  await page.goto('https://demo.guanyierp.com/index');
  await page.evaluate((nodeArg, versionMap) => {
    let attrs = versionMap[nodeArg[0]];
    if (attrs && attrs.length === 3) {
      document.querySelector('#email').value = attrs[0];
      document.querySelector('#pwd2').value = attrs[1];
      document.querySelector('#emailLoginBtn').click();
    } else {
      document.querySelector('#tenantCode').value = attrs[0];
      document.querySelector('#code').value = attrs[1];
      document.querySelector('#pwd').value = attrs[2];
      document.querySelector('#loginBtn').click();
    }
  }, nodeArg, versionMap);

  const cookies = await page.cookies(cookieUrl);
  // let cookie = await page.evaluate(() => document.cookie) // 由于httpOnly无法获取完整cookie;
  const cookie = Array.from(cookies, item => `${item.name}=${item.value}`).join(';');
  fs.writeFile(__dirname + '/webpackConfig/cookie.js', `module.exports = \{cookie:'${cookie}'\}`, 'utf8', (err) => {
    if (err) throw err;
    console.log(`Get Version[${nodeArg[0]}] cookie success!`);
    setTimeout(() => { process.exit(); }, 1000)

  });
});

