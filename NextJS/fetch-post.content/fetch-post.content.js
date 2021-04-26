async function addMeetupHandler(enteredMeetupData) {
    // enteredMeetupData: nội dung gửi
    const response = await fetch("/api/new-meetup", {
        method: "POST",
        body: JSON.stringify(enteredMeetupData), //nhớ jS.stringify
        headers: {
            "Content-Type": "application/json", // headers
        },
    });

    const data = await response.json();

    // Chuyển về trang chủ
    router.push("/");
}
