import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router";

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

export default () => {
  const profile: any = useSelector<any>((state) => state.firebase.profile);

  const [editName, setEditName] = useState(false);
  const [editGrade, setEditGrade] = useState(false);
  const [editSchool, setEditSchool] = useState(false);
  const [editType, setEditType] = useState(false);

  const [name, name_] = useState("");
  const [school, school_] = useState("");
  const [grade, setGrade] = useState<number | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]);

  const firebase = useFirebase();

  const history = useHistory();
  const uid: any = useSelector<any>((state: any) => state.firebase.auth.uid);

  if (uid === undefined) {
    history.push("/register");
  }

  return (
    <div className="frame">
      <div className="frame__header">
        <div className="avatar">
          <img src={profile.picture} />
        </div>
        <p className="u-text-center frame__title">{profile.name}</p>
      </div>
      <div style={{ margin: 0 }} className="divider"></div>
      <div className="frame__body">
        <div className="tile level r">
          <div className="tile-avatar">
            <span className="icon">
              <i className="fa-wrapper fa fa-chevron-right pad-left"></i>
            </span>
          </div>
          {editName ? (
            <div className="row ignore-screen level">
              <div className="col-2 ignore-screen level-item">
                <span className="m-0">Name:</span>
              </div>
              <div className="col-9 ignore-screen level-item">
                <input
                  type="name"
                  value={name}
                  onChange={(e) => name_(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="tile__container">
              <p className="tile__title">Name</p>
              <p className="tile__subtitle">{profile.name}</p>
            </div>
          )}
          <div className="tile__buttons">
            <span
              className="icon"
              onClick={async () => {
                if (editName) {
                  if (name.length !== 0) {
                    // push to db
                    const db = firebase.firestore();

                    await db
                      .collection("users")
                      .doc(uid)
                      .update({ name: name });
                  }
                }

                setEditName(!editName);
              }}
            >
              {!editName ? (
                <i className="fas fa-edit"></i>
              ) : (
                <i className="fas fa-plus"></i>
              )}
            </span>
          </div>
        </div>
        <div className="tile level r">
          <div className="tile-avatar">
            <span className="icon">
              <i className="fa fa-wrapper fas fa-user-graduate"></i>
            </span>
          </div>
          {editGrade ? (
            <div className="row ignore-screen level">
              <div className="col-2 ignore-screen level-item">
                <span className="m-0">Grade:</span>
              </div>
              <div className="col-9 ignore-screen level-item">
                <Select
                  styles={{
                    container: (provided) => ({
                      ...provided,
                      width: "100%",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      position: "relative",
                    }),
                    menuPortal: (provided) => ({
                      ...provided,
                      position: "relative",
                    }),
                  }}
                  options={[...new Array(12)].map((num, i) => ({
                    label: i + 1,
                    value: i + 1,
                  }))}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(val) => setGrade(val ? val.value : null)}
                  value={grade ? { value: grade, label: grade } : null}
                />
              </div>
            </div>
          ) : (
            <div className="tile__container">
              <p className="tile__title">Grade</p>
              <p className="tile__subtitle">Grade {profile.grade}</p>
            </div>
          )}
          <div className="tile__buttons">
            <span
              className="icon"
              onClick={async () => {
                if (editGrade) {
                  if (grade) {
                    // push to db
                    const db = firebase.firestore();

                    await db.collection("users").doc(uid).update({ grade });
                  }
                }

                setEditGrade(!editGrade);
              }}
            >
              {!editGrade ? (
                <i className="fas fa-edit"></i>
              ) : (
                <i className="fas fa-plus"></i>
              )}
            </span>
          </div>
        </div>
        <div className="tile level r">
          <div className="tile-avatar">
            <span className="icon">
              <i className="fa fa-wrapper fas fa-school"></i>
            </span>
          </div>
          {editSchool ? (
            <div className="row ignore-screen level">
              <div className="col-2 ignore-screen level-item">
                <span className="m-0">School:</span>
              </div>
              <div className="col-9 ignore-screen level-item">
                <input
                  type="name"
                  value={school}
                  onChange={(e) => school_(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="tile__container">
              <p className="tile__title">School</p>
              <p className="tile__subtitle">{profile.school}</p>
            </div>
          )}
          <div className="tile__buttons">
            <span
              className="icon"
              onClick={async () => {
                if (editSchool) {
                  if (school.length !== 0) {
                    // push to db
                    const db = firebase.firestore();

                    await db.collection("users").doc(uid).update({ school });
                  }
                }

                setEditSchool(!editSchool);
              }}
            >
              {!editSchool ? (
                <i className="fas fa-edit"></i>
              ) : (
                <i className="fas fa-plus"></i>
              )}
            </span>
          </div>
        </div>
        <div className="tile level r">
          <div className="tile-avatar">
            <span className="icon">
              <i className="fa fa-wrapper fa-map-marker" aria-hidden="true"></i>
            </span>
          </div>
          {editType ? (
            <div className="row ignore-screen level">
              <div className="col-2 ignore-screen level-item">
                <span className="m-0">Subjects:</span>
              </div>
              <div className="col-9 ignore-screen level-item">
                <Select
                  isMulti
                  styles={{
                    container: (provided) => ({
                      ...provided,
                      width: "100%",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      position: "relative",
                    }),
                    menuPortal: (provided) => ({
                      ...provided,
                      position: "relative",
                    }),
                  }}
                  options={allSubjects.map((s) => ({
                    value: s,
                    label: s,
                  }))}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(vals) => setSubjects(vals.map((v) => v.value))}
                  value={subjects.map((s) => ({ label: s, value: s }))}
                />
              </div>
            </div>
          ) : (
            <div className="tile__container">
              <p className="tile__title">
                {profile.type === "tutor" ? "Specialization" : "Needs help on"}
              </p>
              <p className="tile__subtitle">
                {profile.subjects !== undefined &&
                  profile.subjects.map((curr: any, index: number) => (
                    <span key={index}>{curr + " "}</span>
                  ))}
              </p>
            </div>
          )}
          <div className="tile__buttons">
            <span
              className="icon"
              onClick={async () => {
                if (editType) {
                  if (subjects.length !== 0) {
                    // push to db
                    const db = firebase.firestore();

                    await db.collection("users").doc(uid).update({ subjects });
                  }
                }

                setEditType(!editType);
              }}
            >
              {!editType ? (
                <i className="fas fa-edit"></i>
              ) : (
                <i className="fas fa-plus"></i>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
