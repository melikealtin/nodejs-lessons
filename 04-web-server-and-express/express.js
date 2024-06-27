const express = require("express");
const app = express();
const Joi = require('joi')

app.use(express.json())

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
  res.send(users);

  // if (req.query) {
  //   res.send(users.reverse());
  // } else {
  //   res.send(users);
  // }
});

app.get("/users/:id", (req, res) => {
  // console.log(req.params.id);
  // console.log(req.params);

  const foundUser = users.find((user) => user.id === parseInt(req.params.id));

  if (foundUser) {
    res.send(foundUser);
  } else {
    res.status(404).send(`user with ${req.params.id} id not found`);
  }
});

app.post('/users', (req,res) => {

  const {error} = validateUserInformation(req.body)

  if(error) {
    res.status(400).send(error.details[0].message)
  } else {
    const newUser = {
      id: users.length + 1,
      name : req.body.name,
      age: req.body.age
    }
  
    users.push(newUser)
    res.send(newUser)
  }
})

app.put('/users/:id', (req,res) => {

  const foundUser = users.find(user => user.id === parseInt(req.params.id))

  if(!foundUser) {
     return res.status(404).send(`user with ${req.params.id} id not found`)
  }

  const {error} = validateUserInformation(req.body)

  if(error) {
    res.status(400).send(error.details[0].message)
  } else {
    foundUser.name = req.body.name;
    foundUser.age = req.body.age;

    res.send(foundUser)
  }
})

app.delete('/users/:id', (req,res) => {
  const foundUser = users.find(user => user.id === parseInt(req.params.id))

  if(foundUser) {
    const index = users.indexOf(foundUser)
    users.splice(index, 1)
    res.send(foundUser)
    
  } else {
    res.status(404).send(`user with ${req.params.id} id not found`)
  }

})


function validateUserInformation(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    age: Joi.number().integer().min(10).max(99).required()
  })

  return schema.validate(user)
}

app.listen(3000, () => {
  console.log("serves is listening on port 3000");
});
