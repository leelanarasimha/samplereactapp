import * as actionTypes from '../actions/actionTypes';
import { fastest } from 'sw-toolbox';

const initialState = {
    orders: [],
    loading: false,
}

const OrderReducer = (state = initialState, action) => {
    switch(action.type) {

        case actionTypes.PURCHASE_BURGER_START: 
            return {
                ...state,
                loading: true
            };
        case actionTypes.BURGER_PURCHASE_SUCCESS:
            let newOrder = {
                ...action.orderdata,
                orderid: action.id
            };
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false
            };
        case actionTypes.BURGER_PURCHASE_FAIL:
                return {
                    ...state,
                    loading: false
                };
                default:
                    return state;
    }
};


export default OrderReducer;