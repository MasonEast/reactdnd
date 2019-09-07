import React, { Component } from 'react';

import { Menu, Icon, Input, InputNumber, Form, Button } from 'antd';

import './PropertyComponents.less'


export default class PropertyComponents extends React.Component {
  // constructor(props){
  //   super(props)

  // }
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  heightChange (v) {
    let { chartsOption, barBasic, myChart } = this.props
    console.log(myChart, barBasic)
    let id = chartsOption.item
    // console.log(document.getElementById('svg' + chartsOption.item))
    // let svgWidth = barBasic[0].width
    // let svgheight = barBasic[0].initHeight - v
    // document.getElementById('svg' + chartsOption.item).setAttribute('viewBox', `0 0 ${svgWidth} ${svgheight}`)
    this.props.updateOption({ id, width: barBasic[id].width, height: barBasic[id].initHeight + v })
    myChart[id].resize()

  }
  widthChange (v) {
    let { chartsOption, barBasic, myChart } = this.props
    // console.log(barBasic)
    // let svgWidth = barBasic[0].initWidth - v    //宽高变化不统一的问题
    // let svgheight = barBasic[0].height
    // document.getElementById('svg' + chartsOption.item).setAttribute('viewBox', `0 0 ${svgWidth} ${svgheight}`)
    this.props.updateOption({ id: chartsOption.item, width: barBasic[0].initWidth + v, height: barBasic[0].height })
    myChart[chartsOption.item].resize()

  }
  render () {
    const { setChartsOption, chartsOption } = this.props
    return (
      <div>
        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          <Menu.Item key="mail">
            <Icon type="mail" />
            图配置
        </Menu.Item>
          <Menu.Item key="app" disabled>
            <Icon type="appstore" />
            源配置
        </Menu.Item>
        </Menu>
        <div>
          <h2>{chartsOption.item ? chartsOption.item : '图表属性配置'}</h2>
          <ul id="propertyUl">
            <li>
              <span>图表尺寸</span>
              <InputNumber size="small" step={10} onChange={this.widthChange.bind(this)} defaultValue={0} />
              <InputNumber size="small" step={10} onChange={this.heightChange.bind(this)} defaultValue={0} />
            </li>
            <li>
              <span>图表位置</span>
              <InputNumber size="small" step={10} defaultValue={0} />
              <InputNumber size="small" step={10} defaultValue={0} />
            </li>
            <li>
              <span>透明度</span>
            </li>
            <li>
              <span>标题</span>
            </li>
            <li>
              <span>x轴</span>
            </li>
            <li>
              <span>y轴</span>
            </li>
            <li>
              <span>图表尺寸</span>
            </li>
            <li>
              <span>图表尺寸</span>
            </li>

          </ul>

        </div>
      </div>
    );
  }
}

