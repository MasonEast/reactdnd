import { ADDBAR, ADDLINE, UPDATE, AJAXCHARTSDATA, ADJUSTDATA } from '../action-types'


export default function lineItems (state = [], action) {
  switch (action.type) {
    case ADDLINE:
      let str = 'line'
      let obj = {
        id: str + state.length,
        left: 10,
        top: 10,
        width: 450,
        height: 350,
        initWidth: 450,
        initHeight: 350,
      }
      return [...state, obj]
    case UPDATE:
      let newState = state.map(v => {
        if (v.id === action.data.id) {
          v.left = action.data.left
          v.top = action.data.top
          return v
        } else {
          return v
        }
      })

      return newState
    default:
      return state
  }
}