import axios from "axios";

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from "./types";

// Setup config with token - helper function

export const tokenConfig = getState => {
    // Get token from state
    const { access_token } = getState().auth;
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": csrfToken
        }
    };

    // If token, add to headers config

    if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
};

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    // User Loading
    dispatch({ type: USER_LOADING });

    // Get token from state
    axios
        .get("/api/auth/user", tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: AUTH_ERROR
            });
        });
};

// LOGIN USER

export const login = (email, password) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // Request Body
    const body = JSON.stringify({ email, password });
    axios
        .post("/api/auth/login", body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: LOGIN_FAIL
            });
        });
};

// REGISTER USER
export const register = ({
    name,
    password,
    email,
    password_confirmation
}) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // Request Body
    const body = JSON.stringify({
        name,
        email,
        password,
        password_confirmation
    });
    console.log(body);
    axios
        .post("/api/auth/signup", body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: REGISTER_FAIL
            });
        });
};

// LOGOUT USER

export const logout = postMortem => (dispatch, getState) => {
    axios
        .get("/api/auth/logout", tokenConfig(getState))
        .then(() => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
            postMortem && postMortem();
        })
        .catch(err => {});
};
