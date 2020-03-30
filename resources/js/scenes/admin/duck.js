import axios from "axios";
import { tokenConfig } from "../../core/auth/actions";
import { dispatchSuccess, dispatchError } from "../../core/lib/messages";

const LAB_ADDED = "LAB_ADDED";
const REQUEST_LABS = "REQUEST_LABS";
const RECEIVE_LABS = "RECEIVE_LABS";
const REQUEST_LAB_ERROR = "REQUEST_LAB_ERROR";

const INITIAL_STATE = {
    labs_list: [],
    isLoading: false,
    error: null
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case REQUEST_LABS:
            return {
                ...state,
                isLoading: true
            };
        case RECEIVE_LABS:
            return {
                ...state,
                labs_list: action.payload.data,
                isLoading: false
            };
        case REQUEST_LAB_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        case LAB_ADDED:
            return {
                ...state,
                labs_list: [...state.labs_list, action.payload.data]
            };
        default:
            return state;
    }
}

export const addLab = lab => (dispatch, getState) => {
    axios
        .post(`/api/labs/`, lab, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LAB_ADDED,
                payload: res.data
            });
            dispatchSuccess("Added!", "Lab successfully added!");
        })
        .catch(err => {
            dispatchError(err);
        });
};

export const getLabs = () => (dispatch, getState) => {
    dispatch({
        type: REQUEST_LABS
    });
    axios
        .get(`/api/labs`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: RECEIVE_LABS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: REQUEST_LAB_ERROR,
                payload: err.response
            });
        });
};
