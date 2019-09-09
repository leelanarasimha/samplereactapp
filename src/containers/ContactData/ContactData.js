import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import Input from '../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Your Name',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                value: ''
            },
            phonenumber: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Phone Number',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Email Address',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Country',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                value: ''
            },
            postalcode: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Zip Code',
                    type: 'text'
                },
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 10
                },
                valid: false,
                value: ''
            },

            deliverymethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ],
                },
                value: ''
            },


        },



        loading: false,
    }

    checkValidity(value, rules) {
        let isValid = false;
        if (rules.required) {
            isValid = value.trim() !== '';
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength;
        }

        return isValid;
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedOrderElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedOrderElement.value = event.target.value;
        updatedOrderElement.valid = this.checkValidity(updatedOrderElement.value, updatedOrderElement.validation);
        updatedOrderForm[inputIdentifier] = updatedOrderElement;
        this.setState({orderForm: updatedOrderForm});
    }

    orderHandler = () => {
        this.setState({ loading: true });
        const orderData = {};
        for(let key in this.state.orderForm) {
            orderData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData : orderData,
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        let formelement = [];
        for (let key in this.state.orderForm) {
            formelement.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }


        let form = (
            <div>
                <h2>Please fill the Form to Order</h2>

                {formelement.map(value => {
                    return (
                    <Input
                    key={value.id}
                    elementtype={value.config.elementType}
                    elementconfig={value.config.elementConfig}
                    value={value.config.value}
                    changed={(event) => this.inputChangeHandler(event, value.id)}
                    />
                    );
                })}

                <Button btnType="Danger">Cancel</Button>
                <Button btnType="Success" clicked={this.orderHandler}>Continue</Button>
            </div>
        );


        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div>
                {form}
            </div>
        );
    }
}

export default ContactData;