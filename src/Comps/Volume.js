import React, { Component } from "react";

class Volume extends Component {
  constructor(props) {
    super(props);
    this.tabularRow = this.tabularRow.bind(this);
    this.tabularData = this.tabularData.bind(this);
  }
  handleChange() {}
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
    const dateFormatted = dateFormat(date.year, date.month + 1, date.day, 1);
    return (
      <td>
        <p className="center">{dateFormatted}</p>
        <input
          className="inputListMed"
          type="number"
          placeholder="Occupancy"
          onChange={this.handleChange}
        />
      </td>
    );
  }
  render() {
    let dates = createDatesObject(this.props.startDate, this.props.days);

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

function createDatesObject(startDate, days) {
  let dates = [];
  for (let i = 0; i < days; i++) {
    dates.push(singleDateObject(startDate, i));
  }
  return dates;
}

function singleDateObject(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  let month = result.getMonth();
  let year = result.getFullYear();
  let day = result.getDate();
  return { year: year, month: month, day: day };
}

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

/*
let month = startDate.getMonth();
let year = startDate.getFullYear();
let day = startDate.getDate();
let lastDayOfMonth = daysInMonth(year, month);
let dates=[];

for(var i=0; i<days; i++){
  day += 1;
  if(day > lastDayOfMonth){
    day = 1;
    month += 1
    if(month > 12){
      month = 1;
      year += 1;
    }
    lastDayOfMonth = daysInMonth(year, month);
  }
  const date = dateFormat(year, month, day);
  dates.push(date);
}


console.log(dates);

function daysInMonth(year, month) {
  return ((new Date(year, month, 0)).getDate());
}

*/
