import React, { Component } from "react";

class Volume extends Component {
  constructor(props) {
    super(props);
    this.tabularRow = this.tabularRow.bind(this);
    this.tabularData = this.tabularData.bind(this);
    this.createDatesObject = this.createDatesObject.bind(this);
    this.singleDateObject = this.singleDateObject.bind(this);
    this.state = {
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
  }

  onInputChange(time, event) {
    this.setState({ [time]: event.target.value });
  }
  tabularRow(dates) {
    let table = [];
    //"i" runs through "dates" variable to place on the calendar.
    //"j" writes 7 days to a line
    let i = 0;
    while (i < dates.length) {
      let jsx = [];
      for (let j = 0; j < 7; j++) {
        //Don't input extra data if outside the limits of "dates"
        if (i < dates.length) {
          //dayOfWeek = 0-6
          const dayOfWeek = new Date(
            dates[i].year,
            dates[i].month,
            dates[i].day
          ).getDay();
          //j dictates the day on the caldenar.  If dayOfWeek & j do not
          //agree, it's not the correct day.
          if (dayOfWeek === j) {
            jsx.push(this.tabularData(dates[i]));
            i++;
          } else {
            jsx.push(<td />);
          }
        }
      }
      table.push(<tr>{jsx}</tr>);
    }
    return table;
  }
  createDatesObject(startDate, days) {
    let dates = [];
    for (let i = 0; i < days; i++) {
      dates.push(this.singleDateObject(startDate, i));
    }
    return dates;
  }
  singleDateObject(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    let month = result.getMonth();
    let year = result.getFullYear();
    let day = result.getDate();
    let time = result.getTime();
    return { year: year, month: month, day: day, time: time };
  }
  tabularData(date) {
    const dateFormatted = dateFormat(date.year, date.month + 1, date.day, 1);
    return (
      <td>
        <p className="center">{dateFormatted}</p>
        <input
          className="inputListMed"
          type="number"
          value={this.state[date.time]}
          placeholder="Occupancy"
          onChange={this.onInputChange.bind(this, date.time)}
        />
      </td>
    );
  }
  render() {
    let dates = this.createDatesObject(this.props.startDate, this.props.days);

    let table = this.tabularRow(dates);
    return (
      <form>
        <table border="1" className="calendar">
          <thead className="tableHeader">
            <tr>
              <th>Sunday</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
            </tr>
          </thead>
          {table}
        </table>
      </form>
    );
  }
}

export default Volume;

function dateFormat(yyyy, mm, dd, short) {
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (short) {
    return mm + "/" + dd;
  }
  return mm + "/" + dd + "/" + yyyy;
}
