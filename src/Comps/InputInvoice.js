//This entire file is basically a copy/paste of NewInventory.
//The two files could be merged with minimum effort.
//Long term, TableRow.js could generate all required Tables based
//on props values.

import React, { Component } from "react";
import TableRowInvoices from "./TableRowInvoices.js";

let savedData;
const url = "invoices.json";
const fetchData = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  method: "GET",
  cache: "no-cache"
};

class InputInvoice extends Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.state: {item: {0: "123", 1: "41"}, item2: {}}
  }
  componentDidMount() {
    this.props.currentList.forEach(row =>
      this.setState({ [row.item]: { casePrice: row.cost, oldPrice: row.cost } })
    );
  }
  onInputChange(item, index, event) {
    const updatedField = this.state[item];
    updatedField[index] = event.target.value;
    if (updatedField.casePrice === updatedField.oldPrice) {
      updatedField.changed = 0;
    } else {
      updatedField.changed = 1;
    }
    this.setState({ [item]: updatedField });
  }
  handleSubmit(event) {
    event.preventDefault();
    return false;
  }
  render() {
    const table = this.props.currentList.map((row, i) => (
      <TableRowInvoices
        key={i}
        rowNum={i}
        onChange={this.onInputChange}
        rowData={row}
        totalRows={Object.keys(this.props.currentList.length)}
      />
    ));
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="date" className="currentDate" />
        <table className="newInvTable">
          <thead>
            <tr>
              <th>Item</th>
              <th>Count</th>
              <th>Case Count</th>
              <th>Case Price</th>
            </tr>
          </thead>
          <tbody>{table}</tbody>
        </table>
        <input type="submit" className="submitInvoice" value="Submit Invoice" />
      </form>
    );
  }
}

export default InputInvoice;
