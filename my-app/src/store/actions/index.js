import axios from "axios";

export const FETCHING_PROJECTS_START = "FETCHING_PROJECTS_START";
export const FETCHING_PROJECTS_SUCCESS = "FETCHING_PROJECTS_SUCCESS";
export const FETCHING_PROJECTS_FAILURE = "FETCHING_PROJECTS_FAILURE";

export const fetchProjects = () => dispatch => {
  dispatch({ type: FETCHING_PROJECTS_START });
  axios
    .get("http://localhost:5000/projects")
    .then(response => {
      dispatch({
        type: FETCHING_PROJECTS_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: FETCHING_PROJECTS_FAILURE,
        payload: error
      });
    });
};
