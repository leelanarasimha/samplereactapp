import React from 'react';

const Input = (props) => {
    let inputElement = '';

    switch(props.elementtype) {
        case('input') : 
        inputElement = <input 
        {...props.elementconfig} 
        value={props.value} onChange={props.changed} />;
        break;

        case('textarea') :
        inputElement = <textarea onChange={props.changed} {...props.elementconfig} value={props.value}/>;
        break;
        case('select') : 
        inputElement = 
        <select onChange={props.changed} value={props.value}>
            { props.elementconfig.options.map(value => {
                return (
                    <option key={value.value} value={value.value}>{value.displayValue}</option>
                );
            })}
        </select>;
        break;
        default:
            inputElement = <input onChange={props.changed} {...props.elementconfig} value={props.value}/>
    }
    return (
        <div>
            <label>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input;