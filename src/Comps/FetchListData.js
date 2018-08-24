import React, { Component } from "react";

class FetchListData extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let callback = this.props.callback;
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
  render() {
    return false;
  }
}

export default FetchListData;
