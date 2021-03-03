import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    //config
};

firebase.initializeApp(config);

// create doc fire store
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch (error) {
            console.log("error creating user", error.message);
        }
    }

    return userRef;
};

// add shop data into firestorm
export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch(); //batch kiểu set up tất cả set vào cùng 1 action để set. phòng trường hợp bị gián đoạn khi up làm mất dữ liệu
    objectsToAdd.forEach((obj) => {
        const newDocRef = collectionRef.doc(); //tạo uid cho newDocRef
        batch.set(newDocRef, obj); //set data: obj vào newDocRef đó
    });

    return await batch.commit(); // chạy up lên
};

// GET DATA FROM FIRESTORE TO APP
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map((doc) => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items,
        };
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// auth google
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;

/* 
    Trong component xài dùng ở DidMount or Effect:
        const collectionRef = firestore.collection('collection name')

        collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            dispatch(add vào redux)
        })
*/
