import React from 'react';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

class PhotoDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handlePhotoDateSelection = this.handlePhotoDateSelection.bind(this);

    this.state = {
      datePickerFocused: null,
      roverPhotosDate: null,
      isOutsideDateRange: false
    }
  }

  handlePhotoDateSelection(date) {
    //this.setState({ isOutsideDateRange: this.checkCurrentDateRange() });
    this.props.setRoverPhotoDate(date);
  }

  checkCurrentDateRange(date) {
    // TODO: rewrite this so it's not broken
    // let rover = this.props.rover;
    // let selectedPhotoDate = moment(this.momentSelectedPhotoDate);
    // let landingDate = moment(rover.landing_date);
    // let maxDate = moment(rover.max_date);
    // let atOrBeforeLandingDate = moment(this.s)
    //   let atLandingOrAfter = selectedPhotoDate.isSame(landingDate) || selectedPhotoDate.isAfter(landingDate);
    // let atMaxDateOrBefore = selectedPhotoDate.isSame(maxDate) || selectedPhotoDate.isBefore(maxDate);
    // console.log('running checkCurrentDateRange');
    // console.log('atLandingOrAfter => ' + atLandingOrAfter)
    // console.log('atMaxDateRangeOrBefore => ' + atMaxDateOrBefore);
    // return (atLandingOrAfter && atMaxDateOrBefore);
  }

  render () {
    const rover = this.props.rover;
    return (
      <SingleDatePicker
        date={moment(rover.selectedPhotoDate)}
        //enableOutsideDays={true}
        //isDayBlocked={() => false}
        //isOutsideRange={() => this.state.isOutsideDateRange}
        isOutsideRange={() => false}
        numberOfMonths={1}
        onDateChange={date => this.handlePhotoDateSelection(date)} // PropTypes.func.isRequired
        focused={this.state.datePickerFocused} // PropTypes.bool
        onFocusChange={({ focused }) => this.setState({ datePickerFocused: focused })} // PropTypes.func.isRequired
        id='rover_photos_date' // PropTypes.string.isRequired,
        small={true}
        //showDefaultInputIcon
        //noBorder
      />
    )
  }
}

export default PhotoDatePicker;