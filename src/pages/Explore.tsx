import React, { FC, useEffect, useState } from "react";
import "../App.css";
import { useHistory } from "react-router";
import { useFirebase } from "react-redux-firebase";
import { selectExplore, updateExplore } from "../redux/explore.slice";
import { useAppDispatch } from "../Store";
import { useSelector } from "react-redux";

export default () => {
  return (
    <div className={"SidebarMainContainer"}>
      <ExploreSidebar />
      <ExploreMainContent tutorStudentCount={1000} />
    </div>
  );
};

const subjects = [
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
const ageGroup = ["1st - 5th grade", "6th - 8th grade", "9th - 12th grade"];
const ExploreSidebar = () => {
  return (
    <aside className="Sidebar">
      <h4 style={{ marginTop: 30 }}>Subjects</h4>
      {subjects.map((curr, index) => {
        return (
          <div className="form-ext-control form-ext-checkbox" key={index}>
            <input className="form-ext-input" type="checkbox" />
            <label className="form-ext-label" htmlFor="check1">
              {curr}
            </label>
          </div>
        );
      })}
      <h4 style={{ marginTop: 30 }}>Age group</h4>
      {ageGroup.map((curr, index) => {
        return (
          <div className="form-ext-control form-ext-checkbox" key={index}>
            <input className="form-ext-input" type="checkbox" />
            <label className="form-ext-label" htmlFor="check1">
              {curr}
            </label>
          </div>
        );
      })}
    </aside>
  );
};

interface ExploreMainContentProps {
  tutorStudentCount: number;
}

type TutorType = {
  data: any;
  id: string;
};

type TutorChild = {
  grade: number;
  picture: string;
  type: string;
  subjects: string[];
  school: string;
  name: string;
  id: string;
};

const ExploreMainContent: FC<ExploreMainContentProps> = ({
  tutorStudentCount,
}) => {
  const dispatch = useAppDispatch();
  const [empty, setEmpty] = useState(false);
  const firebase = useFirebase();
  const explore = useSelector(selectExplore);

  useEffect(() => {
    const fetchTutors = async () => {
      const db = firebase.firestore();

      const { docs } = await db
        .collection("users")
        .where("type", "==", "tutor")
        .get();

      if (docs.length === 0) {
        setEmpty(true);
        return;
      }

      const temp: TutorType[] = [];
      docs.forEach((item: TutorType) => {
        const x = item.id;
        temp.push({ ...item.data(), id: x });
      });

      dispatch(updateExplore(temp));
    };

    fetchTutors();
  }, []);
  return (
    <div className={"MainContent"}>
      <h4 style={{ marginTop: 30, textAlign: "center" }}>
        Viewing {tutorStudentCount} tutors
      </h4>

      {empty ? (
        <h6 style={{ textAlign: "center", color: "gray" }}>No tutors yet...</h6>
      ) : (
        explore.map((curr: TutorChild) => {
          return (
            <ExploreMainContentChild
              name={curr.name}
              school={curr.school}
              type={curr.subjects.toString() + " tutor "}
              grade={curr.grade}
              id={curr.id}
            />
          );
        })
      )}
    </div>
  );
};

interface ExploreMainContentChildProps {
  name: string;
  school: string;
  type: string;
  grade: number;
  id: string;
}

const ExploreMainContentChild: FC<ExploreMainContentChildProps> = ({
  name,
  school,
  type,
  grade,
  id,
}) => {
  const history = useHistory();
  return (
    <div
      className={"MainContent-SubContainer"}
      onClick={() => {
        history.push({
          pathname: "/user",
          state: {
            name,
            school,
            type,
            grade,
            id,
          },
        });
      }}
    >
      <div className={"u-flex u-items-center"}>
        <div className="tile__icon">
          <figure className="avatar">
            <img src="https://i.imgur.com/sbKJVxr.png" />
          </figure>
        </div>
        <div className="tile__container u-hide-overflow">
          <h6 style={{ marginBottom: 0 }}>{name}</h6>
          <p className="tile__subtitle m-0">
            {school}, {type}
          </p>
          <p className="tile__subtitle m-0">Grade {grade}</p>
        </div>
      </div>
    </div>
  );
};
