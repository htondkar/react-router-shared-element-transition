import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class HomePage extends Component {
  render() {
    return (
      <div className="page">
        Home page
        <Link to="/list">GO</Link>
      </div>
    );
  }
}

export default HomePage;