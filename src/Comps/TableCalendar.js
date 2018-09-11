import React, { Component } from "react";

class TableCalendar extends Component {
  constructor(props) {
    super(props);
    this.tabularRow = this.tabularRow.bind(this);
    this.tabularData = this.tabularData.bind(this);
  }
  tabularRow(dates) {
    let table = [];
    //"i" runs through "dates" variable to place on the calendar.
    //"j" writes 7 days to a row
    let i = 0;
    while (i < dates.length) {
      let jsx = [];
      for (let j = 0; j < 7; j++) {
        //Don't input extra data if outside the limits of "dates"
        //Can fill with blank boxes with 'else {jsx.push(<td />)}'
        if (i < dates.length) {
          //dayOfWeek = 0-6
          //j dictates the day on the caldenar.  If dayOfWeek & j do not
          //agree, it's not the correct day.
          if (dates[i].dayOfWeek === j) {
            jsx.push(this.tabularData(dates[i]));
            i++;
          } else {
            jsx.push(<td />);
          }
        } else {
          jsx.push(<td />);
        }
      }
      table.push(<tr>{jsx}</tr>);
    }
    return table;
  }
  tabularData(date) {
    let cellValue = this.props.volumes[date.time];
    let cellClass;
    if (!cellValue || cellValue === "") {
      cellClass = ["inputListMed", "redBorder"].join(" ");
    } else cellClass = "inputListMed";

    const formattedDate = dateFormat(date.year, date.month + 1, date.day, 1);
    return (
      <td>
        <p className="center">{formattedDate}</p>
        <input
          className={cellClass}
          type="number"
          value={cellValue}
          placeholder="Occupancy"
          onChange={this.props.onChange.bind(this, date.time)}
        />
      </td>
    );
  }
  render() {
    let dates = createDatesObject(this.props.startDate, this.props.days);
    return this.tabularRow(dates);
  }
}

export default TableCalendar;

function createDatesObject(startDate, days) {
  let dates = [];
  for (let i = 0; i < days; i++) {
    dates.push(singleDateObject(startDate, i));
  }
  return dates;
}
function singleDateObject(date, days) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  const month = result.getMonth();
  const year = result.getFullYear();
  const day = result.getDate();
  const time = result.getTime();
  const dayOfWeek = result.getDay();
  return {
    year,
    month,
    day,
    time,
    dayOfWeek
  };
}
function dateFormat(yyyy, mm, dd, short) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];

  mm = monthNames[mm - 1];
  /*
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  if (short) {
    return mm + "/" + dd;
  }*/
  if (short) {
    return mm + " " + dd;
  }

  return mm + "/" + dd + "/" + yyyy;
}
