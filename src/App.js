import React from "react";
import { BpkCode } from "@skyscanner/backpack-web/bpk-component-code";
import BpkButton from "@skyscanner/backpack-web/bpk-component-button";
import BpkText from "@skyscanner/backpack-web/bpk-component-text";

import { cssModules } from "@skyscanner/backpack-web/bpk-react-utils";

import STYLES from "./App.scss";
import { Component } from "react";
import BpkCalendar, {
  CALENDAR_SELECTION_TYPE,
} from "@skyscanner/backpack-web/bpk-component-calendar";
import BpkInput, {
  INPUT_TYPES,
} from "@skyscanner/backpack-web/bpk-component-input";
import format from "date-fns/format";

const getClassName = cssModules(STYLES);

const formatDateFull = (date) => format(date, "EEEE, do MMMM yyyy");
const formatMonth = (date) => format(date, "MMMM yyyy");
const daysOfWeek = [
  {
    name: "Sunday",
    nameAbbr: "Sun",
    index: 0,
    isWeekend: true,
  },
  {
    name: "Monday",
    nameAbbr: "Mon",
    index: 1,
    isWeekend: false,
  },
  {
    name: "Tuesday",
    nameAbbr: "Tues",
    index: 2,
    isWeekend: false,
  },
  {
    name: "Wednesday",
    nameAbbr: "Wed",
    index: 3,
    isWeekend: false,
  },
  {
    name: "Thursday",
    nameAbbr: "Thur",
    index: 4,
    isWeekend: false,
  },
  {
    name: "Friday",
    nameAbbr: "Fri",
    index: 5,
    isWeekend: false,
  },
  {
    name: "Saturday",
    nameAbbr: "Sat",
    index: 6,
    isWeekend: true,
  },
];

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      selectionConfiguration: {
        type: CALENDAR_SELECTION_TYPE.single,
        date: null,
      },
      dateInputValue: "",
    };
  }

  handleDateSelect = (date) => {
    this.setState({
      selectionConfiguration: {
        ...this.state.selectionConfiguration,
        date: date,
      },
      dateInputValue: date ? date.toString() : "",
    });
  };

  handleInputChange = (event) => {
    this.setState({
      dateInputValue: event.target.value,
    });
  };

  render() {
    return (
      <div className={getClassName("App")}>
        <header className={getClassName("App__header")}>
          <div className={getClassName("App__header-inner")}>
            <BpkText
              tagName="h1"
              textStyle="xxl"
              className={getClassName("App__heading")}
            >
              Flight Schedule
            </BpkText>
          </div>
        </header>
        <div className={getClassName("calendar-container")}>
          <div className={getClassName("calendar-content")}>
            <BpkInput
              id="dateInput"
              type={INPUT_TYPES.text}
              name="date"
              value={(this.state.selectionConfiguration.date || "").toString()}
              onChange={this.handleInputChange}
              placeholder="Departure date"
            />
            <BpkCalendar
              id="calendar"
              onDateSelect={this.handleDateSelect}
              formatMonth={formatMonth}
              formatDateFull={formatDateFull}
              daysOfWeek={daysOfWeek}
              weekStartsOn={1}
              changeMonthLabel="Change month"
              nextMonthLabel="Next month"
              previousMonthLabel="Previous month"
              selectionConfiguration={this.state.selectionConfiguration}
            />
          </div>
        </div>
        <BpkButton onClick={() => alert("It works!")}>Continue</BpkButton>
      </div>
    );
  }
}
