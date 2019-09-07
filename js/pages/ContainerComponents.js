
//容器组件
import { connect } from 'react-redux'
import ContainerComponents from '../components/report/ContainerComponents'
import { add, update } from '../redux/actions'

export default connect(state => ({
  barBasic: state.barBasic,
  lineBasic: state.lineBasic,
  pieBasic: state.pieBasic,
}), {
    update
  })(ContainerComponents)


