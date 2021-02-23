import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
    /*
        Config auth firebase
    */
};

firebase.initializeApp(config);

//use fire store với thông tin truyền vào: additionalData
export const createUserProfileDocument = async (userAuth, additionalData) => {
    // nếu ko đăng nhập thì hủy
    if (!userAuth) return;

    // lấy data ở 'users/${userAuth.uid}'
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    // nhận object chứa thông tin
    const snapShot = await userRef.get();

    // check xem object nhận có tồn tại dữ liệu ko
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createAt = new Date();

        try {
            /* dựa trên các thao tác với firestore: 
                set() --- create,
                get() --- retrie,
                update() --- update,
                delete() ---

                + Có thể add doc vào collection = cách: collectionRef.add({value: prop})
            */
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData,
            });
        } catch (error) {
            console.log(" error: ", error.message);
        }
    }

    return userRef;
};
/* ---------- */

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Sign in with Google
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
/* ---------- */

export default firebase;

/* 
    Check xem doc có tồn tại chưa = query: .exists
    hoặc .data()
*/
