self.addEventListener("push", (e) => {
    console.log("push event data :", e.data);
     console.log("e :",  e.data.text());
     
    const config = {
        body :  e.data.text() || "Check out the new article!!",
        data : {
            dateOfArrival : Date.now(),
            primaryKey : "3"
        },
        icon: "images/logo.jpg",
        vibrate: [100,50,100],
        actions: [
            {
                action : "explore",
                title: "Explore"
            },
            {
                action : "close",
                title: "Close notification"
            }
        ]

    }
    e.waitUntil(self.registration.showNotification("New article added", config))

})
