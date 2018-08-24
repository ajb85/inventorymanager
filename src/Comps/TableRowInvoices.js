import React, { Component } from "react";
//<TableRowNewInv key={i} rowNum={i} rowData={row} totalRows={savedData.length}
/*renamedObj.item = rowData[0];
renamedObj.measurement = rowData[1];
renamedObj.upc = rowData[2];
renamedObj.cost = rowData[3];
renamedObj.price = rowData[4];*/
class TableRowNewInvoices extends Component {
  render() {
    let row = this.props.rowNum;
    let generatedJSX = [];
    let borderClassNameFirstCell = ["borderRight", "borderLeft"];
    let borderClassName = ["borderRight"];

    if (row === this.props.totalRows - 1) {
      borderClassNameFirstCell.push("underline");
      borderClassName.push("underline");
    }

    generatedJSX.push(
      <tr className="alternateHighlight">
        <td className={borderClassNameFirstCell.join(" ")}>
          {this.props.rowData.item}
        </td>
        <td className={borderClassName.join(" ")}>
          {this.props.rowData.measurement}
        </td>
        <td className={borderClassName.join(" ")}>
          <input
            type="number"
            onChange={this.props.onChange.bind(
              this,
              this.props.rowData.item,
              "caseCount"
            )}
            className="inputListSm"
          />
        </td>
        <td className={borderClassName.join(" ")}>
          $<input
            type="number"
            tabIndex="-1"
            defaultValue={this.props.rowData.cost}
            className={["inputListSm", "casePrice"].join(" ")}
            onChange={this.props.onChange.bind(
              this,
              this.props.rowData.item,
              "casePrice"
            )}
          />
        </td>
      </tr>
    );
    return generatedJSX;
  }
}

export default TableRowNewInvoices;
