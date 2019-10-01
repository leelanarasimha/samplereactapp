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
        authdata: authData
    }
}


export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}


export const Auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        

        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyACE_QH1VjFQkVElIu_7oBw7Yq0-l71mWY`)
        .then(response => {
            
        })

    }
}