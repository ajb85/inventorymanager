import React, { Component } from "react";
import UsageSmTable from "./HelperComps/UsageSmTable.js";
import UsageMainTable from "./HelperComps/UsageMainTable.js";

class Usage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invDates: { target: "1537156800000", previous: "1536552000000" },
      invoiceDates: ["1536811200000"]
    };
  }

  render() {
    const invoices = this.props.invoices;
    const volumes = this.props.volumes;
    const invOI = [
      this.props.inventories[this.state.invDates.target],
      this.props.inventories[this.state.invDates.previous]
    ];
    //Should be one column for each invoice.  Eventually I'll need a comp to
    //generate the number of columns based on the number of invoices for the week.
    const invoicesOI = this.state.invoiceDates.map(function(date) {
      return invoices[date];
    });
    const volume = getTotalVolume(this.props.volumes, this.state.invDates);
    const inventoryDates = Object.keys(this.props.inventories);
    const tableDates = inventoryDates.map(function(date) {
      return <UsageSmTable date={date} />;
    });
    const mainTable = this.props.productList.map(function(product) {
      return (
        <UsageMainTable
          product={product}
          inventories={invOI}
          invoices={invoicesOI}
          volume={volume}
        />
      );
    });
    return (
      <div>
        <table className="dateNavTable">
          <thead>
            <tr>
              <th>Inventory Dates</th>
            </tr>
          </thead>
          <tbody>{tableDates}</tbody>
        </table>
        <table className="mainTable">
          <thead>
            <tr>
              <th>Item</th>
              <th>Starting Inventory</th>
              <th>Invoices</th>
              <th>Ending Inventory</th>
              <th>Usage</th>
              <th>Usage $</th>
              <th>UPO</th>
            </tr>
          </thead>
          <tbody>{mainTable}</tbody>
        </table>
      </div>
    );
  }
}
function getTotalVolume(volumes, dates) {
  const startDate = Number(dates.previous);
  const endDate = Number(dates.target);
  let sum = 0;

  for (let day in volumes) {
    day = Number(day);
    if (day >= startDate && day < endDate) {
      console.log(true);
      sum += Number(volumes[day.toString()]);
    }
  }
  return sum;
}
export default Usage;
