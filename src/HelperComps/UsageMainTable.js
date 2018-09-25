import React, { Component } from "react";

class UsageMainTable extends Component {
  render() {
    //console.log("props: ", this.props);
    let prevUnitCount,
      prevCaseCount,
      invoiceCount,
      newUnitCount,
      newCaseCount,
      unitsPerCase,
      pricePerUnit;
    //Verify input exists, if not call it 0
    const inventories = this.props.inventories;
    const item = this.props.product.item;
    const invoices = this.props.invoices;

    if (inventories[1] && inventories[1][item]) {
      prevUnitCount = Number(inventories[1][item].unitCount);
      prevCaseCount = Number(inventories[1][item].caseCount);
    } else {
      console.log(`Did not find ${item} in previous inventory`);
      prevUnitCount = 0;
      prevCaseCount = 0;
    }
    //invoices should be forEach
    if (invoices[0] && invoices[item]) {
      invoiceCount = Number(invoices[0][item]);
    } else {
      //console.log(`Did not find ${item} in invoice`);
      invoiceCount = 0;
    }
    if (inventories[0] && inventories[0][item]) {
      newUnitCount = Number(inventories[0][item].unitCount);
      newCaseCount = Number(inventories[0][item].caseCount);
    } else {
      console.log(`Did not find ${item} in target inventory`);
      newUnitCount = 0;
      newCaseCount = 0;
    }
    unitsPerCase = Number(this.props.product.upc);
    pricePerUnit = Number(this.props.product.price);

    //Inventory specific calculations
    //Usage = What you started with (previous inv count) + what you bought
    // - what you ended with (latest inv count)
    const si = prevUnitCount + prevCaseCount * unitsPerCase;
    const received = invoiceCount * unitsPerCase;
    const ei = newUnitCount + newCaseCount * unitsPerCase;
    const usage = si + received - ei;
    let usage$, upv;
    if (unitsPerCase && unitsPerCase > 0) {
      usage$ = (
        (usage / unitsPerCase) *
        Number(this.props.product.cost)
      ).toFixed(2);
    }
    if (this.props.volume && Number(this.props.volume) > 0) {
      upv = (usage / Number(this.props.volume)).toFixed(2);
    }

    return (
      <tr>
        <td className="restrictWidth">{item}</td>
        <td>{si}</td>
        <td>{received}</td>
        <td>{ei}</td>
        <td>{usage}</td>
        <td>${usage$}</td>
        <td>{upv}</td>
      </tr>
    );
  }
}

export default UsageMainTable;
