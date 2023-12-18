import {
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    CLEAR_ERRORS
} from "../constants/addUserContant"
import axios from "axios"


export const addNewUser = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_USER_REQUEST
        });

        const config = {
            headers: { "Content-Type": "application/json" }
        }
        const { data } = await axios.post(`http://localhost:4000/api/v1/newuser`, userData, config);

        dispatch({
            type: ADD_USER_SUCCESS,
            payload: data
        });
        console.log('User created successfully', data.user);

        return data.product;
    } catch (error) {
        dispatch({
            type: ADD_USER_FAIL,
            payload: error.response.data.message
        });

        console.error('Error to create user:', error);
        throw error;
    }
};



export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}