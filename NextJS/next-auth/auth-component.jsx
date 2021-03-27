import { signOut, useSession, signIn } from "next-auth/client";

function AuthComponent() {
    // sử dụng hook: useSession để lấy dữ liệu auth
    const [session, loading] = useSession();

    // signOut gán cho nút log out
    const logOutHandler = () => {
        signOut();
    };

    // Sử dụng session và loading để hiển thị các link
    {
        !session && !loading && (
            <li>
                <Link href="/auth">Login</Link>
            </li>
        );
    }
    {
        session && (
            <li>
                <Link href="/profile">Profile</Link>
            </li>
        );
    }
    {
        session && (
            <li>
                <button onClick={logOutHandler}>Logout</button>
            </li>
        );
    }
}

// trong hàm submit của form login/signup, ta check rồi dùng function thích hợp
const submitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {
        // Dùng hàm signIn của next-auth để đăng nhập
        const rs = await signIn("credentials", {
            // redirect này chỉnh 'false' để không tự chuyển sang trang Error
            redirect: false,
            email: enteredEmail,
            password: enteredPassword,
        });

        console.log(rs);
    } else {
        // tạo đăng ký
        try {
            const rs = await createdUser(enteredEmail, enteredPassword);
            console.log(rs);
        } catch (error) {
            console.log(error);
        }
    }
};
