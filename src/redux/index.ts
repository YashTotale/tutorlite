import { FirebaseReducer, TypeWithId } from "react-redux-firebase";
import { RootState, Profile, Chat } from "../Store";

export const getUser = (state: RootState): FirebaseReducer.AuthState =>
  state.firebase.auth;

export const getProfile = (
  state: RootState
): FirebaseReducer.Profile<Profile> => state.firebase.profile;

export const getChats = (state: RootState): TypeWithId<Chat>[] =>
  state.firestore.ordered.chats;

export const getChatsObj = (state: RootState): Record<string, Chat> =>
  state.firestore.data.chats;

export const getChatsLoading = (state: RootState): boolean =>
  state.firestore.status.requesting.chats;

export const getUsers = (state: RootState): Record<string, Profile> =>
  state.firestore.data.users;

export const getUsersLoading = (state: RootState): boolean =>
  state.firestore.status.requesting.users;
