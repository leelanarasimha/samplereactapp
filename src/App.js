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
    ]
  }
  
  render() {
    return (
      <div>
        <Header></Header>
        <hr/>
        <Student details={this.state.students[0]} ></Student>
        <hr/>
        <Student details={this.state.students[1]}></Student>
        <hr/>
        <button onClick={this.changeDevaName}>Click Here</button>
        <Footer></Footer>
    </div>
    )
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
