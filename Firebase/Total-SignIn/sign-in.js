// trong component sign in

import { auth } from "../Firestore/setup-firestore/setup-firestore";

// ở form submit: async
try {
    // đăng nhập user vào firebase
    await auth.signInWithEmailAndPassword(email, password);
} catch (error) {
    console.log(error);
}
