import React, { Component } from "react";
import TableRowNewInv from "./TableRowNewInv.js";
import ".../css/printInvSheet.css";
import VolumePopUp from "./VolumePopUp.js";
import AppIndex from "./AppIndex.js";

class NewInventory extends Component {
  constructor(props) {
    super(props);
    this.onInvChange = this.onInvChange.bind(this);
    this.onVolumeChange = this.onVolumeChange.bind(this);
    this.toggleVolumesTable = this.toggleVolumesTable.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      date: getTodaysDate(),
      volumesComplete: false,
      showCalendar: false,
      calendar: { volumes: this.props.volumes }
    };
    //this.state: {item: {0: "123", 1: "41"}, item2: {}}
  }

  componentDidMount() {
    const countObj = {};
    this.props.productList.forEach(function(row) {
      countObj[row.item] = { unitCount: "", caseCount: "" };
    });
    this.setState({ newCount: countObj });
    this.setState({ calendar: this.getCalendarData() });
  }
  onDateChange(event) {
    this.setState({ date: event.target.value });
  }
  onInvChange(item, index, event) {
    const updatedField = this.state.newCount[item];
    updatedField[index] = event.target.value;
    this.setState({ [item]: updatedField });
  }
  onVolumeChange(time, event) {
    let newVolume = this.state.calendar;
    newVolume.volumes[time] = event.target.value;
    this.setState({ calendar: newVolume });
    this.setState({
      volumesComplete: areAllVolumesCompleted(newVolume.volumes)
    });
  }
  toggleVolumesTable() {
    if (this.state.date && !this.state.showCalendar) {
      this.setState({ calendar: this.getCalendarData() });
    } else if (!this.state.date) {
      alert("Please input a date");
    }
    this.setState({ showCalendar: !this.state.showCalendar });
  }
  getCalendarData() {
    let submittedDate = new Date(stringToDate(this.state.date));
    submittedDate = submittedDate.getTime().toString();
    const lastInvTime = getLastInvDate(this.props.inventories, submittedDate);
    const lastInvDate = new Date(lastInvTime);
    const numOfDays = getNumberOfDays(lastInvDate, submittedDate);
    return {
      startDate: new Date(lastInvTime),
      numOfDays: numOfDays,
      volumes: this.dateObjForNumDays(lastInvDate, numOfDays)
    };
  }
  dateObjForNumDays(startDate, numOfDays) {
    let dateObj = {};
    let volumes = this.state.calendar.volumes;
    if (!volumes) {
      volumes = {};
    }
    for (let i = 0; i < numOfDays; i++) {
      const time = addDays(startDate.getTime(), i).getTime();
      volumes[time] ? (dateObj[time] = volumes[time]) : (dateObj[time] = "");
    }
    return dateObj;
  }
  volumesCallback(status) {
    this.setState({ volumesComplete: status });
  }
  onSubmit(event) {
    event.preventDefault();
    const time = new Date().getTime();
    const inventoryData = { [time]: this.state.newCount };
    const volumesData = this.state.calendar.volumes;
    //POST fetch to update server file under username with name+link
    const saveFileURL = "./saveInvData.php";
    var allFetchData = [
      {
        method: "POST",
        body: JSON.stringify([inventoryData, "inventories"]),
        cache: "no-cache"
      },
      {
        method: "POST",
        body: JSON.stringify([volumesData, "volumes"]),
        cache: "no-cache"
      }
    ];
    allFetchData.forEach(fetchData =>
      fetch(saveFileURL, fetchData)
        .then(res => res.text())
        .then(data => console.log("data: ", data))
    );
    this.props.loadNewPage(<AppIndex />);
    return false;
  }
  render() {
    let table, submitButton, volumesStatus, volumeTable;
    //Populate "table" variable
    if (this.state && this.state.newCount) {
      table = this.props.productList.map((row, i) => (
        <TableRowNewInv
          rowNum={i}
          onChange={this.onInvChange}
          rowData={row}
          invData={this.state.newCount}
          totalRows={Object.keys(this.props.productList.length)}
        />
      ));
    }
    //Generate Side Buttons button
    submitButton = (
      <input
        type="button"
        className="saveButton"
        value="Submit Inventory"
        onClick={this.onSubmit}
      />
    );
    if (this.state && this.state.volumesComplete) {
      volumesStatus = "volumesCheckGood";
    } else {
      volumesStatus = "volumesCheckBad";
    }
    //Populate "volumeTable" once submit is clicked
    if (this.state && this.state.showCalendar) {
      volumeTable = (
        <VolumePopUp
          startDate={this.state.calendar.startDate}
          numOfDays={this.state.calendar.numOfDays}
          volumes={this.state.calendar.volumes}
          onChange={this.onVolumeChange}
          toggle={this.toggleVolumesTable}
        />
      );
    }
    return (
      <form className="submitForm">
        {submitButton}
        <input
          type="button"
          className={volumesStatus}
          value="Update Occupancy"
          onClick={this.toggleVolumesTable}
        />
        <input
          type="date"
          value={this.state.date}
          className="currentDate"
          onChange={this.onDateChange.bind(this)}
        />
        <input
          className="printButton"
          type="button"
          value="Print Count Sheet"
          onClick={window.print}
        />
        <table className="inputTable">
          <thead className="tableHeader">
            <tr>
              <th className="restrictWidth">Item</th>
              <th>Count</th>
              <th>Unit Count</th>
              <th>Case Count</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>
        </table>
        {volumeTable}
      </form>
    );
  }
}

export default NewInventory;

function getTodaysDate() {
  var today = new Date();
  var dd = today.getDate();
  //January is 0
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  return yyyy + "-" + mm + "-" + dd;
}
function getLastInvDate(inventories, date) {
  //Function does not check for case of no previous inventories
  //
  //Add the submitted date to an array of previously submitted dates
  //and sort them oldest to new
  let invDates = [...Object.keys(inventories), date];
  invDates.sort(function(a, b) {
    return a - b;
  });
  let index = invDates.indexOf(date);
  //Do not return data if there was no previous interval
  if (index) {
    return Number(invDates[index - 1]);
  }
}
function stringToDate(stringDate) {
  let year = Number(stringDate.substring(0, 4));
  let month = Number(stringDate.substring(5, 7)) - 1;
  let day = Number(stringDate.substring(8));
  return new Date(year, month, day);
}
function addDays(startDate, days) {
  let newDate = new Date(startDate);
  return new Date(newDate.setDate(newDate.getDate() + days));
}
function getNumberOfDays(lastInvDate, date) {
  const day_ms = 24 * 60 * 60 * 1000; //86,400,000
  return Math.round((date - lastInvDate) / day_ms);
}
function areAllVolumesCompleted(volumes) {
  for (let vol in volumes) {
    if (volumes[vol] === "") {
      return false;
    }
  }
  return true;
}
