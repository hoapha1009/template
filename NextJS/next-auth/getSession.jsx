// trang thông tin user: chỉ khi log in vào thì mới vào dc, còn ko thì chuyển qa Auth
import { getSession } from "next-auth/client"; // dùng hàm getSession lấy session thay useSession
import { useEffect, useState } from "react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
    // Redirect away if NOT auth
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // dùng hàm getSession để lấy tức thì session, vì useSession ko có lấy lập tức
        getSession().then((session) => {
            // nếu chưa log in thì chuyển qa trang auth
            if (!session) {
                window.location.href = "/auth";
            } else {
                // nếu có r thì bỏ trang thái loading để tải trang
                setIsLoading(false);
            }
        });
    }, []);

    if (isLoading) {
        return <p className={classes.profile}>Loading...</p>;
    }

    return (
        <section className={classes.profile}>
            <h1>Your User Profile</h1>
            <ProfileForm />
        </section>
    );
}

export default UserProfile;
