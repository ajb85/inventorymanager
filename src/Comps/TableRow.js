import React, { Component } from "react";

class TableRow extends Component {
  render() {
    let row = this.props.rowNum;
    let generatedJSX = [];
    let borderClassNameFirstCell = ["borderRight", "borderLeft"];
    let borderClassName = ["borderRight"];
    let deleteButton = [
      <input
        type="button"
        className="deleteRow"
        value="x"
        onClick={this.props.onDelete.bind(this, row)}
      />
    ];
    if (row === this.props.totalRows - 1) {
      borderClassNameFirstCell.push("underline");
      borderClassName.push("underline");
    }
    generatedJSX.push(
      <tr className="alternateHighlight">
        <td className={borderClassNameFirstCell.join(" ")}>
          <input
            value={this.props.rowData.item}
            type="text"
            className="inputList"
            placeholder="Nutrigrain"
            onChange={this.props.onChange.bind(this, row, "item")}
          />
        </td>
        <td className={borderClassName.join(" ")}>
          <input
            value={this.props.rowData.measurement}
            type="text"
            className="inputListSm"
            placeholder="each"
            onChange={this.props.onChange.bind(this, row, "measurement")}
          />
        </td>
        <td className={borderClassName.join(" ")}>
          <input
            value={this.props.rowData.upc}
            type="number"
            className="inputListSm"
            placeholder="16"
            onChange={this.props.onChange.bind(this, row, "upc")}
          />
        </td>
        <td className={borderClassName.join(" ")}>
          $<input
            value={this.props.rowData.cost}
            type="number"
            className="inputListSm"
            placeholder="20"
            onChange={this.props.onChange.bind(this, row, "cost")}
          />
        </td>
        <td className={borderClassName.join(" ")}>
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
