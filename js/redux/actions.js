import { ADDBAR, ADDBARCHART, ADDLINE, ADDPIE, ADDMYCHART, UPDATE, UPDATEOPTION, SETCHARTSOPTION, AJAXCHARTSDATA, ADJUSTDATA, AJAXADJUSTDATA } from "./action-types";
import ajax from '../components/report/ajax'

export const addBar = data => ({ type: ADDBAR, data })
export const addBarChart = data => ({ type: ADDBARCHART, data })

export const addLine = data => ({ type: ADDLINE, data })

export const addPie = data => ({ type: ADDPIE, data })

export const addMyChart = data => ({ type: ADDMYCHART, data })

export const update = data => ({ type: UPDATE, data })
export const updateOption = data => ({ type: UPDATEOPTION, data })

export const setChartsOption = data => ({ type: SETCHARTSOPTION, data })





export const ajaxChartsData = () => {
  return dispatch => {
    ajax('/report/report/tradeTrendAnalysis/day/dayAnalysis', {
      begindate: '2019-08-05 00:00:00',
      enddate: '2019-09-04 00:00:00',
      shopIds: '',
      cancel: 0
    }, 'post').then(res => {
      dispatch({ type: AJAXCHARTSDATA, data: res })
    })
  }
}

export const adjustData = data => ({ type: ADJUSTDATA, data })



