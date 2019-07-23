import React, {Component} from 'react';


class Student extends Component {
    render() {

        return (
            <div>
                <div>Student Name: {this.props.details.name}</div>
                <div>Student Name: {this.props.details.age}</div>
            </div>
        )
    }
}

export default Student;