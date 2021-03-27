import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

const handler = async (req, res) => {
    if (req.method !== "PATCH") return;

    const session = await getSession({ req: req });

    if (!session) {
        res.status(401).json({ message: "Not authenticated!!!" });
        return;
    }

    const userEmail = session.user.email;
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;

    const client = await connectToDatabase();
    const db = client.db();

    const user = await db.collection("users").findOne({ email: userEmail });

    if (!user) {
        res.status(404).json({ message: "User not found!" });
        client.close();
        return;
    }

    const currentPassword = user.password;

    const passwordsAreEqual = await verifyPassword(
        oldPassword,
        currentPassword
    );

    if (!passwordsAreEqual) {
        res.status(403).json({ message: "Invalid old password" });
        client.close();
        return;
    }

    const hashedPassword = await hashPassword(newPassword);

    await db
        .collection("users")
        .updateOne(
            { email: userEmail },
            { $set: { password: hashedPassword } }
        );

    client.close();
    res.status(200).json({ message: "Changed password successfully!!!" });
};

export default handler;
