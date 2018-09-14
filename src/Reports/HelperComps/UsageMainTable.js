import React, { Component } from "react";

/*
<td>Item</td>
<td>Starting Inventory</td>
<td>SI $</td>
<td>Invoices</td>
<td>Invoices $</td>
<td>Ending Inventory</td>
<td>EI $</td>
<td>Usage</td>
<td>Usage $</td>
<td>UP%</td>
*/
class UsageMainTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const si =
      Number(this.props.inventories[1][this.props.product.item].unitCount) +
      Number(this.props.inventories[1][this.props.product.item].caseCount) *
        Number(this.props.product.upc);
    const invoices =
      Number(this.props.invoices[0][this.props.product.item]) *
      Number(this.props.product.upc);
    const ei =
      Number(this.props.inventories[0][this.props.product.item].unitCount) +
      Number(this.props.inventories[0][this.props.product.item].caseCount) *
        Number(this.props.product.upc);
    const usage = si + invoices - ei;
    const usage$ = (usage * Number(this.props.product.cost)).toFixed(2);
    const upp = (usage / Number(this.props.volume)).toFixed(4);
    return (
      <tr>
        <td className="restrictWidth">{this.props.product.item}</td>
        <td>{si}</td>
        <td>{invoices}</td>
        <td>{ei}</td>
        <td>{usage}</td>
        <td>${usage$}</td>
        <td>{upp}</td>
      </tr>
    );
  }
}

export default UsageMainTable;
