import React, { FC, useEffect, useState } from "react";
import { useFirebase, useFirestoreConnect } from "react-redux-firebase";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../Store";
import {
  selectAppointments,
  selectTS,
  updateAppointments,
  updateTutorStudents,
} from "../redux/home.slice";

type Item = { data: any; id: string };
type AppointmentType = {
  StudentID?: string;
  TutorID?: string;
  MeetingLink: string;
  id: string;
  Datetime: Date;
  Subjects: string[];
};
type TutorStudentType = {
  grade: string;
  school: string;
  name: string;
  subjects: string;
};

export default () => {
  const [appointmentsEmpty, setAppointmentsEmpty] = useState(false);
  const [studentTutorsEmpty, setStudentTutorsEmpty] = useState(false);
  const firebase = useFirebase();
  const history = useHistory();

  const uid = useSelector<any>((state) => state.firebase.auth.uid);
  const type = useSelector<any>((state) => state.firebase.profile.type);

  const [stIds, setStIds] = useState([]);

  if (uid === undefined) {
    history.push("/register");
  }

  const dispatch = useAppDispatch();

  const appointments = useSelector(selectAppointments);
  const ts = useSelector(selectTS);

  const fetchAppointments = async () => {
    if (uid === undefined) return;

    const db = firebase.firestore();

    const { docs } = await db
      .collection("appointments")
      .where("StudentID", "==", uid)
      .get();

    if (docs.length === 0) {
      setAppointmentsEmpty(true);
      return;
    }
    const temp: Item[] = [];
    // find the student's name here todo
    docs.forEach((item: Item) => {
      const x = item.id;
      temp.push({ ...item.data(), id: x });
    });
    dispatch(updateAppointments(temp));
    console.log(temp);
  };

  const fetchStudentOrTutors = async () => {
    if (uid === undefined) return;

    const db = firebase.firestore();
    const { docs } = await db
      .collection("studentTutor")
      .where("userId", "==", uid)
      .get();

    if (docs.length === 0) {
      setStudentTutorsEmpty(true);
      return;
    }
    docs.forEach((item) => {
      setStIds(item.data().childIds);
    });
  };

  useEffect(() => {
    const fetchIndividualUser = async (id: string) => {
      const db = firebase.firestore();
      const v = await db.collection("users").doc(id).get();

      dispatch(updateTutorStudents(v.data()));
    };

    if (stIds.length !== 0 && ts.length === 0 && appointments.length === 0) {
      // for each record, fetch the user record
      for (let i = 0; i < stIds.length; ++i) {
        fetchIndividualUser(stIds[i]);
      }
    }
  }, [stIds]);

  useEffect(() => {
    if (uid !== undefined) {
      fetchStudentOrTutors();
      fetchAppointments();
    }
  }, [uid]);

  return (
    <>
      <h3 style={{ marginTop: 15 }}>Your appointments</h3>
      <button
        className="btn-success"
        onClick={() => {
          history.push({
            pathname: "/schedule",
            state: {},
          });
        }}
      >
        Schedule an appointment
      </button>

      {appointmentsEmpty ? (
        <h6 style={{ textAlign: "center", color: "gray" }}>
          No appointments yet...
        </h6>
      ) : appointments.length !== 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(450px, 1fr))",
          }}
        >
          {/* instead of displaying the StudentID -> display his name */}
          {appointments.map((curr: AppointmentType) => (
            <HomeAppointmentCard
              title={new Date(curr.Datetime).toString()}
              withX={curr.StudentID}
              forX={curr.Subjects.toString()}
              link={curr.MeetingLink}
              idToDelete={curr.id}
            />
          ))}
        </div>
      ) : (
        <span>loading...</span>
      )}

      <h3 style={{ marginTop: 30 }}>
        Your {type === "tutor" ? "students" : "tutors"}
      </h3>
      <button
        onClick={() => history.push("/explore")}
        className="btn-small btn-info"
      >
        Find a tutor
      </button>
      {studentTutorsEmpty ? (
        <h6 style={{ textAlign: "center", color: "gray" }}>
          No students/tutors yet...
        </h6>
      ) : ts.length !== 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(450px, 1fr))",
          }}
        >
          {ts.map((curr: TutorStudentType) => (
            <HomeStudentTutorCard
              grade={curr.grade}
              school={curr.school}
              name={curr.name}
              type={curr.subjects.toString()}
            />
          ))}
        </div>
      ) : (
        <span>loading...</span>
      )}
    </>
  );
};

interface HomeAppointmentCardProps {
  title: string;
  withX: string | undefined;
  forX: string;
  link: string;
  idToDelete: string;
}

const HomeAppointmentCard: FC<HomeAppointmentCardProps> = ({
  title,
  withX,
  forX,
  link,
  idToDelete,
}) => {
  const firebase = useFirebase();

  return (
    <div className="card" style={{ margin: 10 }}>
      <div className="card__header">
        <p className="font-bold px-3">{title}</p>
        <button
          onClick={() => {
            const db = firebase.firestore();
            db.collection("appointments")
              .doc(idToDelete)
              .delete()
              .then(() => {
                alert("Successfully deleted!");
              });
          }}
          style={{ marginLeft: "auto" }}
          className="btn-danger btn-small"
        >
          Delete
        </button>
      </div>
      <div className="content">
        <p>With: {withX}</p>
        <p>For: {forX}</p>
        <p>Link: {link}</p>
      </div>
    </div>
  );
};

interface HomeStudentTutorCardProps {
  name: string;
  grade: string;
  school: string;
  type: string;
}

const HomeStudentTutorCard: FC<HomeStudentTutorCardProps> = ({
  name,
  grade,
  school,
  type,
}) => {
  return (
    <div className="card" style={{ margin: 10 }}>
      <div className="content">
        <div className="space"></div>
        <div className="tile tile--center">
          <div className="tile__icon">
            <figure className="avatar">
              <img src="https://i.imgur.com/sbKJVxr.png" />
            </figure>
          </div>

          <div className="tile__container">
            <p className="tile__title">{name}</p>
            <p className="tile__subtitle">Grade {grade}</p>
            <p className="tile__subtitle">{school}</p>
          </div>
        </div>
        <p>{type} tutor</p>
      </div>
    </div>
  );
};
