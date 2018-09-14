import React, { Component } from "react";
import TableCalendar from "./TableCalendar.js";

class VolumePopUp extends Component {
  render() {
    let table = (
      <TableCalendar
        startDate={this.props.startDate}
        days={this.props.numOfDays}
        onChange={this.props.onChange}
        volumes={this.props.volumes}
      />
    );
    return (
      <div className="popup">
        <h1>Occupancy %</h1>
        <table className={["calendar"].join(" ")}>
          <thead className="tableHeader">
            <tr>
              <th>Sunday</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>
        </table>
        <input
          className="closeButton"
          type="button"
          onClick={this.props.toggle.bind(this)}
          value="X"
        />
      </div>
    );
  }
}

export default VolumePopUp;
