export const getStaticPaths = async () => {
    // lấy data
    const data = await getData();

    // lấy Array Id
    const ids = data.products.map((product) => product.id);

    // Tạo object params từ array
    const pathsWithParams = ids.map((id) => ({
        params: {
            pid: id,
        },
    }));

    return {
        paths: pathsWithParams,
        fallback: false,
    };
};

// Ví dụ:
export async function getStaticPaths() {
    const client = await MongoClient.connect(
        "mongodb+srv://hoapha10093:Hello123123@cluster0.lgqzx.mongodb.net/meetup-data?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
        fallback: "blocking",
        paths: meetups.map((meetup) => ({
            params: { meetupId: meetup._id.toString() },
        })),
    };
}

export async function getStaticProps(context) {
    // fetch data for a single meetup
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(
        "mongodb+srv://hoapha10093:Hello123123@cluster0.lgqzx.mongodb.net/meetup-data?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const selectedMeetup = await meetupsCollection.findOne({
        _id: ObjectId(meetupId), // ObjectId lấy từ {mongodb}, để phù hợp với _id: ObjectId('xxxxx')
    });

    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            },
        },
    };
}
