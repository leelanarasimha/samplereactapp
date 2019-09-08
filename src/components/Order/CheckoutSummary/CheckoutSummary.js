import React, {Component} from 'react';
import Burger from '../../../components/Burger/Burger';
import Button from '../../../components/UI/Button/Button';

class CheckoutSummary extends Component {

    render() {
        return (
        <div>
                <Burger ingredients={this.props.ingredients}></Burger>

                <div>
                    <Button btnType="Danger" clicked={this.props.checkoutCancel}>Cancel</Button>
                    <Button btnType="Success" clicked={this.props.checkoutContinue}>Continue</Button>
                </div>
            </div>
        );
    }
}

export default CheckoutSummary;