import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';


 class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },

            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: true
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    componentDidMount() {
        console.log('auth js');
        if (!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.setAuthRedirectPath();
        }
    }

    inputChangedHandler(event, controlName) {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.auth(this.state.controls.email.value, 
            this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    }


    render() {
        let formElements = [];
        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElements.map(formElement => {
            return (
                <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            );
        });

        if (this.props.loading) {
            form = <Spinner/>;
        }

        let errorText = '';

        if (this.props.error) {
            errorText = <p>{this.props.error.message}</p>
        }

        let redirectTo = null;
        if (this.props.isAuthenticated) {
            redirectTo = <Redirect to="/"/>
        }



        return (
            <div>
                {redirectTo}
                {errorText}
                <h3>{(this.state.isSignUp) ? 'SignUp' : 'SignIn'}</h3>
            <form onSubmit={this.onSubmitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>

            <Button btnType="Danger" clicked={this.switchAuthHandler}>SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>

        );
    }   
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        building: state.burgerbuilder.building
    }
};

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, issignup) => dispatch(actions.Auth(email, password, issignup)),
        setAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);