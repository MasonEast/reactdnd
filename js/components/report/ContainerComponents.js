import React, { Component, useState } from 'react'
import { useDrop as dropDND, useDrag as dragDND } from 'react-dnd'

import Box from '../../pages/Box'
import './ContainerComponents.less'

const Container = (props) => {
  let { barBasic, lineBasic, pieBasic } = props
  const [, drop] = dropDND({
    accept: 'box',
    drop (item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset()
      const left = Math.round(item.left + delta.x)
      const top = Math.round(item.top + delta.y)
      item.left = left;
      item.top = top;
      props.update(item)
      return undefined
    },
  })
  /**
   *该组件主要是提供可拖拽区域，引入的box组件是提供拖拽源，便于后面将图表在该dom上生成
   *   
   * */
  return (
    <div ref={drop} id='dropContainer'>
      {Object.keys(barBasic).map(v => {
        return (
          <Box
            key={barBasic[v].id}
            id={barBasic[v].id}
            left={barBasic[v].left}
            top={barBasic[v].top}
            width={barBasic[v].width}
            height={barBasic[v].height}
          >
            {/* {v.id} */}
          </Box>
        )
      })}
      {lineBasic.map(v => {
        return (
          <Box
            key={v.id}
            id={v.id}
            left={v.left}
            top={v.top}
            width={v.width}
            height={v.height}
          >
            {/* {v.id} */}
          </Box>
        )
      })}
      {pieBasic.map(v => {
        return (
          <Box
            key={v.id}
            id={v.id}
            left={v.left}
            top={v.top}
          >
            {/* {v.id} */}
          </Box>
        )
      })}
    </div>
  )
}

export default Container