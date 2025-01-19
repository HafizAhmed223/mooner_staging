import {
    SHOW_LOADER,
    HIDE_LOADER
  } from "../../actions/loader/loader.types";
  
  const INITIAL_STATE = {
      loading: false,
  
  }
  
  const loaderReducer = (state = INITIAL_STATE, action,) => {
  
      switch (action.type) {
       
          case SHOW_LOADER:
              return { ...state, loading: true }
          case HIDE_LOADER:
              return { ...state, loading: false }
       
          default:
              return state
      }
  }
  export default loaderReducer
  