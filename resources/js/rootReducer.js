import { combineReducers } from "redux";
import auth from "./core/auth";
import home from "./scenes/home/duck";
import admin from "./scenes/admin/duck";
import { LOGOUT_SUCCESS } from "./core/auth/types";

const appReducer = combineReducers({
    auth,
    home,
    admin
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_SUCCESS) {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
