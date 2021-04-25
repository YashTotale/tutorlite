export interface FirestoreDate {
  seconds: number;
  nanoseconds: number;
}

export const convertFirestoreDate = (d: FirestoreDate): Date => {
  return new Date(d.seconds * 1000 + d.nanoseconds / 1000000);
};
