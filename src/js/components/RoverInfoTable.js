import React from 'react';

class RoverInfoTable extends React.Component {
  render() {
    const rover = this.props.rover;
    return(
      <table class='rover__info-table cell small-12 medium-10 medium-offset-1'>
        <thead>
          <tr>
            <th>name</th>
            <th>launch_date</th>
            <th>landing_date</th>
            <th>status</th>
            <th>max_sol</th>
            <th>max date</th>
            <th>total photos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{rover.name}</td>
            <td>{rover.launch_date}</td>
            <td>{rover.landing_date}</td>
            <td>{rover.status}</td>
            <td>{rover.max_sol}</td>
            <td>{rover.max_date}</td>
            <td>{rover.total_photos}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default RoverInfoTable;
