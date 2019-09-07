import { ADDBAR, ADDLINE, UPDATE, UPDATEOPTION, AJAXCHARTSDATA, ADJUSTDATA } from '../action-types'


export default function barItems (state = {}, action) {
  switch (action.type) {
    case ADDBAR:
      let str = 'bar'
      let obj = {
        id: str + Object.keys(state).length,
        left: 10,
        top: 10,
        width: 450,
        height: 350,
        initWidth: 450,
        initHeight: 350,
      }
      return { ...state, [obj.id]: obj }

    case UPDATE:
      {
        const { id, left, top } = action.data
        let newState = { ...state }
        newState[id].left = left
        newState[id].top = top
        return newState
      }
    // let newState = state.map(v => {
    //   if (v.id === action.data.id) {
    //     v.left = action.data.left
    //     v.top = action.data.top
    //     return v
    //   } else {
    //     return v
    //   }
    // })


    case UPDATEOPTION:
      // let newState2 = state.map(v => {
      //   if (v.id === action.data.id) {
      //     v.width = action.data.width
      //     v.height = action.data.height
      //     return v
      //   } else {
      //     return v
      //   }
      // })
      const { id, width, height } = action.data
      let newState2 = { ...state }
      newState2[id].width = width
      newState2[id].height = height
      return newState2
    default:
      return state
  }
}