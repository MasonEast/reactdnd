
//容器组件
import { connect } from 'react-redux'
import Box from '../components/report/Box'
import { setChartsOption, update } from '../redux/actions'

export default connect(state => ({
  barBasic: state.barBasic,
  lineBasic: state.lineBasic,
  pieBasic: state.pieBasic,
  chartsOption: state.chartsOption
}), {
    setChartsOption,
    update
  })(Box)


