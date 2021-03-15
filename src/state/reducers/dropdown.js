/* ++++++++++ --------------- IMPORTS --------------- ++++++++++ */
// libraries
// import React from 'react'
// actions
import {
  WEBSITE_LIST_REQUEST, // please update this and add more if necessary
  WEBSITE_LIST_SUCCESS,
  WEBSITE_LIST_FAIL,
  WEBSITE_LIST_SELECT,
} from '../constants/dropdown'

/* ========== ~~~~~~~~~~ DROPDOWN STATUS : REDUCER ~~~~~~~~~~ ========== */

// REDUCERS
export const websiteListReducer = (state = { websites: [] }, action) => {
  switch (action.type) {
    case WEBSITE_LIST_REQUEST:
      return {
        loading: true,
      }
    case WEBSITE_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        websites: action.payload,
      }
    case WEBSITE_LIST_SELECT:
      return {
        loading: false,
        success: true,
        websites: action.payload,
      }
    case WEBSITE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
