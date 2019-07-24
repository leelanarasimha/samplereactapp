import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Student from './components/Student/Student';


class App extends Component {
  state= {
    students: [
      {name: 'Devender', age: 35},
      {name: 'Leela', age: 35},
    ],
    showStudents: false,
  }
  
  render() {
    return (
      <div>
        <Header></Header>
        <button onClick={this.toggleStudentsHandler}>Toggle Students</button>
        <hr/>

        { this.state.showStudents ? 
        <div>
        <Student details={this.state.students[0]} ></Student>
        <hr/>
        <Student details={this.state.students[1]}></Student>
        <hr/>
        <button onClick={this.changeDevaName}>Click Here</button>
        </div> : null
      }

        <Footer></Footer>
    </div>
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
