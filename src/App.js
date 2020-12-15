import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import PathVisualizer from './components/PathVisualizer/PathVisualizer';
import { Container } from "reactstrap";

class App extends Component {
  state = {  }
  render() { 
    return ( 
      <div>
        <Container>
          <PathVisualizer />
        </Container>
      </div>
     );
  }
}
 
export default App;