# 目录结构
|- index
      |- report                             
        |- report                        
          |- customizeReport              //App
          |- report                       //入口文件
|- pages                           // 容器组件，主要用来连接redux和UI组件
      |- ...
|- components                               // UI组件
      |- report                // 报表相关UI组件
          |- chartsList                     // 主要是各种图表的初始样式
          |- ajax                     // 封装了axios的get和post请求
          |- Box                      //拖拽源，也是盛放各种图表的容器
          |- ContainerComponents      //可拖拽区域，主要用来生成图板的组件
          |- MenuComponents           //左侧菜单组件，点击生成对应的初始化图表
          |- PropertyComponents      //右侧属性设置组件，可操作图表的一些样式以及设置图表展示数据源
|- redux
    |- chartsReducer                     // 主要是对应每种图表的reducer和state
    |- action-types                     // action的常量
    |- action                           

## 项目思路
主要是状态树的设计：
1. 生成图表， 需要初始化图表，并保存对应的init出来的echarts
2. 选中图表， 选中之后可以更新属性，需要获取选中图表的id，根据id找到对应初始化出来的图表和echarts
3. 拖拽图表， 拖拽图表时需要更新图表容器的left和top，修改对应的初始化图表

## 组件说明
ContainerComponents： 主要用来生成图板，支持拖拽
PropertyComponents： 属性配置组件
MenuComponents： 图表组件菜单


### 项目中遇到的问题
1. react-dnd版本变更，学习最新API和使用方法
2. react-dnd最新版主要采用hooks方式来关联dom，使其成为拖拽源和可拖拽区，导致和react的hooks冲突，解决方法：使用函数组件，不要在拖拽源和可拖拽区使用钩子函数和生命周期函数
3. 生成dom，将图表渲染进dom中，在这里的问题主要是一定要先生成dom，才能渲染图表，想到了componentDidUpdate，但是react-dnd新版api无法使用生命周期函数，解决方法：在别的地方初始化图表，然后通过redux通知可拖拽区生成对应的dom，并渲染图表
4. react生成dom问题，react是状态驱动视图，根据状态改变生成对应的拖拽源。
5. 属性配置改变svg的大小问题，要想实现实时不刷新变化，必须得设置svg的viewBox，为了让它和父元素保持同步，不会变形，要拿到选中的图表并同时修改两者的宽高。
6. 使用redux进行开发之前一定要想清楚状态树！！！
7. 自己放大缩小图表的方法出现了问题，寻找新的解决方法，发现了echarts自带了resize方法，但是为了拿到mychart，又多创建了一个reducer，用来保存mychart。
8. 开始设计初始化图表和echarts的state为了方便都使用的是数组，后来都改成了对象，因为对象根据键名去查找对应的图表和echarts更加容易，而数组却需要根据id去遍历查找，这样效率更低
9. 