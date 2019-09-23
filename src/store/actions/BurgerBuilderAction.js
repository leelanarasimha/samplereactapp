import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';


export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };

};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (name) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: name
    }
}

export const fetchIngredients = () => {
    return dispatch => {
        axios.get( 'ingredients.json' )
             .then( response => {
                dispatch(setIngredients(response.data));
             })
            .catch( error => {
                dispatch({
                    type: actionTypes.FETCH_INGREDIENTS_FAILED
                });
             });
    }
     
}