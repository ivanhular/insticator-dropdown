import axios from 'axios'
/* ++++++++++ --------------- EXPORTS --------------- ++++++++++ */
import {
  WEBSITE_LIST_REQUEST, // please update this and add more if necessary
  WEBSITE_LIST_SUCCESS,
  WEBSITE_LIST_FAIL,
  WEBSITE_LIST_SELECT,
} from '../constants/dropdown'

export const getList = () => async (dispatch) => {
  try {
    dispatch({
      type: WEBSITE_LIST_REQUEST,
    })
    const { data: payload } = await axios.get('./data.json')

    dispatch({
      type: WEBSITE_LIST_SUCCESS,
      payload: payload.map((website) => ({ ...website, selected: false })),
    })
  } catch (error) {
    dispatch({
      type: WEBSITE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const search = (str) => async (dispatch, getState) => {
  try {
    // const {
    //   websiteList: { websites },
    // } = getState()

    const { data } = await axios.get('./data.json')

    const filtered = data?.filter((website) => website.domain.includes(str))

    dispatch({
      type: WEBSITE_LIST_SUCCESS,
      payload: filtered,
    })
  } catch (error) {
    dispatch({
      type: WEBSITE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const setSelected = (id) => (dispatch, getState) => {
  const {
    websiteList: { websites },
  } = getState()

  dispatch({
    type: WEBSITE_LIST_REQUEST,
  })

  dispatch({
    type: WEBSITE_LIST_SELECT,
    payload: websites.map((website, i) =>
      id === i ? { ...website, selected: !website.selected } : website
    ),
  })
}
