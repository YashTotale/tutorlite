import { FirebaseReducer } from "react-redux-firebase";
import { RootState } from "../Store";

export const getUser = (state: RootState): FirebaseReducer.AuthState =>
  state.firebase.auth;
