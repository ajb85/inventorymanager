import React, { Component } from "react";
import DateNav from "../HelperComps/DateNav.js";
import ViewCountsMainTable from "../HelperComps/ViewCountsMainTable";

class ViewCounts extends Component {
  constructor(props) {
    super(props);
    this.onDateChange = this.onDateChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      date: sortInventoryDates(this.props.inventories)[0],
      count: invToArray(
        this.props.inventories[sortInventoryDates(this.props.inventories)[0]]
      )
    };
  }
  onDateChange(date) {
    this.setState({ date });
    this.setState({ count: invToArray(this.props.inventories[date]) });
  }
  onInputChange(row, field, event) {
    let updatedItem = this.state.count[row];
    const key = Object.keys(updatedItem)[0];
    if (field) {
      updatedItem[key][field] = event.target.value;
    } else {
      Object.defineProperty(
        updatedItem,
        event.target.value,
        Object.getOwnPropertyDescriptor(updatedItem, key)
      );
      delete updatedItem[key];
    }
    this.setState({
      count: [
        ...this.state.count.splice(0, row),
        updatedItem,
        ...this.state.count.splice(row + 1)
      ]
    });
  }
  onSubmit(event) {
    event.preventDefault();
    let inventoryData = this.props.inventories;
    inventoryData[this.state.date] = invArrToObj(this.state.count);
    //POST fetch to update server file under username with name+link
    const saveFileURL = "./saveInvData.php";
    var fetchData = {
      method: "POST",
      body: JSON.stringify([inventoryData, "inventories"]),
      cache: "no-cache"
    };

    fetch(saveFileURL, fetchData)
      .then(res => res.text())
      .then(data => console.log("data: ", data));

    alert("Data saved!");
    return false;
  }
  render() {
    const invDates = sortInventoryDates(this.props.inventories);
    const dateNavTable = invDates.map((date, i) => (
      <DateNav
        key={i}
        onClick={this.onDateChange}
        date={date}
        change={this.onInputChange}
      />
    ));
    const targetInv = this.state.count;
    //{"Doritos Cool Ranch": { "unitCount": "", "caseCount": 0 }}
    const self = this;
    const mainTable = targetInv.map(function(item, i) {
      const key = Object.keys(item)[0];
      return (
        <ViewCountsMainTable
          key={i}
          row={i}
          item={key}
          count={item[key]}
          handleChange={self.onInputChange}
        />
      );
    });
    let submitButton = (
      <input
        type="button"
        className="saveButton"
        value="Change Inventory"
        onClick={this.onSubmit}
      />
    );
    return (
      <div>
        <table className="dateNavTable">
          <thead>
            <tr>
              <th>Inventory Dates</th>
            </tr>
          </thead>
          <tbody>{dateNavTable}</tbody>
        </table>

        <table className="mainTable">
          <thead>
            <tr>
              <th>Item</th>
              <th>Unit Count</th>
              <th>Case Count</th>
            </tr>
          </thead>
          <tbody>{mainTable}</tbody>
        </table>
        {submitButton}
      </div>
    );
  }
}
function invToArray(inv) {
  let arr = [];
  for (let item in inv) {
    arr.push({ [item]: inv[item] });
  }
  return arr;
}
function invArrToObj(inv) {
  let obj = {};
  inv.forEach(function(item) {
    const key = Object.keys(item)[0];
    obj[item] = item[key];
  });
  return obj;
}
function sortInventoryDates(inventories) {
  return Object.keys(inventories)
    .map(num => Number(num))
    .sort(function(a, b) {
      return b - a;
    });
}
export default ViewCounts;
