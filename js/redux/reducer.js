import { combineReducers } from 'redux'
import barBasic from './chartsReducer/barBasic'
import lineBasic from './chartsReducer/lineBasic'
import pieBasic from './chartsReducer/pieBasic'
import myChart from './chartsReducer/myChart'
import { ADDBARCHART, SETCHARTSOPTION } from './action-types'

function chartsOption (state = { items: [], item: '' }, action) {
  switch (action.type) {
    // case ADDBARCHART:
    //   let str = 'bar'
    //   let obj = {
    //     id: str + state.items.length,
    //     left: 10,
    //     top: 10,
    //     width: 320,
    //     height: 220
    //   }
    //   return { ...state, items: [...state.items, obj] }


    case SETCHARTSOPTION:
      console.log(action.data)

      // newState.items.forEach(v => {
      //   if (v.id === selectItem) {
      //     newState.item = v
      //   }
      // })
      return { ...state, item: action.data }
    default:
      return state
  }
}


//接受一个包含所有reducer的对象，返回一个新的reducer函数
export default combineReducers({
  barBasic,
  lineBasic,
  pieBasic,
  chartsOption,
  myChart
})
