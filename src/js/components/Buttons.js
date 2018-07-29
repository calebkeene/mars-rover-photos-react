import React from 'react';

class Buttons extends React.Component {
  render() {
    return (
      <div>
        <input class='button primary' type='button' value='Rover' />
        <input class='button secondary' type='button' value='button 2' />
      </div>
    );
  };
};

export default Buttons;