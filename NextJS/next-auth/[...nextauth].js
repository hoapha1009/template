import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../lib/auth"; // hàm chuyển đổi hashedPass -> pass
import { connectToDatabase } from "../../../lib/db"; // hàm kết nối dtb

export default NextAuth({
    // biến nó thành JWT
    session: {
        jwt: true,
    },
    providers: [
        // Dùng custom tự bắt lỗi xác minh
        Providers.Credentials({
            async authorize(credentials) {
                const client = await connectToDatabase();
                const db = client.db();
                const userCollection = db.collection("users");

                const user = await userCollection.findOne({
                    email: credentials.email,
                });

                // ko có user
                if (!user) {
                    client.close();
                    throw new Error("No user found!");
                }

                const isValid = await verifyPassword(
                    credentials.password,
                    user.password
                );

                // sai mật khẩu
                if (!isValid) {
                    client.close();
                    throw new Error("Password wrong!");
                }

                client.close();
                return { email: user.email };
            },
        }),
    ],
});
