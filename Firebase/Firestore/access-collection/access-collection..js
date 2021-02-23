import firebase from "firebase/app";
import "firebase/firestore";

const firestore = firebase.firestore();

//Access collection doc at '/users/userId/ele/eleId'
firestore.collection("users").doc("userId").collection("ele").doc("eleId");

//or
firestore.doc("/users/userId/ele/eleId");

//or
firestore.collection("/users/userId/ele");
