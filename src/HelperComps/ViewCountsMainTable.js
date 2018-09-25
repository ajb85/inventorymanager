import React, { Component } from "react";

class UsageMainTable extends Component {
  render() {
    const row = this.props.row;
    const item = this.props.item;
    const unitCount = this.props.count.unitCount;
    const caseCount = this.props.count.caseCount;

    return (
      <tr>
        <td>
          <input
            className={["inputList", "clickToEdit"].join(" ")}
            type="text"
            value={item}
            onChange={this.props.handleChange.bind(this, row, "")}
          />
        </td>
        <td>
          <input
            className={["inputListSm", "clickToEdit"].join(" ")}
            type="number"
            value={unitCount}
            onChange={this.props.handleChange.bind(this, row, "unitCount")}
          />
        </td>
        <td>
          <input
            className={["inputListSm", "clickToEdit"].join(" ")}
            type="number"
            value={caseCount}
            onChange={this.props.handleChange.bind(this, row, "caseCount")}
          />
        </td>
      </tr>
    );
  }
}

export default UsageMainTable;
