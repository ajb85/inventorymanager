import React, { Component } from "react";

class UsageSmTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{dateFormat(this.props.date)}</td>
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
  mm = mm - 1;

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return mm + "/" + dd + "/" + yyyy;
}
