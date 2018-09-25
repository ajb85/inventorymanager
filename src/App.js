import React, { Component } from "react";
import "./css/invmgr.css";
import "./css/table.css";
import "./css/reports.css";
import InvHeader from "./InvHeader.js";
import AppIndex from "./Inventories/AppIndex.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.updateStateCallback = this.updateStateCallback.bind(this);
    this.fetchUserData = this.fetchUserData.bind(this);
    this.changePage = this.changePage.bind(this);
    this.onDataSubmitted = this.onDataSubmitted.bind(this);
    this.state = {
      page: <AppIndex />,
      fetched: {}
    };
  }
  componentDidMount() {
    this.fetchUserData();
  }
  updateStateCallback(state, data) {
    const newFetched = this.state.fetched;
    newFetched[state] = data;
    this.setState({ fetched: newFetched });
  }
  fetchUserData() {
    let callback = this.updateStateCallback;
    /*
    //Local testing code
    callback("productList", localList);
    callback("volumes", localVolume);
    callback("inventories", localInventory);
    callback("invoices", invoices);
    /*/
    //Live server code
    const saveFileURL = "./loadInvData.php";
    const filesToFetch = ["productList", "volumes", "inventories", "invoices"];
    filesToFetch.forEach(function(file) {
      const fetchData = {
        method: "POST",
        body: file,
        cache: "no-cache"
      };
      fetch(saveFileURL, fetchData)
        .then(res => res.json())
        .then(data => callback(file, data));
    });
    //*/
  }
  onDataSubmitted() {
    this.fetchUserData();
  }
  changePage(newPage) {
    this.setState({ page: newPage });
  }
  render() {
    const functions = { onDataSubmitted: this.onDataSubmitted };
    const pageToLoad = this.state.page;
    const header = (
      <InvHeader
        loadNewPage={this.changePage}
        fetched={this.state.fetched}
        updateList={this.fetchUserData}
        functions={functions}
      />
    );

    return (
      <div className="App">
        {header}
        {pageToLoad}
      </div>
    );
  }
}

export default App;
///*
//Local test Data
const localInventory = {
  "1537156800000": {
    "Doritos Cool Ranch": { unitCount: "1", caseCount: "1" },
    "Doritos Nacho Cheese": { unitCount: "1", caseCount: "1" },
    "Baked Lays": { unitCount: "1", caseCount: "1" },
    "BBQ Lays": { unitCount: "1", caseCount: "1" },
    "Sun Chips Harvest Chedder": { unitCount: "1", caseCount: "1" },
    "SmartFood Popcorn": { unitCount: "1", caseCount: "1" },
    "Rold Gold Pretzels": { unitCount: "1", caseCount: "1" }
  },
  "1536552000000": {
    "Doritos Cool Ranch": { unitCount: "3", caseCount: "3" },
    "Doritos Nacho Cheese": { unitCount: "3", caseCount: "3" },
    "Baked Lays": { unitCount: "3", caseCount: "3" },
    "BBQ Lays": { unitCount: "3", caseCount: "3" },
    "Sun Chips Harvest Chedder": { unitCount: "3", caseCount: "3" },
    "SmartFood Popcorn": { unitCount: "3", caseCount: "3" },
    "Rold Gold Pretzels": { unitCount: "3", caseCount: "3" }
  }
};
let localVolume = {
  "1535774400000": "45",
  "1535860800000": "45",
  "1535947200000": "45",
  "1536033600000": "45",
  "1536120000000": "45",
  "1536206400000": "45",
  "1536292800000": "45",
  "1536379200000": "45",
  "1536465600000": "45",
  "1536552000000": "45",
  "1536638400000": "45",
  "1536724800000": "45",
  "1536811200000": "45",
  "1536897600000": "45",
  "1536984000000": "45",
  "1537070400000": "45",
  "1537156800000": "45",
  "1537243200000": "45",
  "1537329600000": "45",
  "1537416000000": "45",
  "1537502400000": "45",
  "1537588800000": "45",
  "1537675200000": "54",
  "1537761600000": "45",
  "1537848000000": "45",
  "1537934400000": "4",
  "1538020800000": "54",
  "1538107200000": "54",
  "1538193600000": "54",
  "1538280000000": "54",
  "1538366400000": ""
};
let invoices = {
  "1536811200000": {
    "Doritos Cool Ranch": "1",
    "Doritos Nacho Cheese": "1",
    "Baked Lays": "1",
    "BBQ Lays": "1",
    "Sun Chips Harvest Chedder": "1",
    "SmartFood Popcorn": "1",
    "Rold Gold Pretzels": "1"
  }
};
const localList = [
  {
    item: "Doritos Cool Ranch",
    measurement: "bag",
    upc: "1",
    cost: ".65",
    price: "1.87"
  },
  {
    item: "Doritos Nacho Cheese",
    measurement: "bag",
    upc: "1",
    cost: ".65",
    price: "1.87"
  },
  {
    item: "Baked Lays",
    measurement: "bag",
    upc: "1",
    cost: ".65",
    price: "1.87"
  },
  {
    item: "BBQ Lays",
    measurement: "bag",
    upc: "1",
    cost: ".65",
    price: "1.87"
  },
  {
    item: "Sun Chips Harvest Chedder",
    measurement: "bag",
    upc: "1",
    cost: ".65",
    price: "1.87"
  },
  {
    item: "SmartFood Popcorn",
    measurement: "bag",
    upc: "1",
    cost: ".65",
    price: "1.87"
  },
  {
    item: "Rold Gold Pretzels",
    measurement: "bag",
    upc: "1",
    cost: ".65",
    price: "1.87"
  }
];
//*/
