import React, { Component } from "react";

class UsageSmTable extends Component {
  //Requires onClick prop to determine which date to load.
  //Plus a date prop to populate the cell
  render() {
    return (
      <tr>
        <td onClick={this.props.onClick.bind(this, Number(this.props.date))}>
          {dateFormat(this.props.date)}
        </td>
      </tr>
    );
  }
}

export default UsageSmTable;

function dateFormat(dateEpoch) {
  const date = new Date(Number(dateEpoch));
  let mm = date.getMonth();
  const yyyy = date.getFullYear();
  let dd = date.getDate();
  mm++;

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return mm + "/" + dd + "/" + yyyy;
}
