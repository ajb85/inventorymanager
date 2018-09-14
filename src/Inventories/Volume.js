import React, { Component } from "react";
import TableCalendar from "./TableCalendar.js";

class Volume extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      volumes: this.trimVolumeData(),
      dates: {
        startDate: this.props.startDate,
        endDate: this.props.endDate
      },
      changed: false
    };
  }
  componentDidUpdate(prevProps, prevState) {
    //Check to see if both the state was changed && if the data is different
    //from props.  Both are needed to prevent an infinite loop.  If just
    //state is checked, it'll see the state is different and refresh constantly
    //if just the data is checked, it'll refresh infinitely since once the
    //input differs from what's saved, dataWasChanged will always be true.
    const stateDidChange = this.didInputChange(prevState.volumes);
    const dataWasChanged = this.didInputChange(this.props.volumes);
    if (stateDidChange && dataWasChanged) {
      this.setState({ changed: true });
    }
  }
  //Returns "true" if the two arrays are different
  //"false" if the content and order are the same
  didInputChange(oldState) {
    let changed = false;
    const newState = this.state.volumes;
    for (let date in newState) {
      if (oldState[date] !== newState[date]) {
        changed = true;
      }
    }

    return changed;
  }
  onInputChange(time, event) {
    let newVolume = JSON.parse(JSON.stringify(this.state.volumes));
    newVolume[time] = event.target.value;
    this.setState({ volumes: newVolume });
  }
  onDateChange(key, event) {
    let newDate = this.state.dates;
    //If the startDate is changed, make sure it isn't after the endDate.
    //If so, set it to the startDate+1
    if (key === "startDate") {
      newDate[key] = stringToDate(event.target.value);
      if (newDate[key] > this.state.dates.endDate) {
        newDate.endDate = addDays(newDate[key], 1);
      }
      //Same thing with endDate but in reverse
    } else {
      newDate[key] = stringToDate(event.target.value);
      if (newDate[key] < this.state.dates.startDate) {
        newDate.startDate = addDays(newDate[key], -1);
      }
    }
    this.setState({ dates: newDate });
  }
  trimVolumeData() {
    const volumes = this.props.volumes;
    const startDate = this.props.startDate;
    const endDate = this.props.endDate;
    let newVolumes = {};
    let newDate = startDate;

    for (let i = 0; newDate <= endDate; i++) {
      newDate = addDays(startDate, i);
      const timestamp = newDate.getTime();
      if (volumes[timestamp]) {
        newVolumes[timestamp] = volumes[timestamp];
      } else {
        newVolumes[timestamp] = "";
      }
    }
    console.log(newVolumes);
    return newVolumes;
  }
  onSubmit(event) {
    event.preventDefault();
    //POST fetch to update server file under username with name+link
    const saveFileURL = "./saveInvData.php";
    var fetchData = {
      method: "POST",
      body: JSON.stringify([this.state.volumes, "volumes"]),
      cache: "no-cache"
    };
    fetch(saveFileURL, fetchData)
      .then(res => res.text())
      .then(data => console.log("data: ", data));
    return false;
  }

  render() {
    const numOfDays = diffTwoDates(
      this.state.dates.startDate,
      this.state.dates.endDate
    );
    let saveButton;
    let table = (
      <TableCalendar
        startDate={this.state.dates.startDate}
        days={numOfDays}
        onChange={this.onInputChange}
        volumes={this.state.volumes}
      />
    );
    if (this.state.changed) {
      saveButton = (
        <input className="saveButton" value="Save Changes" type="submit" />
      );
    }
    return (
      <form onSubmit={this.onSubmit} className="submitForm">
        <span>Start Date:</span>
        <input
          type="date"
          required="required"
          className="calendarDate"
          value={dateObjectFormat(this.state.dates.startDate)}
          onChange={this.onDateChange.bind(this, "startDate")}
        />
        <span className="pushEndDate">End Date:</span>
        <input
          type="date"
          required="required"
          className="calendarDate"
          value={dateObjectFormat(this.state.dates.endDate)}
          onChange={this.onDateChange.bind(this, "endDate")}
        />
        {saveButton}
        <h1>Occupancy %</h1>
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
          <tbody>{table}</tbody>
        </table>
      </form>
    );
  }
}

export default Volume;

function stringToDate(stringDate) {
  let year = Number(stringDate.substring(0, 4));
  let month = Number(stringDate.substring(5, 7)) - 1;
  let day = Number(stringDate.substring(8));
  return new Date(year, month, day);
}
function diffTwoDates(startDate, endDate) {
  const day_ms = 1000 * 60 * 60 * 24;
  let dummyEndDate = new Date(endDate);
  let dummyStartDate = new Date(startDate);
  return (
    Math.round((dummyEndDate.getTime() - dummyStartDate.getTime()) / day_ms) + 1
  );
}
function addDays(startDate, days) {
  let dummyDate = new Date(startDate);
  return new Date(dummyDate.setDate(dummyDate.getDate() + days));
}
function dateObjectFormat(date) {
  date = new Date(date);
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return yyyy + "-" + mm + "-" + dd;
}

/*
<input
  type="number"
  className="inputListSm"
  value={this.state.dates.numOfDays}
  onChange={this.onDateChange.bind(this, "numOfDays")}
/>
//If number of days is changed, update the endDate
} else if (key === "numOfDays") {
newDate[key] = event.target.value;
newDate.endDate = addDays(
  this.state.dates.startDate,
  this.state.dates.numOfDays
);
*/
