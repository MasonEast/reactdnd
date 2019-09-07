import React from 'react'
import { useDrag } from 'react-dnd'
const style = {
  position: 'absolute',
  // border: '1px dashed gray',
  // padding: '0.5rem 1rem',
  cursor: 'move',

}
const Box = (props) => {
  console.log(props)
  const { id, left, top, width, height, children, setChartsOption, chartsOption } = props
  const [{ isDragging }, drag] = useDrag({
    item: { id, left, top, type: 'box' },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  /**
   * 提供拖拽源,也是生成图表的盒子
   */
  return (
    <div id={id} ref={drag} style={{ ...style, left, top, width, height }} onClick={(e) => {
      console.log(children)
      setChartsOption(id)
      // e.persist()
      // e.target.setAttribute('id', 'svg' + id)   //获取当前操作的图表，并设置id，方便其他组件操作目标svg， 设置viewBox，调整svg的大小
      // // e.target.setAttribute('viewBox', `0 0 ${width} ${height}`)
      // e.target.setAttribute('preserveAspectRatio', 'none')  //该属性可以让svg尽量铺满父元素
      // document.getElementById(id).style = 'border: 1px dashed gray'

    }}>
      {/* {children} */}
    </div>
  )
}
export default Box
