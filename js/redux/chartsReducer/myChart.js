import { ADDBAR, ADDLINE, UPDATE, ADDMYCHART, ADJUSTDATA } from '../action-types'


export default function myChart (state = {}, action) {
  switch (action.type) {
    case ADDMYCHART:
      const { id, chart } = action.data
      return { ...state, [id]: chart }
    default:
      return state
  }
}