import React, { Component } from "react";
import logo from "../imgs/logo.png";
import ProductList from "./ProductList.js";
import NewInventory from "./NewInventory.js";
import InputInvoice from "./InputInvoice.js";
import Volume from "./Volume.js";
//<img src={logo} className="logo" alt="logo" />
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
class InvHeader extends Component {
  render() {
    return (
      <header className="header">
        <span className="headerLinks">
          <nav className="title">
            Reports
            <ul className="dropdown">
              <li className="navList">Usage</li>
              <li className="navList">Waste</li>
              <li className="navList">Projection</li>
            </ul>
          </nav>
          <nav className="title">
            Inventories
            <ul className="dropdown">
              <li
                className="navList"
                onClick={this.props.loadNewPage.bind(
                  this,
                  <NewInventory
                    productList={this.props.fetched.productList}
                    volumes={this.props.fetched.volumes}
                    inventories={this.props.fetched.inventories}
                    loadNewPage={this.props.loadNewPage.bind(this)}
                  />
                )}
              >
                New Count
              </li>
              <li
                className="navList"
                onClick={this.props.loadNewPage.bind(
                  this,
                  <Volume
                    startDate={new Date(year, month, 1)}
                    endDate={new Date(year, month + 1, 0)}
                    volumes={this.props.fetched.volumes}
                  />
                )}
              >
                Occupancy
              </li>
              <li
                className="navList"
                onClick={this.props.loadNewPage.bind(
                  this,
                  <InputInvoice productList={this.props.fetched.productList} />
                )}
              >
                Input Invoices
              </li>
              <li
                className="navList"
                onClick={this.props.loadNewPage.bind(
                  this,
                  <ProductList
                    productList={this.props.fetched.productList}
                    updateList={this.props.updateList}
                  />
                )}
              >
                Product List
              </li>
            </ul>
          </nav>
        </span>
      </header>
    );
  }
}

export default InvHeader;
