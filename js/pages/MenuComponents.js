


//容器组件
import { connect } from 'react-redux'
import MenuComponents from '../components/report/MenuComponents'
import { addBar, addMyChart, addLine, addPie, update } from '../redux/actions'

export default connect(state => ({
  barBasic: state.barBasic,
  lineBasic: state.lineBasic,
  pieBasic: state.pieBasic,
}), {
    addBar,
    addLine,
    addPie,
    update,
    addMyChart
  })(MenuComponents)



