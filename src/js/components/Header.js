import React from 'react';
import '../../styles/css/Header.css';

class Header extends React.Component {
  render() {
    return(
      <div class='cell small-12 medium-10 medium-offset-1 header'>
        <h1 class='hide-for-medium'>Mars Rover Photos</h1>
        <h2 class='show-for-medium'>Mars Rover Photos</h2>
      </div>
    )
  }
}

export default Header;