import React, { Component } from "react";

class TableCalendar extends Component {
  constructor(props) {
    super(props);
    this.tabularRow = this.tabularRow.bind(this);
    this.tabularData = this.tabularData.bind(this);
    this.createDatesObject = this.createDatesObject.bind(this);
    this.singleDateObject = this.singleDateObject.bind(this);
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
  tabularData(date) {
    const formattedDate = dateFormat(date.year, date.month + 1, date.day, 1);
    return (
      <td>
        <p className="center">{formattedDate}</p>
        <input
          className="inputListMed"
          type="number"
          value={this.props.volumes[date.time]}
          placeholder="Occupancy"
          onChange={this.props.onInputChange.bind(this, date.time)}
        />
      </td>
    );
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
  render() {
    let dates = this.createDatesObject(this.props.startDate, this.props.days);
    return this.tabularRow(dates);
  }
}

export default TableCalendar;

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
