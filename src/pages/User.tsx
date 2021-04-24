import React, { FC } from "react";
import { useHistory, withRouter } from "react-router";
import { useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";

type Item = { data: any; id: string };

const User: FC = (props: any) => {
  const { name, school, type, grade, id } = props.location.state;
  const firebase = useFirebase();
  const history = useHistory();
  const uid = useSelector<string>((state: any) => state.firebase.auth.uid);

  if (uid === undefined) {
    history.push("/register");
  }

  return (
    <div className="frame">
      <div className="frame__header u-text-center">
        <div>
          <figure className="avatar">
            <img src="https://i.imgur.com/sbKJVxr.png" />
          </figure>
        </div>
        <div>
          <div className="frame__title">{name}</div>
          <div className="frame__subtitle">{type}</div>
        </div>
      </div>
      <div className="content-no-padding">
        <div className="divider m-0"></div>
      </div>
      <div className="frame__body">
        <div className="content u-text-center">
          <h5>
            I am in Grade {grade} and I go to {school}
          </h5>
          <p>
            I am looking forward to meeting you! If you have any questions,
            please feel free to message me!
          </p>
          <button
            onClick={async () => {
              const db = firebase.firestore();

              // so basically check if the user is already in the student tutor list, if he is: then just append(update), if he isn't then create an actual record for him
              const { docs } = await db
                .collection("studentTutor")
                .where("userId", "==", uid)
                .get();

              if (uid === id) return;

              let buffer = 0;
              let idx = "";
              let data: any;
              const idsThatAreTaken: string[] = [];
              docs.forEach((item: Item) => {
                idx = item.id;
                data = item.data();

                for (let i = 0; i < data.childIds.length; i++) {
                  idsThatAreTaken.push(data.childIds[i]);
                }

                console.log(idsThatAreTaken, id, idsThatAreTaken.includes(id));
                if (idsThatAreTaken.includes(id)) {
                  buffer = 1;
                }
              });
              if (buffer !== 0) return;

              if (docs.length === 0) {
                // because it empty: create record for him
                db.collection("studentTutor").add({
                  childIds: [id],
                  userId: uid,
                });

                return;
              }
              data.childIds.push(id);

              // update/append record
              db.collection("studentTutor").doc(idx).update({
                childIds: data.childIds,
              });
            }}
            className="btn-info"
          >
            Add tutor
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(User);
