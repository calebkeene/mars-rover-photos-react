import React from 'react';
import TextHelper from '../helpers/TextHelper';

class NoPhotoResultsMsg extends React.Component {
  constructor(props) {
    super(props);
    this._cronTypeFriendlyText = this._cronTypeFriendlyText.bind(this);
  }

  _cronTypeFriendlyText(fetchPhotosBy) {
    console.log('fetchPhotosBy: ' + fetchPhotosBy);
    if(fetchPhotosBy === 'sol') {
      return TextHelper.capitalise(fetchPhotosBy)
    }
    else {
      return TextHelper.capitalise(fetchPhotosBy.split("_")[1]);
    }
  }

  render() {
    if(this.props.isShowing) {
      return (
        <div class='cell small-6 medium-5'>
          <p class='rover__status-text'>>No Photo results for this {this._cronTypeFriendlyText(this.props.fetchPhotosBy)}</p>
        </div>
      )
    }
    else { return null; }
  }
}

export default NoPhotoResultsMsg;
