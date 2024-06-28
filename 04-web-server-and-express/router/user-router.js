const express = require("express");
const router = express.Router();
const Joi = require('joi')


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

router.get("/", (req, res) => {
  console.log(req.query);
  res.send(users);

  // if (req.query) {
  //   res.send(users.reverse());
  // } else {
  //   res.send(users);
  // }
});

router.get("/:id", (req, res) => {
  // console.log(req.params.id);
  // console.log(req.params);

  const foundUser = users.find((user) => user.id === parseInt(req.params.id));

  if (foundUser) {
    res.send(foundUser);
  } else {
    res.status(404).send(`user with ${req.params.id} id not found`);
  }
});

router.post("/", (req, res) => {
  const { error } = validateUserInformation(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    const newUser = {
      id: users.length + 1,
      name: req.body.name,
      age: req.body.age,
    };

    users.push(newUser);
    res.send(newUser);
  }
});

router.put("/:id", (req, res) => {
  const foundUser = users.find((user) => user.id === parseInt(req.params.id));

  if (!foundUser) {
    return res.status(404).send(`user with ${req.params.id} id not found`);
  }

  const { error } = validateUserInformation(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    foundUser.name = req.body.name;
    foundUser.age = req.body.age;

    res.send(foundUser);
  }
});

router.delete("/:id", (req, res) => {
  const foundUser = users.find((user) => user.id === parseInt(req.params.id));

  if (foundUser) {
    const index = users.indexOf(foundUser);
    users.splice(index, 1);
    res.send(foundUser);
  } else {
    res.status(404).send(`user with ${req.params.id} id not found`);
  }
});

function validateUserInformation(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    age: Joi.number().integer().min(10).max(99).required(),
  });

  return schema.validate(user);
}

module.exports = router