import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import PathVisualizer from './components/PathVisualizer/PathVisualizer';
import { Container } from "reactstrap";

class App extends Component {
  state = {}
  
  check = () => {
    const res = document.body.classList.contains("DarkMode");
    console.log('checking for class existence of dark mode: ' + res);
  }

  render() { 
    return ( 
      <div>
        <PathVisualizer />
        <button onClick={this.check}>test</button>
      </div>
     );
  }
}
 
export default App;