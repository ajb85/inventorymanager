import React, { Component } from "react";
//<TableRowNewInv key={i} rowNum={i} rowData={row} totalRows={savedData.length}
/*renamedObj.item = rowData[0];
renamedObj.measurement = rowData[1];
renamedObj.upc = rowData[2];
renamedObj.cost = rowData[3];
renamedObj.price = rowData[4];*/
class TableRowInvoices extends Component {
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
              "unitCount"
            )}
            className="inputListSm"
          />
        </td>
        <td className={borderClassName.join(" ")}>
          <input
            type="number"
            className="inputListSm"
            onChange={this.props.onChange.bind(
              this,
              this.props.rowData.item,
              "caseCount"
            )}
          />
        </td>
      </tr>
    );
    return generatedJSX;
  }
}

export default TableRowInvoices;