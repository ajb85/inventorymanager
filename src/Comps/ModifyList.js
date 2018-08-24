import React, { Component } from "react";
import "../css/modifyList.css";
import TableRow from "./TableRow";

class ModifyList extends Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.addRow = this.addRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.consoleLog = this.consoleLog.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      rows: this.props.currentList
    };
  }
  componentDidMount() {
    if (!this.state.rows.length) {
      this.addRow();
    }
  }
  deleteRow(row, event) {
    this.setState({ rows: this.state.rows.filter((_, i) => i !== row) });
  }

  onInputChange(rowIndex, field, event) {
    const updatedRow = {
      ...this.state.rows[rowIndex],
      [field]: event.target.value
    };
    this.setState({
      rows: [
        ...this.state.rows.slice(0, rowIndex),
        updatedRow,
        ...this.state.rows.slice(rowIndex + 1, this.state.rows.length)
      ]
    });
  }

  addRow() {
    this.setState({
      rows: [
        ...this.state.rows,
        { item: "", measurement: "", upc: "", cost: "", price: "" }
      ]
    });
  }

  consoleLog() {
    console.log(this.state.rows);
  }

  onSubmit(event) {
    event.preventDefault();
    let updateList = this.props.updateList;
    //POST fetch to update server file under username with name+link
    const saveFileURL = "./saveInvData.php";
    var fetchData = {
      method: "POST",
      body: JSON.stringify([this.state.rows, "modifyList"]),
      cache: "no-cache"
    };
    fetch(saveFileURL, fetchData)
      .then(res => res.text())
      .then(function(data) {
        updateList();
        console.log(data);
      });
    return false;
  }

  render() {
    const table = this.state.rows.map((row, i) => (
      <TableRow
        key={i}
        rowNum={i}
        onChange={this.onInputChange}
        totalRows={this.state.rows.length}
        onDelete={this.deleteRow}
        rowData={row}
      />
    ));

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <table className="inputTable">
            <thead>
              <tr>
                <th
                  className={["borderRight", "underline", "borderLeft"].join(
                    " "
                  )}
                >
                  Unit
                </th>
                <th className={["borderRight", "underline"].join(" ")}>
                  Measurement
                </th>
                <th className={["borderRight", "underline"].join(" ")}>
                  Units / Case
                </th>
                <th className={["borderRight", "underline"].join(" ")}>
                  Case Cost
                </th>
                <th className={["borderRight", "underline"].join(" ")}>
                  Unit Sell Price
                </th>
              </tr>
            </thead>
            <tbody>{table}</tbody>
          </table>
          <input
            type="button"
            className="addRow"
            value="+"
            onClick={this.addRow}
          />
          <br />
          <input type="button" value="Console Log" onClick={this.consoleLog} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
export default ModifyList;
