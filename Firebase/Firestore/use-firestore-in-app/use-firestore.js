import { auth } from "../google-auth/firebase.ultils";
import { createUserProfileDocument } from "../setup-firestore/setup-firestore";

// use in componentDidMount or useEffect
auth.onAuthStateChanged((userAuth) => {
    // lấy data users đã lưu từ fire store về app
    if(userAuth){
        // dùng hàm createUserProfileDocument đã tạo ở firebase.utils
        const userRef = await createUserProfileDocument(userAuth)

        // lấy dữ liệu gắn vào state
        userRef.onSnapshot(snapShot => {
            this.setState({
                currentUser: {
                    id: snapShot.id,
                    ...snapShot.data()
                }
            })
        })
    }

    this.setState({currentUser: userAuth})
});

//dùng xong nhớ return null ở  compnentWillUnMount nó đi
