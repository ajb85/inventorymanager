import React, { Component } from "react";
import TableCalendar from "./TableCalendar.js";

class Volume extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      volumes: {
        "1545886800000": 85,
        "1545973200000": 8,
        "1546059600000": 74,
        "1546232400000": 53,
        "1546318800000": 36,
        "1546405200000": 53,
        "1546491600000": 85,
        "1546578000000": 11,
        "1546664400000": 42,
        "1546750800000": 4,
        "1546837200000": 28,
        "1546923600000": 23,
        "1547010000000": 38,
        "1547096400000": 4,
        "1547182800000": 88,
        "1547269200000": 33,
        "1547355600000": 43,
        "1547442000000": 69,
        "1547528400000": 92,
        "1547614800000": 76
      }
    };
  }

  onInputChange(time, event) {
    let newVolume = this.state.volumes;
    newVolume[time] = event.target.value;
    this.setState({ volume: newVolume });
  }
  onSubmit(event) {
    event.preventDefault();
    //POST fetch to update server file under username with name+link
    const saveFileURL = "./saveInvData.php";
    var fetchData = {
      method: "POST",
      body: JSON.stringify([this.state.volumes, "volume"]),
      cache: "no-cache"
    };
    fetch(saveFileURL, fetchData)
      .then(res => res.text())
      .then(data => console.log("data: ", data));
    return false;
  }

  render() {
    let table = (
      <TableCalendar
        startDate={new Date(2018, 11, 27)}
        days={21}
        onInputChange={this.onInputChange}
        volumes={this.state.volumes}
      />
    );
    return (
      <form onSubmit={this.onSubmit}>
        <input className="saveButton" value="Save Changes" type="submit" />
        <table className="calendar">
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
          {table}
        </table>
      </form>
    );
  }
}

export default Volume;
