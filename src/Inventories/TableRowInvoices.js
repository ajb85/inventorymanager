import React, { Component } from "react";
//<TableRowNewInv key={i} rowNum={i} rowData={row} totalRows={savedData.length}
/*renamedObj.item = rowData[0];
renamedObj.measurement = rowData[1];
renamedObj.upc = rowData[2];
renamedObj.cost = rowData[3];
renamedObj.price = rowData[4];*/
class TableRowNewInvoices extends Component {
  render() {
    let generatedJSX = [];
    console.log(this.props.countValue);
    generatedJSX.push(
      <tr className="alternateHighlight">
        <td className="restrictWidth">{this.props.rowData.item}</td>
        <td>{this.props.rowData.measurement}</td>
        <td>
          <input
            type="number"
            onChange={this.props.onChange.onCountChange.bind(
              this,
              this.props.rowData.item
            )}
            className="inputListSm"
            value={this.props.countValue.item}
          />
        </td>
        <td>
          $<input
            type="number"
            tabIndex="-1"
            value={this.props.rowData.cost}
            className={["inputListSm", "clickToEdit"].join(" ")}
            onChange={this.props.onChange.onPriceChange.bind(
              this,
              this.props.rowIndex,
              "cost"
            )}
          />
        </td>
      </tr>
    );
    return generatedJSX;
  }
}

export default TableRowNewInvoices;
