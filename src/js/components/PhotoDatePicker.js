import React from 'react';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

class PhotoDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this._handlePhotoDateSelection = this._handlePhotoDateSelection.bind(this);

    this.state = {
      datePickerFocused: null,
      selectedPhotoDate: null,
      isOutsideDateRange: false
    }
  }

  _handlePhotoDateSelection(date) {
    this.setState({selectedPhotoDate: date});
    this.props.setRoverPhotoDate(date);
  }

  _checkCurrentDateRange(selectedPhotoDate) {
    console.log("calling checkCurrentDateRange");
    console.log('selectedPhotoDate =>' + JSON.stringify(selectedPhotoDate));
    let minDate = this.state.minDate;
    let maxDate = this.state.maxDate;
    console.log("minDate => " + JSON.stringify(minDate));
    console.log("maxDate => " + JSON.stringify(maxDate));
    console.log("selectedPhotoDate.isSameOrAfter(minDate) => " + selectedPhotoDate.isSameOrAfter(minDate));
    console.log("selectedPhotoDate.isSameOrBefore(maxDate) => " + selectedPhotoDate.isSameOrBefore(maxDate));

    return (selectedPhotoDate.isSameOrAfter(minDate) && selectedPhotoDate.isSameOrBefore(maxDate));
  }

  componentDidMount() {
    const rover = this.props.rover;
    this.setState(
      {
        minDate: moment(rover.landin_date),
        maxDate: moment(rover.max_date),
        isShowing: this.props.isShowing
      }
    );
  }

  componentDidUpdate(prevProps) {
    if(this.props !== prevProps) {
      console.log('upating state')
      this.setState({isShowing: this.props.isShowing})
    }
  }

  render () {
    const rover = this.props.rover;
    if(this.props.isShowing) {
      // default to the landing_date if a date isn't previously selected
      let dateToUse = rover.selectedPhotoDate ? rover.selectedPhotoDate : rover.landing_date;
      return (
        <React.Fragment>
          <p>Earth Date</p>
          <SingleDatePicker
            date={moment(dateToUse)}
            isOutsideRange={() => false}
            // this is REALLY slow, so disable for now
            //isOutsideRange={(date) => this._checkCurrentDateRange(date)}
            numberOfMonths={1}
            onDateChange={date => this._handlePhotoDateSelection(date)} // PropTypes.func.isRequired
            focused={this.state.datePickerFocused} // PropTypes.bool
            onFocusChange={({ focused }) => this.setState({ datePickerFocused: focused })} // PropTypes.func.isRequired
            id='rover_photos_date' // PropTypes.string.isRequired,
            small={true}
            showDefaultInputIcon
          />
        </React.Fragment>
      )
    }
    else {
      return null;
    }
  }
}

export default PhotoDatePicker;