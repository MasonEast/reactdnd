import React, { Component } from 'react';

import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Provider } from 'react-redux'
import { Layout } from 'antd';

import store from '../../redux/store'


import './style.less'
import MenuComponents from '../../pages/MenuComponents'
import ContainerComponents from '../../pages/ContainerComponents'
import PropertyComponents from '../../pages/PropertyComponents'

export default class Report extends Component {
  render () {

    const { Header, Footer, Sider, Content } = Layout;
    return (
      <Provider store={store}>
        <Layout style={{ width: '100%', height: '100vh' }}>
          <Layout>
            <Header style={{ backgroundColor: '#363636', height: '8vh' }}>
              <h2>数据可视化报表</h2>
            </Header>
            <Content>
              <div id="contentLeft">
                <MenuComponents />
              </div>
              <div id="contentCenter">
                <DndProvider backend={HTML5Backend}>
                  <ContainerComponents />
                </DndProvider>
              </div>
              <div id="contentRight">
                <PropertyComponents />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Provider>

    )
  }

  componentDidUpdate () {
    console.log(111)
    console.log(store)
  }
}