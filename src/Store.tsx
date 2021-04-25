// React Imports
import React, { FC } from "react";

// Redux Imports
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
  Action,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";

// Firebase Imports
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/performance";
import "firebase/firestore";
import { firebaseConfig } from "./utils/config";
import {
  getFirebase,
  actionTypes as rrfActionTypes,
  firebaseReducer,
  ReactReduxFirebaseProvider,
  FirebaseReducer,
  FirestoreReducer,
} from "react-redux-firebase";
import {
  getFirestore,
  constants as rfConstants,
  createFirestoreInstance,
  firestoreReducer,
} from "redux-firestore";

// Redux Persist Imports
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import storage from "redux-persist/lib/storage";

// Reducer Imports
import { homeReducer } from "./redux/home.slice";
import { exploreReducer } from "./redux/explore.slice";
import { scheduleReducer } from "./redux/schedule.slice";

export interface Message {
  text: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
  user: string;
}

export interface Chat {
  users: string[];
  messages: Message[];
}

export interface Profile {
  name: string;
  picture: string;
  school: string;
  bio: string;
  type: "tutor" | "student";
  subjects: string[];
  grade: number;
  chats: string[];
}

interface State {
  home: any;
  explore: any;
  schedule: any;
  firebase: FirebaseReducer.Reducer<Profile, Record<string, unknown>>;
  firestore: FirestoreReducer.Reducer;
}

const rootPersistConfig = {
  version: 1,
  storage,
  blacklist: ["home", "schedule"],
};

const reducers = combineReducers<State>({
  home: homeReducer,
  explore: exploreReducer,
  schedule: scheduleReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

const persistedReducer = persistReducer<State>(
  { ...rootPersistConfig, key: "root" },
  reducers
);

const extraArgument = {
  getFirebase,
  getFirestore,
};

const rootReducer = (state: any, action: PayloadAction) => {
  if (action.type === "logout/logout") {
    console.log("logging out...");
    state = undefined;
  }
  return persistedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
        ...Object.keys(rfConstants.actionTypes).map(
          (type) => `${rfConstants.actionsPrefix}/${type}`
        ),
        ...Object.keys(rrfActionTypes).map(
          (type) => `@@reactReduxFirebase/${type}`
        ),
      ],
      ignoredPaths: ["firebase", "firestore"],
    },
    thunk: {
      extraArgument,
    },
  }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export type AppThunk = ThunkAction<
  void,
  RootState,
  typeof extraArgument,
  Action<string>
>;

export const getState = store.getState;

const persistor = persistStore(store);

firebase.initializeApp(firebaseConfig);

firebase.firestore();
firebase.performance();
firebase.analytics.isSupported().then((supported) => {
  if (supported) firebase.analytics();
});

const ReduxStore: FC = ({ children }) => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        dispatch={store.dispatch}
        firebase={firebase}
        config={{
          useFirestoreForProfile: true,
          userProfile: "users",
        }}
        createFirestoreInstance={createFirestoreInstance}
      >
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          {children}
        </PersistGate>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
};

export default ReduxStore;
