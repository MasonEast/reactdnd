import { ADDPIE, ADDLINE, UPDATE, AJAXCHARTSDATA, ADJUSTDATA } from '../action-types'


export default function pieBasic (state = [], action) {
  switch (action.type) {
    case ADDPIE:
      let str = 'pie'
      let obj = {
        id: str + state.length,
        left: 10,
        top: 10
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