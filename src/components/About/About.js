import React, {Component} from 'react';
import './About.css';

class About extends Component {

    clicked = () => {
        alert("dsdsd");
    }
    render() {
        return (
            <div>
                <div>About component</div>
                <a href="#" onClick={this.clicked}>Click heare</a>
            </div>
        );
    }
    
}

export default About;