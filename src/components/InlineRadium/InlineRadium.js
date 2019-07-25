import React, {Component} from 'react';
import './InlineRadium.css';
import Radium from 'radium';

class InlineRadium extends Component {

    render() {

        let styles = {
            padding: '20px',
            backgroundColor: 'red',
            color: 'white',
            ':hover': {
                color: 'black',
                backgroundColor: 'yellow',
            },
            '@media(min-width: 800px)' : {
                border: '8px solid black'
            }
        };


        return (
            
            <div>
                <div >Inline Radium Component</div>

                <div>
                    <a href="" style={styles}>Click here</a>
                </div>
            </div>
           
        )
    }
}


export default Radium(InlineRadium);