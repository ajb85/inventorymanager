import React, { Component } from "react";
import UsageSmTable from "../HelperComps/DateNav.js";
import UsageMainTable from "../HelperComps/UsageMainTable.js";

class Usage extends Component {
  constructor(props) {
    super(props);
    /*this.state = {
      invDates: { target: "1537156800000", previous: "1536552000000" },
      invoiceDates: ["1536811200000"]
    };*/
    this.getInvAndInvoiceDates = this.getInvAndInvoiceDates.bind(this);
  }
  componentDidMount() {
    this.getInvAndInvoiceDates();
  }
  getInvAndInvoiceDates(target) {
    let inventories = this.props.inventories;
    let invoices = this.props.invoices;
    //console.log("target: ", target);
    //console.log("props: ", inventories, invoices);
    let datesOI = {};
    const orderedDates = sortInventoryDates(inventories);
    if (target) {
      target = Number(target);
      const previous = Number(
        orderedDates[orderedDates.indexOf(Number(target)) + 1]
      );
      datesOI.invDates = { target, previous };
    } else {
      datesOI.invDates = { target: orderedDates[0], previous: orderedDates[1] };
    }
    datesOI.invoiceDates = getInvDates(datesOI.invDates, invoices);

    this.setState({
      invDates: datesOI.invDates,
      invoiceDates: datesOI.invoiceDates
    });
  }
  render() {
    let tableDates, mainTable;
    if (this.state && this.state.invDates && this.state.invoiceDates) {
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
      const inventoryDates = sortInventoryDates(this.props.inventories);
      const self = this;
      tableDates = inventoryDates
        .splice(0, inventoryDates.length - 1)
        .map(function(date, i) {
          return (
            <UsageSmTable date={date} onClick={self.getInvAndInvoiceDates} />
          );
        });
      mainTable = this.props.productList.map(function(product) {
        return (
          <UsageMainTable
            product={product}
            inventories={invOI}
            invoices={invoicesOI}
            volume={volume}
          />
        );
      });
    }
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
function sortInventoryDates(inventories) {
  return Object.keys(inventories)
    .map(num => Number(num))
    .sort(function(a, b) {
      return b - a;
    });
}
function getInvDates(invDates, invoices) {
  const endDate = invDates.target;
  const startDate = invDates.previous;
  const invoiceDates = Object.keys(invoices);
  return invoiceDates.filter(
    date => Number(date) < Number(endDate) && Number(date) > Number(startDate)
  );
}
function getTotalVolume(volumes, dates) {
  const startDate = Number(dates.previous);
  const endDate = Number(dates.target);
  let sum = 0;

  for (let day in volumes) {
    day = Number(day);
    if (day >= startDate && day < endDate) {
      sum += Number(volumes[day.toString()]);
    }
  }
  return sum;
}
export default Usage;
