import React, { Component } from "react";
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
  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.rows);
    const stateDidChange = this.arrayOfObjectsDidChange(
      this.state.rows,
      prevState.rows
    );
    const dataWasChanged = this.arrayOfObjectsDidChange(
      this.state.rows,
      this.props.currentList
    );
    if (dataWasChanged && stateDidChange) {
      this.setState({ changed: true });
    } else if (stateDidChange && !dataWasChanged) {
      this.setState({ changed: false });
    }
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
  addGhostRow() {
    let style = { fontStyle: "italic" };
    return (
      <tr onClick={this.addRow}>
        <td colspan="5" className="ghostRow">
          ↓ <span style={style}>Add Row</span> ↓
        </td>
      </tr>
    );
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
  //Returns "true" if the two arrays are different
  //"false" if the content and order are the same
  arrayOfObjectsDidChange(newArr, oldArr) {
    let changed = false;
    newArr.forEach(function(obj, i) {
      //If oldArr doesn't exist, then there's a new row
      //in newArr, therefore there's been a change,
      // return true;
      if (oldArr[i]) {
        //Check both objects to see if their key:value
        //pairs are the same.
        for (var key in obj) {
          if (obj[key] !== oldArr[i][key]) {
            changed = true;
          }
        }
      } else {
        changed = true;
      }
    });
    //If the order and all the values of the objects
    //are the same, changed = false
    return changed;
  }

  render() {
    let saveButton;
    if (this.state && this.state.changed) {
      saveButton = (
        <input className="saveButton" value="Save Changes" type="submit" />
      );
    }
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
    table.push(this.addGhostRow());

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="saveButtonDiv">{saveButton}</div>
          <table className="inputTable">
            <thead className="tableHeader">
              <tr>
                <th>Unit</th>
                <th>Measurement</th>
                <th>Units / Case</th>
                <th>Case Cost</th>
                <th>Unit Sell Price</th>
              </tr>
            </thead>
            <tbody>{table}</tbody>
          </table>
        </form>
      </div>
    );
  }
}
export default ModifyList;
