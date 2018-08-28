import React, { Component } from "react";

class TableRow extends Component {
  render() {
    let row = this.props.rowNum;
    let generatedJSX = [];
    let deleteButton = [
      <input
        type="button"
        className="deleteRow"
        value="x"
        onClick={this.props.onDelete.bind(this, row)}
      />
    ];
    generatedJSX.push(
      <tr className="alternateHighlight">
        <td className="borderRight">
          <input
            value={this.props.rowData.item}
            type="text"
            className="inputList"
            placeholder="Nutrigrain"
            onChange={this.props.onChange.bind(this, row, "item")}
          />
        </td>
        <td className="borderRight">
          <input
            value={this.props.rowData.measurement}
            type="text"
            className="inputListSm"
            placeholder="each"
            onChange={this.props.onChange.bind(this, row, "measurement")}
          />
        </td>
        <td className="borderRight">
          <input
            value={this.props.rowData.upc}
            type="number"
            className="inputListSm"
            placeholder="16"
            onChange={this.props.onChange.bind(this, row, "upc")}
          />
        </td>
        <td className="borderRight">
          $<input
            value={this.props.rowData.cost}
            type="number"
            className="inputListSm"
            placeholder="20"
            onChange={this.props.onChange.bind(this, row, "cost")}
          />
        </td>
        <td className="borderRight">
          $<input
            value={this.props.rowData.price}
            type="number"
            className="inputListSm"
            placeholder="1.50"
            onChange={this.props.onChange.bind(this, row, "price")}
          />
          {deleteButton}
        </td>
      </tr>
    );
    return generatedJSX;
  }
}

export default TableRow;
