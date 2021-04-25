import user from "../img/user.svg";
import { useHistory } from "react-router";
import { useAppDispatch } from "../Store";
import { logout } from "../redux/logout.slice";
import { useSelector } from "react-redux";

function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

export default function Nav() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const profile: any = useSelector<any>((state) => state.firebase.profile);

  return (
    <div className="header header-fixed unselectable header-animated">
      <div className="header-brand">
        <div className="nav-item no-hover">
          <h6 className="title" onClick={() => history.push("/")}>
            TutorLite
          </h6>
        </div>
        <div className="nav-item nav-btn" id="header-btn">
          <span></span> <span></span> <span></span>
        </div>
      </div>
      <div className="header-nav" id="header-menu">
        <div className="nav-right">
          <div className="nav-item">
            <a onClick={() => history.push("/")}>Home</a>
          </div>
          <div className="nav-item">
            <a onClick={() => history.push("/explore")}>
              Find {profile.type === "tutor" ? "students" : "tutors"}
            </a>
          </div>
          <div className="nav-item">
            <a onClick={() => history.push("/chat")}>Messages</a>
          </div>
          <div className="nav-item">
            <a onClick={() => history.push("/profile")}>Profile</a>
          </div>
        </div>
        <div className="nav-right">
          <div className="nav-item has-sub toggle-hover" id="dropdown">
            <a className="nav-dropdown-link">
              <img src={user} alt={""} width={20} height={20} />
              {profile.name}
            </a>
            <ul className="dropdown-menu dropdown-animated" role="menu">
              <li role="menu-item">
                <a
                  onClick={() => {
                    dispatch(logout());
                    localStorage.clear();
                    deleteAllCookies();
                    history.push("/register");
                  }}
                >
                  Log out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
