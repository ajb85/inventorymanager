import React, { Component } from "react";
import logo from "../imgs/logo.png";
import ModifyList from "./ModifyList.js";
import NewInventory from "./NewInventory.js";
import InputInvoice from "./InputInvoice.js";

class InvHeader extends Component {
  render() {
    return (
      <header className="header">
        <img src={logo} className="logo" alt="logo" />
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
                onClick={this.props.callback.bind(
                  this,
                  <NewInventory currentList={this.props.currentList} />
                )}
              >
                New Count
              </li>
              <li className="navList">Past Counts</li>
              <li
                className="navList"
                onClick={this.props.callback.bind(
                  this,
                  <InputInvoice currentList={this.props.currentList} />
                )}
              >
                Input Invoices
              </li>
              <li
                className="navList"
                onClick={this.props.callback.bind(
                  this,
                  <ModifyList
                    currentList={this.props.currentList}
                    updateList={this.props.updateList}
                  />
                )}
              >
                Modify List
              </li>
            </ul>
          </nav>
        </span>
      </header>
    );
  }
}

export default InvHeader;
