import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }

}


export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: authData.idToken,
        userId: authData.localId
    }
}


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expiration) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expiration * 1000)
    }
}


export const Auth = (email, password, issignup) => {
    return dispatch => {
        dispatch(authStart());
        const authdata = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyACE_QH1VjFQkVElIu_7oBw7Yq0-l71mWY`;
        if (!issignup) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACE_QH1VjFQkVElIu_7oBw7Yq0-l71mWY`;
        }

        
        axios.post(url, authdata)
        .then(response => {
            dispatch(checkAuthTimeout(response.data.expiresIn));
            dispatch(authSuccess(response.data));
        }).catch((error, response) => {
            
            dispatch(authFail(error.response.data.error));
        });
        

    }
}