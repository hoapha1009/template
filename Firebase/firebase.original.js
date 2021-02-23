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

export default firebase;
