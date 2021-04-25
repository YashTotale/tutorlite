// React Imports
import React, { FC, useState } from "react";
import { Redirect, useHistory } from "react-router";
import Select from "react-select";

// Firebase Imports
import firebase from "firebase";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { StyledFirebaseAuth } from "react-firebaseui";
import { useSelector } from "react-redux";

const allSubjects = [
  "English",
  "Math",
  "Biology",
  "Chemistry",
  "Physics",
  "History",
  "Music",
  "Spanish",
  "French",
];

interface NewUserData {
  id: string;
  name: string;
  picture: string;
  email: string;
}

const Register: FC = () => {
  const firebaseInstance = useFirebase();
  const firestoreInstance = useFirestore();

  const [isNew, setIsNew] = useState<NewUserData | null>(null);
  const [redirect, setRedirect] = useState<string | null>(null);

  const [type, setType] = useState<"student" | "tutor">("tutor");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState<number | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [bio, setBio] = useState("");

  const uid = useSelector<any>((state) => state.firebase.auth.uid);

  const history = useHistory();

  if (redirect) {
    if (isNew) {
      firestoreInstance.collection("users").doc(isNew.id).set({
        name: isNew.name,
        picture: isNew.picture,
        email: isNew.email,
        school,
        bio,
        type,
        subjects,
        grade,
        chats: [],
      });
    }

    return <Redirect to={redirect} />;
  }

  if (uid !== undefined) {
    history.push("/");
  }

  return (
    <div
      className="hero fullscreen"
      style={{
        background: "linear-gradient(60deg, #e2e2e2, #c9d6ff) no-repeat fixed",
      }}
    >
      <div className="hero-body">
        <div className="content">
          <form className="frame p-0">
            <div className="frame__body p-0">
              <div className="row p-0 level fill-height">
                <div className="col-6 p-0 bg"></div>
                <div className="col-6">
                  <div className="space xlarge"></div>
                  <div className="padded">
                    <h3>Create an account!</h3>
                    <div className="form-section">
                      <label>Are you a tutor or student?</label>
                      <br />
                      <label>
                        <input
                          type="radio"
                          name="tutor"
                          checked={type === "tutor"}
                          onChange={() => setType("tutor")}
                        />
                        Tutor
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="student"
                          checked={type === "student"}
                          onChange={() => setType("student")}
                        />
                        Student
                      </label>
                    </div>
                    <div className="form-section">
                      <label>School</label>
                      <div className="input-control">
                        <input
                          className="input-contains-icon"
                          name="school"
                          placeholder="Your school name..."
                          type="text"
                          value={school}
                          onChange={(e) => setSchool(e.target.value)}
                        />
                        <span className="icon">
                          <i className="far fa-wrapper fa-user-circle small"></i>
                        </span>
                      </div>
                    </div>
                    <div className="form-section">
                      <label>Grade</label>
                      <div className="input-control">
                        <Select
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
                    <div className="form-section">
                      <label>Subjects</label>
                      <div className="input-control">
                        <Select
                          isMulti
                          options={allSubjects.map((s) => ({
                            value: s,
                            label: s,
                          }))}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(vals) =>
                            setSubjects(vals.map((v) => v.value))
                          }
                          value={subjects.map((s) => ({ label: s, value: s }))}
                        />
                      </div>
                    </div>
                    <div className="form-section">
                      <label>Bio</label>
                      <textarea
                        style={{ resize: "none" }}
                        placeholder="Notes about yourself..."
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                      ></textarea>
                    </div>
                    <div className={"form-section"}>
                      <div className="input-control">
                        <StyledFirebaseAuth
                          firebaseAuth={firebaseInstance.auth()}
                          uiConfig={{
                            signInOptions: [
                              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                            ],
                            signInFlow: "popup",
                            callbacks: {
                              signInSuccessWithAuthResult(result) {
                                const isNew =
                                  result.additionalUserInfo.isNewUser;

                                if (isNew) {
                                  setIsNew({
                                    id: result.user.uid,
                                    name:
                                      result.additionalUserInfo.profile.name,
                                    picture:
                                      result.additionalUserInfo.profile.picture,
                                    email:
                                      result.additionalUserInfo.profile.email,
                                  });
                                }

                                setRedirect("/");

                                return true;
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space xlarge"></div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
