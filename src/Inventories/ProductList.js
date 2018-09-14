import React, { Component } from "react";
import TableRow from "./TableRow";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.addRow = this.addRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      rows: this.props.productList
    };
  }
  componentDidUpdate(prevProps, prevState) {
    //Check to see if both the state was changed && if the data is different
    //from props.  Both are needed to prevent an infinite loop.  If just
    //state is checked, it'll see the state is different and refresh constantly
    //if just the data is checked, it'll refresh infinitely since once the
    //input differs from what's saved, dataWasChanged will always be true.
    const stateDidChange = this.didInputChange(prevState.rows);
    const dataWasChanged = this.didInputChange(this.props.productList);
    if (dataWasChanged && stateDidChange) {
      this.setState({ changed: true });
    } else if (stateDidChange && !dataWasChanged) {
      this.setState({ changed: false });
    }
  }
  //Returns "true" if the two arrays are different
  //"false" if the content and order are the same
  didInputChange(oldState) {
    const newState = this.state.rows;
    let changed = false;
    newState.forEach(function(obj, i) {
      //If oldState doesn't exist, then there's a new row
      //in newState, therefore there's been a change,
      // return true;
      if (oldState[i]) {
        //Check both objects to see if their key:value
        //pairs are the same.
        for (var key in obj) {
          if (obj[key] !== oldState[i][key]) {
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
        ...this.state.rows.slice(rowIndex + 1)
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
        <td colSpan="5" className="ghostRow">
          ↓ <span style={style}>Add Row</span> ↓
        </td>
      </tr>
    );
  }
  onSubmit(event) {
    event.preventDefault();
    let updateList = this.props.updateList;
    //POST fetch to update server file under username with name+link
    const saveFileURL = "./saveInvData.php";
    var fetchData = {
      method: "POST",
      body: JSON.stringify([this.state.rows, "productList"]),
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
export default ProductList;
