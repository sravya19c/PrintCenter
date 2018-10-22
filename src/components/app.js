import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class App extends Component {
render() {
    return (
      <Link className="btn btn-primary" to="/print">Request PrintOuts</Link>
    )
  }
}

export default App;
