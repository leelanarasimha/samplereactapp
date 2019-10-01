import {combineReducers} from 'redux';
import BurgerBuilderReducer from '../reducers/BurgerBuilderReducer';
import OrderReducer from '../reducers/OrderReducer';
import AuthReducer from '../reducers/AuthReducer';


const rootReducer = combineReducers({
    burgerbuilder: BurgerBuilderReducer,
    order: OrderReducer,
    auth: AuthReducer
});

export default rootReducer;