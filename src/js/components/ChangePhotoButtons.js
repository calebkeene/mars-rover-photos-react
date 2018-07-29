import React from 'react';
import '../../styles/css/Button.css';

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
        <div class='cell small-12 medium-10 medium-offset-1'>
          <button class='button--change-photo button secondary' onClick={this._changePreviousHandler}>Previous Photo</button>
          <button class='button--change-photo button secondary' onClick={this._changeNextHander}>Next Photo</button>
        </div>
      )
    }
    else { return null; }
  }
}

export default ChangePhotoButtons;
