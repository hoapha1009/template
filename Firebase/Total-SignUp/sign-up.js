// trong component sign up

import {
    auth,
    createUserProfileDocument,
} from "../Firestore/setup-firestore/setup-firestore";

// ở form submit: async
try {
    // đăng ký user vào firebase
    const { user } = await auth.createUserWithEmailAndPassword(email, password);

    // ghi lại và lưu vào fire store tên tài khoản
    await createUserProfileDocument(user, { displayName });
} catch (error) {
    console.log(error);
}
