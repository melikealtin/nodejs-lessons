const express = require("express");
const app = express();

const users = [
  {
    id: 1,
    name: "melo",
    age: 25,
  },
  {
    id: 2,
    name: "nunu",
    age: 27,
  },
];

app.get("/", (req, res) => {
  console.log("home page");
  res.send("hello from index !");
});

app.get("/about", (req, res) => {
  console.log("about page");
  res.send("hello from about page !");
});

app.get("/users", (req, res) => {
  console.log(req.query);
if(req.query) {
    res.send(users.reverse())

}

  
});

app.get("/users/:id", (req,res) => {
    // console.log(req.params.id);
    // console.log(req.params);

    const foundUser = users.find(user => user.id === parseInt(req.params.id))

    if(foundUser) {
        res.send(foundUser)
    }else {
        res.status(404).send(`user with ${req.params.id} id not found`)
    }


})

app.listen(3000, () => {
  console.log("serves is listening on port 3000");
});
