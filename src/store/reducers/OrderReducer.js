import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const OrderReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT: 
        return {
            ...state,
            purchased: false
        };

        case actionTypes.PURCHASE_BURGER_START: 
            return {
                ...state,
                loading: true
            };
        case actionTypes.BURGER_PURCHASE_SUCCESS:
            let newOrder = {
                ...action.orderdata,
                orderid: action.id,
            };
            return {
                ...state,
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true
            };
        case actionTypes.BURGER_PURCHASE_FAIL:
                return {
                    ...state,
                    loading: false
                };

        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true,
            };



            case actionTypes.FETCH_ORDERS_SUCCESS: 
            return {
                ...state,
                loading: false,
                orders: action.orders
            };

            case actionTypes.FETCH_ORDERS_FAIL:
                return {
                    ...state,
                    loading: false
                };
                default:
                    return state;
    }
};


export default OrderReducer;