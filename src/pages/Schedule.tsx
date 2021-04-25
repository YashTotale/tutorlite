import { DateTimePicker } from "react-rainbow-components";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useFirebase } from "react-redux-firebase";
import { updateTutorStudents } from "../redux/home.slice";
import { useAppDispatch } from "../Store";
import { selectOptions, updateSelectOptions } from "../redux/schedule.slice";

const allSubjects = [
  "Biology",
  "Chemistry",
  "Physics",
  "History",
  "Math",
  "English",
  "Spanish",
  "French",
  "Music",
];

// 1. fetch your tutors if you a student
// 2. subjects
export default function Schedule() {
  const profile: any = useSelector<any>((state) => state.firebase.profile);

  const [date, setDate] = React.useState(new Date("2021-4-25 10:00"));
  const [meetingLink, setMeetingLink] = React.useState("");
  const [subjects, setSubjects] = useState<string[]>([]);

  const [stIds, setStIds] = useState([]);
  const [options, setOptions] = useState<any>([]);

  const uid: any = useSelector<any>((state: any) => state.firebase.auth.uid);
  const history = useHistory();
  const [tutor, setTutor] = useState<any>(null);
  if (uid === undefined) {
    history.push("/register");
  }

  const tutorStudentOptions = useSelector(selectOptions);

  const dispatch = useAppDispatch();
  const firebase = useFirebase();

  const handleSubmit = async () => {
    if (meetingLink === "") {
      return;
    }

    if (tutor === null || subjects.length === 0) {
      return;
    }

    const db = firebase.firestore();
    await db.collection("appointments").add({
      datetime: date,
      meetingLink: meetingLink,
      subjects: subjects,
      tutorOrStudentId: tutor.value,
      tutorOrStudentName: tutor.label,
      id: uid,
    });

    setSubjects([]);
    setMeetingLink("");
    setDate(new Date("2021-4-25 10:00"));
    setOptions([]);
    alert("You have successfully booked an appointment!");

    history.push("/");
  };

  useEffect(() => {
    if (tutorStudentOptions.length !== 0) {
      for (let i = 0; i < tutorStudentOptions.length; i++) {
        setOptions(
          options.concat({
            label: tutorStudentOptions[i].name,
            value: tutorStudentOptions[i].id,
          })
        );
      }
    }
  }, [tutorStudentOptions]);

  useEffect(() => {
    const fetchIndividualUser = async (id: string) => {
      const db = firebase.firestore();
      const v = await db.collection("users").doc(id).get();

      const x = v.id;
      dispatch(updateSelectOptions({ ...v.data(), id: x }));
    };

    if (stIds.length !== 0) {
      // for each record, fetch the user record
      for (let i = 0; i < stIds.length; ++i) {
        fetchIndividualUser(stIds[i]);
      }
    }
  }, [stIds]);

  useEffect(() => {
    if (uid !== undefined) {
      const fetchStudentTutors = async () => {
        // push to db
        const db = firebase.firestore();

        const { docs } = await db
          .collection("studentTutor")
          .where("userId", "==", uid)
          .get();

        docs.forEach((item) => {
          setStIds(item.data().childIds);
        });
      };

      fetchStudentTutors();
    }
  }, [uid]);

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
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(val: any) => setTutor(val ? val : null)}
            value={tutor ? { value: tutor.value, label: tutor.label } : null}
          />
        </div>
        <div className={"m-3"}>
          <label>Select the subject you will be working on</label>
          <Select
            isMulti
            styles={{
              menu: (provided) => ({ ...provided, zIndex: 999999 }),
              menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
            options={allSubjects.map((s) => ({
              value: s,
              label: s,
            }))}
            className="basic-multi-select"
            classNamePrefix="select"
            value={subjects.map((s) => ({ label: s, value: s }))}
            onChange={(vals) => setSubjects(vals.map((v) => v.value))}
          />
        </div>
        <div className={"m-3"}>
          <label>Provide the meeting link (Zoom/Google Meet/Other)</label>
          <div className="input-control">
            <input
              type="email"
              className="input-contains-icon"
              placeholder="Meeting Link"
              value={meetingLink}
              onChange={(e) => {
                setMeetingLink(e.target.value);
              }}
            />
            <span className="icon">
              <i className="fas fa-user-friends"></i>
            </span>
          </div>
        </div>
        <div className={"m-3"}>
          <button onClick={handleSubmit} className="btn-dark u-pull-right">
            Schedule
          </button>
        </div>
      </div>
    </>
  );
}
