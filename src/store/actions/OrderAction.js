import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const burgerPurchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.BURGER_PURCHASE_SUCCESS,
        id: id,
        orderdata: orderData
    }
}

export const burgerPurchaseFail = (error) => {
    return {
        type: actionTypes.BURGER_PURCHASE_FAIL,
        error: error
    }
}

export const burgerPurchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const burgerPurchase = (orderdata) => {
    return dispatch => {
        dispatch(burgerPurchaseStart());
        axios.post( '/orders.json', orderdata )
            .then( response => {
                dispatch(burgerPurchaseSuccess(response.data, orderdata));
            } )
            .catch( error => {
                dispatch(burgerPurchaseFail(error));
            } );
    }
}