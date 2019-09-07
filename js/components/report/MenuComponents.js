import React, { Component } from 'react';
import { Button, Menu, Icon } from 'antd'
import echarts from 'echarts'

import './MenuComponents.less'
import barBasicOption from './chartsList/barBasic'
import LineBasicOption from './chartsList/LineBasic'
import pieBasicOption from './chartsList/pieBasic'


export default class MenuComponents extends Component {

  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

  state = {
    openKeys: ['sub1'],
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  initBar () {
    this.props.addBar()
  }
  initLine () {
    this.props.addLine()
  }
  initPie () {
    this.props.addPie()
  }
  render () {
    const { SubMenu } = Menu;

    return (
      <div>

        <Menu
          mode="inline"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          id="leftMenu"
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>柱状图</span>
              </span>
            }
          >
            <Menu.Item onClick={this.initBar.bind(this)} key="1">基本柱图</Menu.Item>
            <Menu.Item key="2">水平柱图</Menu.Item>
            <Menu.Item key="3">弧形柱图</Menu.Item>
            <Menu.Item key="4">正负柱图</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="appstore" />
                <span>折线图</span>
              </span>
            }
          >
            <Menu.Item onClick={this.initLine.bind(this)} key="5">基本折线图</Menu.Item>
            <Menu.Item key="6">双轴折线图</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="setting" />
                <span>饼图</span>
              </span>
            }
          >
            <Menu.Item onClick={this.initPie.bind(this)} key="9">基本饼图</Menu.Item>
            <Menu.Item key="10">指标占比饼图</Menu.Item>
            <Menu.Item key="11">目标占比饼图</Menu.Item>
            <Menu.Item key="12"> 多维度饼图</Menu.Item>
          </SubMenu>
        </Menu>

        {Object.keys(this.props.barBasic).map(v => {   //主要用来触发componentDidUpdate生命周期函数
          return <span style={{ display: 'none' }} key={v}>{v.id}</span>
        })}
      </div>
    )
  }
  componentDidUpdate () {
    const { addBar } = this.props
    console.log('MenuComponents')
    let { barBasic, lineBasic, pieBasic, addMyChart } = this.props
    Object.keys(barBasic).forEach(v => {     //基本柱图
      var myChart = echarts.init(document.getElementById(v), null, { renderer: 'svg' });
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(barBasicOption);
      addMyChart({ id: v, chart: myChart })
    })
    lineBasic.forEach(v => {    //基本折线图
      var myChart = echarts.init(document.getElementById(v.id), null, { renderer: 'svg' });
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(LineBasicOption);
      addMyChart({ id: v.id, chart: myChart })

    })
    pieBasic.forEach(v => {    //基本饼图
      var myChart = echarts.init(document.getElementById(v.id), null, { renderer: 'svg' });
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(pieBasicOption);
    })
  }
}


