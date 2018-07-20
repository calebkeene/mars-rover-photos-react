import React from 'react';

class ChangePhotoButtons extends React.Component {
  constructor(props) {
    super(props);
    this._changePreviousHandler = this._changeNextHander.bind(this);
    this._changeNextHander = this._changeNextHander.bind(this);
  }

  _changePreviousHandler() {
    this.props.changePhoto('previous')
  }

  _changeNextHander() {
    this.props.changePhoto('next')
  }

  render() {
    if(this.props.isShowing) {
      return (
        <div class='change-photo-buttons-wrapper'>
          <button onClick={this._changePreviousHandler}>Previous Photo</button>
          <button onClick={this._changeNextHander}>Next Photo</button>
        </div>
      )
    }
    else { return null; }
  }
}

export default ChangePhotoButtons;
