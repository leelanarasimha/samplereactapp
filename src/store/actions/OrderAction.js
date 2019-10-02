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

export const burgerPurchase = (orderdata, token) => {
    return dispatch => {
        dispatch(burgerPurchaseStart());
        axios.post( `/orders.json?auth=${token}`, orderdata )
            .then( response => {
                dispatch(burgerPurchaseSuccess(response.data, orderdata));
            } )
            .catch( error => {
                dispatch(burgerPurchaseFail(error));
            } );
    }
}

export const onInitPurchase = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}


export const orderFetchStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const orderFetchSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const orderFetchFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const orderFetch = (token) => {
    return dispatch => {
        dispatch(orderFetchStart());
        axios.get(`/orders.json?auth=${token}`)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(orderFetchSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(orderFetchFail(err));
            });
    }
}