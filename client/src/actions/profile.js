import axios from "axios";
import { setAlert } from "./alert";
import {
  PROFILE_ERROR,
  GET_PROFILE,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  DELETE_ACCOUNT
} from "./types";

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    console.log(err);

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile
    });

    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    console.log(err);

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.profile
    });

    dispatch(setAlert("Education Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    console.log(err);

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteExperience = id => async dispatch => {
  try {
    const response = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    });

    dispatch(setAlert("Experience Deleted", "success"));
  } catch (err) {
    console.log(err);

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteEducation = id => async dispatch => {
  try {
    const response = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    });

    dispatch(setAlert("Education Deleted", "success"));
  } catch (err) {
    console.log(err);

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteAccount = id => async dispatch => {
  if (window.confirm("Are you sure? This cannot be undone")) {
    try {
      const response = await axios.delete(`/api/profile`);

      dispatch({
        type: CLEAR_PROFILE
      });

      dispatch({
        type: DELETE_ACCOUNT
      });

      dispatch(setAlert("Account Deleted"));
    } catch (err) {
      console.log(err);

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
