import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

class ContactData extends Component {

    state = {
        name: '',
        phonenumber: '',
        email: '',
        address : {
            street: '',
            postalcode: ''
        },
        loading: false,
    }

    orderHandler = () => {
        this.setState( { loading: true } );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Max Schwarzmüller',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }

    render() {
        let form  = '';
        if (this.state.loading) {
            form = <Spinner/>
        } else {
            form = (
                <div>
            <input type="text" name="name"/>
            <input type="text" name="phonenumber"/>
            <input type="text" name="email"/>

            <Button btnType="Danger">Cancel</Button>
            <Button btnType="Success" clicked={this.orderHandler}>Continue</Button>
            </div>
            );
        }
        return (
            <div>
                {form}
            </div>
        );
    }
}

export default ContactData;