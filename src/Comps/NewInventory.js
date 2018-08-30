import React, { Component } from "react";
import TableRowNewInv from "./TableRowNewInv.js";
import "../css/printInvSheet.css";

//const savedData = require("../data/defaultUser/inventories.json");
const today = getTodaysDate();
let savedData;

//Local fetch Code
/*
const url = "inventories.json";
const fetchData = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  method: "GET",
  cache: "no-cache"
};
fetch(url, fetchData)
  .then(res => res.json())
  .then(function(data) {
    if (data) {
      savedData = data;
    }
  });
}
*/

class NewInventory extends Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    //this.state: {item: {0: "123", 1: "41"}, item2: {}}
  }
  componentDidMount() {
    this.props.currentList.forEach(row => this.setState({ [row.item]: {} }));
  }
  onDateChange(event) {
    this.setState({ date: event.target.value });
  }
  onInputChange(item, index, event) {
    const updatedField = this.state[item];
    updatedField[index] = event.target.value;
    this.setState({ [item]: updatedField });
  }
  consoleLog() {
    console.log(getTodaysDate());
  }
  onSubmit(event) {
    event.preventDefault();
    let dataToSave = {};
    const time = new Date().getTime();
    dataToSave[time] = this.state;
    //POST fetch to update server file under username with name+link
    const saveFileURL = "./saveInvData.php";
    var fetchData = {
      method: "POST",
      body: JSON.stringify([dataToSave, "inventories"]),
      cache: "no-cache"
    };
    fetch(saveFileURL, fetchData)
      .then(res => res.text())
      .then(data => console.log("data: ", data));
    return false;
  }
  render() {
    const table = this.props.currentList.map((row, i) => (
      <TableRowNewInv
        key={i}
        rowNum={i}
        onChange={this.onInputChange}
        rowData={row}
        totalRows={Object.keys(this.props.currentList.length)}
      />
    ));
    return (
      <form onSubmit={this.onSubmit} className="submitForm">
        <input
          type="date"
          defaultValue={getTodaysDate()}
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
              <th>Item</th>
              <th>Count</th>
              <th>Unit Count</th>
              <th>Case Count</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>
        </table>
        <input
          type="submit"
          className="submitButton"
          value="Submit Inventory"
        />
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

  today = yyyy + "-" + mm + "-" + dd;
  return today;
}
