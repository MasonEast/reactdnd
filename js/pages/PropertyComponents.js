


//容器组件
import { connect } from 'react-redux'
import PropertyComponents from '../components/report/PropertyComponents'
import { add, update, setChartsOption, updateOption } from '../redux/actions'

export default connect(state => ({
  chartsOption: state.chartsOption,
  barBasic: state.barBasic,
  myChart: state.myChart
}), { add, update, setChartsOption, updateOption })(PropertyComponents)



