const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

// web push settings
const webPush = require("web-push")
const vapidKeys =  {
  publicKey: 'BM4USgeTIDxavs0JYtAfkUSP4-nB_jX4DZBJscOzx1gk0nWnC4xSvfB56tdSxeZX4UB0Bh2mrpWMRlZEy2ZMlKc',
  privateKey: 'D4HyC4HMKplBPg-y8PgALYMD5WQIu5srTZjYv8lyOas'
}

webPush.setVapidDetails("mailto:info@test.com", vapidKeys.publicKey, vapidKeys.privateKey)

const PORT = process.env.PORT || 3000
let { categoryList } = require("./data")

console.log(categoryList);


app.get("/", (req,res) => {
    res.status(200).send({categoryList})
})

app.post("/subscribe/:categoryId", (req, res) => {
   if (req.params.categoryId && req.body.subscriber) {
    const matchedCategory = categoryList.find((c) => c.id == req.params.categoryId);
    if (!matchedCategory) return res.status(404).send({ message: "Category not found" });

    matchedCategory.subscriberList.push(req.body.subscriber);
    return res.status(201).send({
      message: `Congratulations! You will be the first to know when a topic is added to ${matchedCategory.title}!`,
      category: {
        id: matchedCategory.id,
        title: matchedCategory.title,
      },
    });
  } else {
    return res.status(400).send({ message: "Missing information sent" });
  }
  
})

app.post("/send_notification/:categoryId", (req, res) => {
  if (req.params.categoryId && req.body.message) {
    const matchedCategory = categoryList.find((c) => c.id == req.params.categoryId);
    if (!matchedCategory) return res.status(404).send({ message: "Category not found" });

    const subscriberList = matchedCategory.subscriberList || [];

    subscriberList.forEach((sub) => {
      webPush.sendNotification(sub, req.body.message);
    });

    return res.status(201).send({
      message: `Notifications sent`,
    });
  } else {
    return res.status(400).send({ message: "Missing information sent" });
  }
});

app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
    
})