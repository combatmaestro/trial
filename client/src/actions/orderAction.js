import axios from "axios";
import {
  ADMIN_GET_ORDER_REQUEST,
  ADMIN_GET_ORDER_SUCCESS,
  ADMIN_GET_ORDER_FAILURE,
} from "../constants/orderConstants";
axios.defaults.withCredentials = true;
// const backendUrl = "https://cybervie-server.vercel.app";
const backendUrl = "http://127.0.1.1:4000"
export const getAllOrders = (id) => async (dispatch) => {
  dispatch({
    type: ADMIN_GET_ORDER_REQUEST,
  });

  try {
    const { data } = await axios({
      method: "GET",
      url: `/payment/allorders`,
    });

    dispatch({
      type: ADMIN_GET_ORDER_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    console.log("hell", error);
    dispatch({
      type: ADMIN_GET_ORDER_FAILURE,
      payload: error.response.data.message,
    });
  }
};
