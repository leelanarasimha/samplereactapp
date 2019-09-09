import React, {Component} from 'react';

class Order extends Component {

    
    render() {
        let ingredientsdata = [];
        for (let index in this.props.ingredients) {
            ingredientsdata.push(<span key={index}>{index}({this.props.ingredients[index]}) </span>);
        }
        return (
            <div>
                <div>Ingredient: {ingredientsdata}</div>
                <div>Price: {this.props.price.toFixed(2)}</div>
            </div>
        )
    }
}

export default Order;