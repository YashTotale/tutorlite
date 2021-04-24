import user from "../img/user.svg";
import { useHistory } from "react-router";

export default function Nav() {
  const history = useHistory();

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
            <a onClick={() => history.push("/explore")}>Find Tutors</a>
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
              Evan Tu
            </a>
            <ul className="dropdown-menu dropdown-animated" role="menu">
              <li role="menu-item">
                <a onClick={() => history.push("/register")}>Log out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
