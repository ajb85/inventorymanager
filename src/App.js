import React, { Component } from "react";
import "./css/invmgr.css";
import "./css/table.css";
import InvHeader from "./Comps/InvHeader.js";
import AppIndex from "./Comps/AppIndex.js";
//import NewInventory from "./Comps/NewInventory.js";
//import ModifyList from "./Comps/ModifyList.js";
//import InputInvoice from "./Comps/InputInvoice.js";
import Volume from "./Comps/Volume.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.updateListState = this.updateListState.bind(this);
    this.fetchListData = this.fetchListData.bind(this);
    this.changePage = this.changePage.bind(this);
    this.state = {
      page: <Volume startDate={new Date(2018, 11, 27)} days={21} />
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
    callback(localData);
    //Live server code
    /*
    const saveFileURL = "./loadInvData.php";
    var fetchData = {
      method: "POST",
      body: "modifyList",
      cache: "no-cache"
    };
    fetch(saveFileURL, fetchData)
      .then(res => res.json())
      .then(data => callback(data));
*/
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

//Local test Code
const localData = [
  {
    item: "Planter's Peanuts",
    measurement: "bag",
    upc: "18",
    cost: "",
    price: "1.87"
  },
  {
    item: "Slim Jims",
    measurement: "stick",
    upc: "24",
    cost: "",
    price: "1.87"
  },
  {
    item: "Orbit Gum",
    measurement: "pack",
    upc: "12",
    cost: "",
    price: "1.87"
  },
  { item: "Mentos", measurement: "roll", upc: "15", cost: "", price: "1.87" },
  {
    item: "Keebler Crackers",
    measurement: "packet",
    upc: "12",
    cost: "",
    price: "1.4"
  },
  {
    item: "Aviator Playing Cards",
    measurement: "deck",
    upc: "15",
    cost: "",
    price: "4.67"
  },
  { item: "Ruffles", measurement: "bag", upc: "1", cost: "", price: "1.4" },
  { item: "Lays", measurement: "bag", upc: "1", cost: "", price: "1.4" },
  {
    item: "SmartFood Popcorn",
    measurement: "bag",
    upc: "1",
    cost: "",
    price: "1.4"
  },
  { item: "Sun Chips", measurement: "bag", upc: "1", cost: "", price: "1.4" },
  { item: "Doritos", measurement: "bag", upc: "1", cost: "", price: "1.4" },
  { item: "Gardetto's", measurement: "bag", upc: "1", cost: "", price: "1.4" },
  { item: "Pretzels", measurement: "bag", upc: "1", cost: "", price: "1.4" },
  { item: "Cheetos", measurement: "bag", upc: "1", cost: "", price: "1.4" },
  { item: "Pop Tarts", measurement: "pack", upc: "6", cost: "", price: "1.87" },
  { item: "Payday", measurement: "bar", upc: "", cost: "", price: "1.87" },
  {
    item: "Bufferfinger",
    measurement: "bar",
    upc: "36",
    cost: "",
    price: "1.87"
  },
  {
    item: "Starburst",
    measurement: "pack",
    upc: "36",
    cost: "",
    price: "1.87"
  },
  { item: "Skittles", measurement: "bag", upc: "36", cost: "", price: "1.87" },
  { item: "Twizzlers", measurement: "pack", upc: "", cost: "", price: "1.87" },
  { item: "Milky Way", measurement: "bar", upc: "", cost: "", price: "1.87" },
  {
    item: "Nature's Valley",
    measurement: "bar",
    upc: "16",
    cost: "",
    price: "1.87"
  },
  { item: "Nutrigrain", measurement: "bar", upc: "16", cost: "", price: "1.4" },
  { item: "Hershey's", measurement: "bar", upc: "36", cost: "", price: "1.87" },
  { item: "Reese's", measurement: "pack", upc: "", cost: "", price: "1.87" },
  { item: "Kit Kat", measurement: "bar", upc: "36", cost: "", price: "1.87" },
  { item: "M&Ms", measurement: "pack", upc: "36", cost: "", price: "1.87" },
  {
    item: "M&Ms Peanut",
    measurement: "pack",
    upc: "48",
    cost: "",
    price: "1.87"
  },
  { item: "Snickers", measurement: "bar", upc: "48", cost: "", price: "1.87" }
];
