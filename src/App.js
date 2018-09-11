import React, { Component } from "react";
import "./css/invmgr.css";
import "./css/table.css";
import InvHeader from "./Comps/InvHeader.js";
import AppIndex from "./Comps/AppIndex.js";
//import Volume from "./Comps/Volume.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.updateStateCallback = this.updateStateCallback.bind(this);
    this.fetchUserData = this.fetchUserData.bind(this);
    this.changePage = this.changePage.bind(this);
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
    */
    //Live server code
    const saveFileURL = "./loadInvData.php";
    const filesToFetch = ["productList", "volumes", "inventories"];
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
    //
  }

  changePage(newPage) {
    this.setState({ page: newPage });
  }
  render() {
    const pageToLoad = this.state.page;
    const header = (
      <InvHeader
        loadNewPage={this.changePage}
        fetched={this.state.fetched}
        updateList={this.fetchUserData}
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
/*
//Local test Data
const localVolume = {
  "1545886800000": 85,
  "1545973200000": 8,
  "1546059600000": 74,
  "1546232400000": 53,
  "1546318800000": 36,
  "1546405200000": 53,
  "1546491600000": 85,
  "1546578000000": 11,
  "1546664400000": 42,
  "1546750800000": 4,
  "1546837200000": 28,
  "1546923600000": 23,
  "1547010000000": 38,
  "1547096400000": 4,
  "1547182800000": 88,
  "1547269200000": 33,
  "1547355600000": 43,
  "1547442000000": 69,
  "1547528400000": 92,
  "1547614800000": 76
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
  },
  {
    item: "Gardettos",
    measurement: "bag",
    upc: "1",
    cost: ".65",
    price: "1.87"
  },
  { item: "Ruffles", measurement: "bag", upc: "1", cost: ".65", price: "1.87" },
  {
    item: "Ruffles Sour Cream/Chedder",
    measurement: "bag",
    upc: "1",
    cost: ".65",
    price: "1.87"
  },
  { item: "Cheetos", measurement: "bag", upc: "1", cost: ".65", price: "1.87" },
  {
    item: "Cheetos Flaming Hot",
    measurement: "bag",
    upc: "1",
    cost: ".65",
    price: "1.87"
  },
  { item: "Fritos", measurement: "bag", upc: "1", cost: ".65", price: "1.87" },
  {
    item: "Slim Jim Mild",
    measurement: "stick",
    upc: "24",
    cost: "22.77",
    price: "1.87"
  },
  {
    item:
      "ZXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    measurement: "stick",
    upc: "24",
    cost: "22.77",
    price: "1.87"
  }
];
const localInventory = {
  "1535083200000": {
    "Doritos Cool Ranch": { unitCount: "6" },
    "Doritos Nacho Cheese": { unitCount: "11" },
    "Baked Lays": { unitCount: "12" },
    "BBQ Lays": { unitCount: "5" },
    "Sun Chips Harvest Chedder": { unitCount: "32" },
    "SmartFood Popcorn": { unitCount: "2", caseCount: "" },
    "Rold Gold Pretzels": { unitCount: "4" },
    Gardettos: { unitCount: "5" },
    Ruffles: { unitCount: "10" },
    "Ruffles Sour Cream/Chedder": { unitCount: "32" },
    Cheetos: { unitCount: "1" },
    "Cheetos Flaming Hot": { unitCount: "14" },
    Fritos: { unitCount: "13" }
  },
  "1534478400000": {
    "Doritos Cool Ranch": { unitCount: "6" },
    "Doritos Nacho Cheese": { unitCount: "11" },
    "Baked Lays": { unitCount: "12" },
    "BBQ Lays": { unitCount: "5" },
    "Sun Chips Harvest Chedder": { unitCount: "32" },
    "SmartFood Popcorn": { unitCount: "2", caseCount: "" },
    "Rold Gold Pretzels": { unitCount: "4" },
    Gardettos: { unitCount: "5" },
    Ruffles: { unitCount: "10" },
    "Ruffles Sour Cream/Chedder": { unitCount: "32" },
    Cheetos: { unitCount: "1" },
    "Cheetos Flaming Hot": { unitCount: "14" },
    Fritos: { unitCount: "13" }
  }
};
*/
