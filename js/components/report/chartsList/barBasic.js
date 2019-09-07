let option = {
  color: ['#63B8FF', '#9AFF9A', '#EEAD0E'],
  tooltip: {},
  legend: {
    left: 10,
    data: ['销量'],
    textStyle: {
      color: '#fff'
    }
  },
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    axisTick: {
      length: 2
    },
    //设置坐标轴字体颜色和宽度
    axisLine: {
      lineStyle: {
        color: '#fff',
        width: 2
      }
    }
  },
  yAxis: {
    axisLine: {
      lineStyle: {
        color: '#fff',
        width: 2
      }
    }
  },
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20],
    barWidth: 10,//柱图宽度
    barCategoryGap: '10%'
  }]
};

export default option