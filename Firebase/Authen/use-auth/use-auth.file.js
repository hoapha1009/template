import { auth } from "../google-auth/firebase.ultils";

// use in componentDidMount or useEffect
auth.onAuthStateChanged((user) => {
    this.setState({ currentUser: user });
});

//dùng xong nhớ return null ở  compnentWillUnMount nó đi
