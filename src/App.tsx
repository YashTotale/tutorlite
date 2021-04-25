import React from "react";
import "cirrus-ui";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Nav from "./components/Navbar";
import Schedule from "./pages/Schedule";
import User from "./pages/User";
import Chat from "./pages/Chat";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

function App() {
  const uid = useSelector<any>((state) => state.firebase.auth.uid);
  const history = useHistory();

  if (uid === undefined) {
    history.push("/register");
  }

  return (
    <Switch>
      <Route exact path="/">
        <Nav />
        <section className="section">
          <div className="hero fullscreen">
            <div
              style={{
                width: "100%",
                padding: "3rem 1.5rem",
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <div style={{ margin: "0 auto 1.5em", width: "80%" }}>
                <Home />
              </div>
            </div>
          </div>
        </section>
      </Route>
      <Route exact path="/explore">
        <Nav />
        <section className="section">
          <div className="hero fullscreen">
            <div
              style={{
                width: "100%",
                padding: "3rem 1.5rem",
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <div style={{ margin: "0 auto 1.5em", width: "100%" }}>
                <Explore />
              </div>
            </div>
          </div>
        </section>
      </Route>
      <Route exact path="/profile">
        <Nav />
        <section className="section">
          <div className="hero fullscreen">
            <div className="hero-body">
              <div className="content">
                <Profile />
              </div>
            </div>
          </div>
        </section>
      </Route>
      <Route exact path="/schedule">
        <Nav />
        <section className="section">
          <div className="hero fullscreen">
            <div
              style={{
                width: "100%",
                padding: "3rem 1.5rem",
                marginTop: 30,
                marginBottom: 20,
              }}
            >
              <div className={"u-flex u-flex-column u-items-center"}>
                <Schedule />
              </div>
            </div>
          </div>
        </section>
      </Route>
      <Route exact path="/chat">
        <Nav />
        <section className="section">
          <div className="hero fullscreen">
            <div
              style={{
                width: "100%",
                padding: "3rem 1.5rem",
                marginTop: 30,
                marginBottom: 20,
              }}
            >
              <div className={"u-flex u-flex-column u-items-center"}>
                <Chat />
              </div>
            </div>
          </div>
        </section>
      </Route>
      <Route exact path="/user">
        <Nav />
        <section className="section">
          <div className="hero fullscreen">
            <div
              style={{
                width: "100%",
                padding: "3rem 1.5rem",
                marginTop: 30,
                marginBottom: 20,
              }}
            >
              <div className={"u-flex u-flex-column u-items-center"}>
                <User />
              </div>
            </div>
          </div>
        </section>
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route path="*">404. The URL you requested could not be found.</Route>
    </Switch>
  );
}

export default App;
