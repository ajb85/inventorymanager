import React, { Component } from "react";
//<TableRowNewInv key={i} rowNum={i} rowData={row} totalRows={savedData.length}

class TableRowNewInv extends Component {
  render() {
    let generatedJSX = [];
    const key = "newInv" + this.props.rowNum.toString();
    generatedJSX.push(
      <tr className="alternateHighlight" key={key + "TR"}>
        <td className="restrictWidth">{this.props.rowData.item}</td>
        <td key={key + "TD1"}>{this.props.rowData.measurement}</td>
        <td key={key + "TD2"}>
          <input
            key={key + "INPUT1"}
            value={this.props.invData[this.props.rowData.item].unitCount}
            type="number"
            onChange={this.props.onChange.bind(
              this,
              this.props.rowData.item,
              "unitCount"
            )}
            className="inputListSm"
          />
        </td>
        <td key={key + "TD3"}>
          <input
            key={key + "INPUT2"}
            value={this.props.invData[this.props.rowData.item].caseCount}
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

export default TableRowNewInv;
