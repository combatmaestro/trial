import axios from "axios";
import {
  GET_MODULE_FAILURE,
  GET_MODULE_REQUEST,
  GET_MODULE_SUCCESS,
  GET_SPECIFIC_MODULE_FAILURE,
  GET_SPECIFIC_MODULE_REQUEST,
  GET_SPECIFIC_MODULE_SUCCESS,
  EDIT_MODULE_REQUEST,
  EDIT_MODULE_SUCCESS,
  EDIT_MODULE_FAILURE,
  ADD_MODULE_REQUEST,
  ADD_MODULE_SUCCESS,
  ADD_MODULE_FAILURE,
} from "../constants/moduleConstants";
// const backendUrl = "https://cybervie-server.vercel.app";
const backendUrl = "https://cybervie-server.vercel.app"
axios.defaults.withCredentials = true;
export const getAllModules = () => async (dispatch) => {
  dispatch({
    type: GET_MODULE_REQUEST,
  });

  try {
    const { data } = await axios({
      method: "GET",
      url: `${backendUrl}/module/getall`,
    });
    dispatch({
      type: GET_MODULE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_MODULE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const getModule = (id) => async (dispatch) => {
  dispatch({
    type: GET_SPECIFIC_MODULE_REQUEST,
  });

  try {
    const { data } = await axios({
      method: "GET",
      url: `${backendUrl}/module/details?id=${id}`,
    });
    dispatch({
      type: GET_SPECIFIC_MODULE_SUCCESS,
      payload: {
        module: data.module,
        responses: data.responses,
      },
    });
  } catch (error) {
    dispatch({
      type: GET_SPECIFIC_MODULE_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const editCurrentModule = (id, info) => async (dispatch) => {
  dispatch({
    type: EDIT_MODULE_REQUEST,
  });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    };

    const { data } = await axios.put(
      `${backendUrl}/module/admin/update?id=${id}`,
      info,
      config
    );
    dispatch({
      type: EDIT_MODULE_SUCCESS,
      payload: data.data,
    });
    return {
      success: true,
    };
  } catch (error) {
    dispatch({
      type: EDIT_MODULE_FAILURE,
      payload: error.response.data.message,
    });

    return {
      success: false,
    };
  }
};

export const addNewModule = (info) => async (dispatch) => {
  dispatch({
    type: ADD_MODULE_REQUEST,
  });

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    };

    const { data } = await axios.post(`${backendUrl}/module/admin/seed`, info, config);
    dispatch({
      type: ADD_MODULE_SUCCESS,
      payload: data.data,
    });
    return {
      success: true,
    };
  } catch (error) {
    dispatch({
      type: ADD_MODULE_FAILURE,
      payload: error.response.data.message,
    });

    return {
      success: false,
    };
  }
};
