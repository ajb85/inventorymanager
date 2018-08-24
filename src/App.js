import React, { Component } from "react";
import "./css/invmgr.css";
import InvHeader from "./Comps/InvHeader.js";
import AppIndex from "./Comps/AppIndex.js";
//import NewInventory from "./Comps/NewInventory.js";
//import ModifyList from "./Comps/ModifyList.js";
import InputInvoice from "./Comps/InputInvoice.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.updateListState = this.updateListState.bind(this);
    this.fetchListData = this.fetchListData.bind(this);
    this.changePage = this.changePage.bind(this);
    this.state = {
      page: <AppIndex />
    };
  }
  componentDidMount() {
    this.fetchListData();
  }
  updateListState(data) {
    this.setState({ currentList: data });
  }
  fetchListData() {
    let callback = this.updateListState;
    //Local testing code
    /*
    let currentList = [];
    const url = "modifyList.json";
    const fetchData = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "GET",
      cache: "no-cache"
    };
    fetch(url, fetchData)
      .then(res => res.json())
      .then(function(data) {
        if (data) {
          callback(data);
        } else {
          console.log("Fetched no data");
        }
      });*/
    //Live server code
    const saveFileURL = "./loadInvData.php";
    var fetchData = {
      method: "POST",
      body: "modifyList",
      cache: "no-cache"
    };
    fetch(saveFileURL, fetchData)
      .then(res => res.json())
      .then(data => callback(data));
  }
  changePage(newPage) {
    this.setState({ page: newPage });
  }
  render() {
    let pageToLoad;
    let header;
    if (this.state && this.state.page) {
      pageToLoad = this.state.page;
    }
    if (this.state && this.state.currentList) {
      header = (
        <InvHeader
          callback={this.changePage}
          currentList={this.state.currentList}
          updateList={this.fetchListData}
        />
      );
    }
    return (
      <div className="App">
        {header}
        {pageToLoad}
      </div>
    );
  }
}

export default App;
