import { DateTimePicker } from "react-rainbow-components";
import React from "react";
import Select from "react-select";

const gradeOptions = [
  { label: 1, value: 1 },
  { label: 2, value: 2 },
  { label: 3, value: 3 },
  { label: 4, value: 4 },
  { label: 5, value: 5 },
  { label: 6, value: 6 },
  { label: 7, value: 7 },
  { label: 8, value: 8 },
  { label: 9, value: 9 },
  { label: 10, value: 10 },
  { label: 11, value: 11 },
  { label: 12, value: 12 },
];

export default function Schedule() {
  const [date, setDate] = React.useState(new Date("2021-4-15 10:00"));

  return (
    <>
      <h3 style={{ marginTop: 15 }}>Schedule an appointment</h3>
      <div
        className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto"
        style={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className={"m-3"}>
          <label>Select the date and time.</label>
          <DateTimePicker
            value={date}
            onChange={(value) => {
              setDate(value);
            }}
            formatStyle="large"
            locale={"en-US"}
            okLabel={"Ok"}
            cancelLabel={"Cancel"}
          />
        </div>
        <div className={"m-3"}>
          <label>Select the tutor you will be working with</label>
          <Select
            styles={{
              menu: (provided) => ({ ...provided, zIndex: 999999 }),
              menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
            options={gradeOptions}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
        <div className={"m-3"}>
          <label>Select the subject you will be working on</label>
          <Select
            styles={{
              menu: (provided) => ({ ...provided, zIndex: 999999 }),
              menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
            options={gradeOptions}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
        <div className={"m-3"}>
          <label>Provide the meeting link (Zoom/Google Meet/Other)</label>
          <div className="input-control">
            <input
              type="email"
              className="input-contains-icon"
              placeholder="Meeting Link"
            />
            <span className="icon">
              <i className="fas fa-user-friends"></i>
            </span>
          </div>
        </div>
        <div className={"m-3"}>
          <button className="btn-dark u-pull-right">Schedule</button>
        </div>
      </div>
    </>
  );
}
