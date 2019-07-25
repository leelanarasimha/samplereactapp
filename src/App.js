import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Student from './components/Student/Student';
import InlineRadium from './components/InlineRadium/InlineRadium';
import {StyleRoot} from 'radium';


class App extends Component {
  state= {
    students: [
      {name: 'Devender', age: 35},
      {name: 'Leela', age: 35},
      {name: 'Leedsdsla', age: 35},
      {name: 'Leedsdssasasala', age: 35},

    ],
    showStudents: true,
  }

  deleteStudentHandler = (index) => {
    let students = [...this.state.students];
    students.splice(index,1);
    this.setState({students: students});
  }

  changeStudentName = (event, name) => {
    let studentIndex = this.state.students.findIndex((s) => {
      return s.name === name;
    });

    let student = {
      ...this.state.students[studentIndex]
    };

    student.name = event.target.value;

    let studentDetails = [...this.state.students];
    studentDetails[studentIndex] = student;

    this.setState({students: studentDetails});
  }
  
  render() {

    let studentsHtmlData = null;

    if (this.state.showStudents) {
      studentsHtmlData = (
      <div>

        {
          this.state.students.map((student, index) => {
            return (
              <div key={index}>
                <Student 
                  details={student} 
                    click={() => this.deleteStudentHandler(index)}
                    changedname={(event) => this.changeStudentName(event, student.name)}>
                </Student>
              <hr/>
              </div>
            );
          })
        }
      
        <button onClick={this.changeDevaName}>Click Here</button>
        </div>
      );
    }



    return (
      <StyleRoot>
      <div>
        <Header></Header>
        <button onClick={this.toggleStudentsHandler}>Toggle Students</button>
        <hr/>
        {studentsHtmlData}

        <InlineRadium></InlineRadium>
        <Footer></Footer>
    </div>
    </StyleRoot>
    )
  }


  toggleStudentsHandler = () => {
    this.setState({showStudents: !this.state.showStudents})
  }

  changeDevaName = () => {
    this.setState({
      students: [
        {name: 'Deva', age: 35},
        {name: 'Narasimha', age: 35},
      ]
    })
  }
}

export default App;
