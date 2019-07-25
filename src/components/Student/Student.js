import React, {Component} from 'react';


class Student extends Component {
    render() {

        return (
            <div >
                <div onClick={this.props.click}>Student Name: {this.props.details.name}</div>
                <div>Student Name: {this.props.details.age}</div>
                <div>
                    <input type="text" onChange={this.props.changedname}
                    value={this.props.details.name}/>
                </div>
            </div>
        )
    }
}

export default Student;