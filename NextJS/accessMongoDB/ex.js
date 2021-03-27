// yarn add mongodb
// create Cluster in MongoDB web
// Lấy url truy cập và set IP kết nối

import { MongoClient } from "mongodb";

// thêm vào DB
//* Quan trọng
const client = await MongoClient.connect("urlConnect");
const db = client.db();

await db.collections("collectionName").insertOne({
    key: value,
});

// * Qan trọng!
client.close();

// lấy data
const client = await MongoClient.connect("urlConnect");
const db = client.db();

await db.collections("collectionName").find().sort({ _id: -1 }).toArray();

// ** Quan trọng:
/* Làm với database nhớ bắt lỗi ko kết nối dc với try catch */

// Ví dụ nè:
let client;
const uri =
    "mongodb+srv://hoapha1009:bb8WsPeh4AMCiH3o@cluster0.lgqzx.mongodb.net/my-site?retryWrites=true&w=majority";

try {
    client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
} catch (error) {
    console.log(error);
    res.status(500).json({ message: "Could not connect to database." });
    return;
}

const db = client.db();

try {
    const rs = await db.collection("messages").insertOne(newMessage);
    newMessage.id = rs.insertedId;
} catch (error) {
    client.close();
    res.status(500).json({ message: "Storing message failed!" });
    return;
}

client.close();

res.status(201).json({
    message: "Successfully stored message",
    message: newMessage,
});
