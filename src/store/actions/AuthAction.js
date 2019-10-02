import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }

}


export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
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
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('userId', response.data.localId);
            localStorage.setItem('expirationDate', new Date(new Date().getTime() + (response.data.expiresIn * 1000)));
            dispatch(checkAuthTimeout(response.data.expiresIn));
            dispatch(authSuccess(response.data.idToken, response.data.localId));
        }).catch((error) => {            
            dispatch(authFail(error.response.data.error));
        });
        

    }
}

export const authCheck = () => {
    return dispatch => {
        let token = localStorage.getItem('token');
        if ( ! token) {
            dispatch(authLogout());
        } else {
            let expirationDate = localStorage.getItem('expirationDate');
            let userId = localStorage.getItem('userId');

            if (new Date(expirationDate) > new Date()) {
                let actualDate = (new Date(expirationDate).getTime() - new Date().getTime())/1000;
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout(actualDate));
            } else {
                dispatch(authLogout());
            }
        }
    }
}