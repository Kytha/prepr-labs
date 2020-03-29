import axios from "axios";
import { tokenConfig } from "../../core/auth/actions";

const REQUEST_LABS = "REQUEST_LABS";
const RECEIVE_LABS = "RECEIVE_LABS";
const REQUEST_LAB_ERROR = "REQUEST_LAB_ERROR";

const INITIAL_STATE = {
    labs_by_first_letter: null,
    labs_list: null,
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
            let populate_me = {};
            action.payload.data.forEach(lab => {
                const letter = lab.title.charAt(0).toLowerCase();
                if (populate_me[letter]) {
                    populate_me[letter].push(lab);
                } else {
                    populate_me[letter] = [lab];
                }
            });
            return {
                ...state,
                labs_by_first_letter: populate_me,
                labs_list: action.payload.data,
                isLoading: false
            };
        case REQUEST_LAB_ERROR:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            };
        default:
            return state;
    }
}

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
