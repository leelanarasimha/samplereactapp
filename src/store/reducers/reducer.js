import {combineReducers} from 'redux';
import BurgerBuilderReducer from '../reducers/BurgerBuilderReducer';
import OrderReducer from '../reducers/OrderReducer';


const rootReducer = combineReducers({
    burgerbuilder: BurgerBuilderReducer,
    order: OrderReducer
});

export default rootReducer;