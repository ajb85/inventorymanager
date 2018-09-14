//This entire file is basically a copy/paste of NewInventory.
//The two files could be merged with minimum effort.
//Long term, TableRow.js could generate all required Tables based
//on props values.

import React, { Component } from "react";
import TableRowInvoices from "./TableRowInvoices.js";

class InputInvoice extends Component {
  constructor(props) {
    super(props);
    this.onCountChange = this.onCountChange.bind(this);
    this.onPriceChange = this.onPriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.state = {
      productList: this.props.productList,
      date: getTodaysDate()
    };
  }
  componentDidMount() {
    let caseCount = {};
    this.state.productList.forEach(function(product) {
      caseCount[product.item] = "";
    });
    this.setState({ caseCount: caseCount });
  }
  onCountChange(item, event) {
    let newCount = JSON.parse(JSON.stringify(this.state.caseCount));
    newCount[item] = event.target.value;
    this.setState({ caseCount: Object.assign({}, newCount) });
  }
  onPriceChange(index, key, event) {
    let updatedPrice = {
      ...this.state.productList[index],
      [key]: event.target.value
    };
    this.setState({
      productList: [
        ...this.state.productList.splice(0, index),
        updatedPrice,
        ...this.state.productList.splice(index + 1)
      ]
    });
  }
  onDateChange(event) {
    this.setState({ date: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const time = stringToDate(this.state.date).getTime();
    const countData = { [time]: this.state.caseCount };
    //POST fetch to update server file under username with name+link
    const saveFileURL = "./saveInvData.php";
    var allFetchData = [
      {
        method: "POST",
        body: JSON.stringify([countData, "invoices"]),
        cache: "no-cache"
      },
      {
        method: "POST",
        body: JSON.stringify([this.state.productList, "productList"]),
        cache: "no-cache"
      }
    ];
    allFetchData.forEach(fetchData =>
      fetch(saveFileURL, fetchData)
        .then(res => res.text())
        .then(data => console.log("data: ", data))
    );
    this.props.functions.onDataSubmitted();
    return false;
  }
  render() {
    console.log(this.state);
    let table;
    const onChange = {
      onCountChange: this.onCountChange,
      onPriceChange: this.onPriceChange
    };
    if (this.state && this.state.caseCount) {
      table = this.state.productList.map((row, i) => (
        <TableRowInvoices
          rowIndex={i}
          onChange={onChange}
          rowData={row}
          countValue={this.state.caseCount}
        />
      ));
    }
    return (
      <form onSubmit={this.handleSubmit} className="submitForm">
        <input
          type="date"
          className="currentDate"
          value={this.state.date}
          onChange={this.onDateChange}
        />
        <table className="inputTable">
          <thead className="tableHeader">
            <tr>
              <th>Item</th>
              <th>Count</th>
              <th>Case Count</th>
              <th>Case Price</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>
        </table>
        <input type="submit" className="submitButton" value="Submit Invoice" />
      </form>
    );
  }
}

export default InputInvoice;

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
function stringToDate(stringDate) {
  let year = Number(stringDate.substring(0, 4));
  let month = Number(stringDate.substring(5, 7)) - 1;
  let day = Number(stringDate.substring(8));
  return new Date(year, month, day);
}
