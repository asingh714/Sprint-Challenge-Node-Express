import {
  FETCHING_PROJECTS_START,
  FETCHING_PROJECTS_SUCCESS,  
  FETCHING_PROJECTS_FAILURE,
} from "../actions"

const initialState = {
  projects: [],
  error: null,
  isFetchingProjects: false
}

const projectReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCHING_PROJECTS_START:
      return {
        ...state,
        error: null,
        isFetchingProjects: true
      }
    case FETCHING_PROJECTS_SUCCESS:
      return {
        ...state,
        isFetchingProjects: false,
        projects: action.payload,
        error: null
      }
    case FETCHING_PROJECTS_FAILURE:
      return {
        ...state,
        isFetchingProjects: false,
        error: action.payload
      }
    default:
      return state; 
  }
} 

export default projectReducer;