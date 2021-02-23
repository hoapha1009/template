import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
    /*
        Config auth firebase
    */
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Sign in with Google
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
