/* eslint-disable */
const host = 'http://localhost:9193/assets/template';
let arr = [];
// pages数据格式化
for (let item in pages) {
    arr.unshift({
        value: item,
        url: `${host}${pages[item].filePath}${item}.html`
    });
}