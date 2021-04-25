import React, { FC, useEffect, useState } from "react";
import "../App.css";
import { useHistory } from "react-router";
import { useFirebase } from "react-redux-firebase";
import { selectExplore, updateExplore } from "../redux/explore.slice";
import { useAppDispatch } from "../Store";
import { useSelector } from "react-redux";
import Fuse from "fuse.js";

export default () => {
  const explore = useSelector(selectExplore);
  const options = {
    includeScore: false,
    keys: ["subjects", "grade"],
  };

  const [searchText, setSearchText] = useState("");
  if (explore.length !== 0) {
    const fuse = new Fuse(explore, options);
    const result = fuse.search(searchText);

    console.log(result.length === 0, explore, result);

    const asd = [];
    for (let i = 0; i < result.length; i++) {
      asd.push(result[i].item);
    }

    return (
      <div className={"SidebarMainContainer"}>
        <ExploreSidebar setSearchText={setSearchText} searchText={searchText} />
        <ExploreMainContent content={searchText === "" ? explore : asd} />
      </div>
    );
  }

  return null;
};

interface ExploreSidebarProps {
  searchText: any;
  setSearchText: any;
}
const ageGroup = ["1st - 5th grade", "6th - 8th grade", "9th - 12th grade"];
const ExploreSidebar: FC<ExploreSidebarProps> = ({
  setSearchText,
  searchText,
}) => {
  const [biology, biology_] = useState(false);
  const [chemistry, chemistry_] = useState(false);
  const [physics, physics_] = useState(false);
  const [history, history_] = useState(false);
  const [math, math_] = useState(false);
  const [english, english_] = useState(false);
  const [spanish, spanish_] = useState(false);
  const [french, french_] = useState(false);
  const [music, music_] = useState(false);
  const [firstAgeGroup, firstAgeGroup_] = useState(false);
  const [secondAgeGroup, secondAgeGroup_] = useState(false);
  const [thirdAgeGroup, thirdAgeGroup_] = useState(false);

  return (
    <aside className="Sidebar">
      <h4 style={{ marginTop: 30 }}>Subjects</h4>

      <div className="form-ext-checkbox">
        <input
          className="form-ext-input"
          type="checkbox"
          checked={biology}
          onChange={() => {
            if (!biology) {
              setSearchText(searchText + " biology");
            } else {
              setSearchText(searchText.replace(" biology", ""));
            }
            biology_(!biology);
          }}
        />
        <label className="form-ext-label">Biology</label>
      </div>
      <div className="form-ext-checkbox">
        <input
          className="form-ext-input"
          type="checkbox"
          checked={chemistry}
          onChange={() => {
            if (!chemistry) {
              setSearchText(searchText + " chemistry");
            } else {
              setSearchText(searchText.replace(" chemistry", ""));
            }
            chemistry_(!chemistry);
          }}
        />
        <label className="form-ext-label">Chemistry</label>
      </div>
      <div className="form-ext-checkbox">
        <input
          className="form-ext-input"
          type="checkbox"
          checked={physics}
          onChange={() => {
            if (!physics) {
              setSearchText(searchText + " physics");
            } else {
              setSearchText(searchText.replace(" physics", ""));
            }
            physics_(!physics);
          }}
        />
        <label className="form-ext-label">Physics</label>
      </div>
      <div className="form-ext-checkbox">
        <input
          className="form-ext-input"
          type="checkbox"
          checked={history}
          onChange={() => {
            if (!history) {
              setSearchText(searchText + " history");
            } else {
              setSearchText(searchText.replace(" history", ""));
            }
            history_(!history);
          }}
        />
        <label className="form-ext-label">History</label>
      </div>
      <div className="form-ext-checkbox">
        <input
          className="form-ext-input"
          type="checkbox"
          checked={math}
          onChange={() => {
            if (!math) {
              setSearchText(searchText + " math");
            } else {
              setSearchText(searchText.replace(" math", ""));
            }
            math_(!math);
          }}
        />
        <label className="form-ext-label">Math</label>
      </div>
      <div className="form-ext-checkbox">
        <input
          className="form-ext-input"
          type="checkbox"
          checked={english}
          onChange={() => {
            if (!english) {
              setSearchText(searchText + " english");
            } else {
              setSearchText(searchText.replace(" english", ""));
            }
            english_(!english);
          }}
        />
        <label className="form-ext-label">English</label>
      </div>
      <div className="form-ext-checkbox">
        <input
          className="form-ext-input"
          type="checkbox"
          checked={spanish}
          onChange={() => {
            if (!spanish) {
              setSearchText(searchText + " spanish");
            } else {
              setSearchText(searchText.replace(" spanish", ""));
            }
            spanish_(!spanish);
          }}
        />
        <label className="form-ext-label">Spanish</label>
      </div>
      <div className="form-ext-checkbox">
        <input
          className="form-ext-input"
          type="checkbox"
          checked={french}
          onChange={() => {
            if (!french) {
              setSearchText(searchText + " french");
            } else {
              setSearchText(searchText.replace(" french", ""));
            }
            french_(!french);
          }}
        />
        <label className="form-ext-label">French</label>
      </div>
      <div className="form-ext-checkbox">
        <input
          className="form-ext-input"
          type="checkbox"
          checked={music}
          onChange={() => {
            if (!music) {
              setSearchText(searchText + " music");
            } else {
              setSearchText(searchText.replace(" music", ""));
            }
            music_(!music);
          }}
        />
        <label className="form-ext-label">Music</label>
      </div>

      <h4 style={{ marginTop: 30 }}>Age group</h4>

      <div>
        <input
          type="checkbox"
          checked={firstAgeGroup}
          onChange={() => {
            firstAgeGroup_(!firstAgeGroup);
          }}
        />
        <label className="form-ext-label">{ageGroup[0]}</label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={secondAgeGroup}
          onChange={() => {
            secondAgeGroup_(!secondAgeGroup);
          }}
        />
        <label className="form-ext-label">{ageGroup[1]}</label>
      </div>
      <div>
        <input
          type="checkbox"
          checked={thirdAgeGroup}
          onChange={() => {
            thirdAgeGroup_(!thirdAgeGroup);
          }}
        />
        <label className="form-ext-label">{ageGroup[2]}</label>
      </div>
    </aside>
  );
};

interface ExploreMainContent {
  content: any;
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

const ExploreMainContent: FC<ExploreMainContent> = ({ content }) => {
  const dispatch = useAppDispatch();
  const [empty, setEmpty] = useState(false);
  const firebase = useFirebase();

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
        Viewing available tutors
      </h4>

      {empty ? (
        <h6 style={{ textAlign: "center", color: "gray" }}>No tutors yet...</h6>
      ) : (
        content.map((curr: TutorChild, index: number) => {
          return (
            <React.Fragment key={index}>
              <ExploreMainContentChild
                name={curr.name}
                school={curr.school}
                type={curr.subjects.toString() + " tutor "}
                grade={curr.grade}
                id={curr.id}
              />
            </React.Fragment>
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
