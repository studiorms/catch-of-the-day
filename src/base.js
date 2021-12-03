import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "apiKey",
    authDomain: "authDomain",
    databaseURL: "databaseURL",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a name export
export { firebaseApp };

// This is a default export
export default base;
