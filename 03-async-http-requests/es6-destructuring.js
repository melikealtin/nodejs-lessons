//array destructuring
let personName = ["melike", "altin"];
// const firstName = personName[0]
// const lastName = personName[1]
// console.log(firstName+ " " + lastName);

let [firstName, lastName] = personName;
console.log(firstName + " " + lastName);

let [a, b] = "melike altin".split(" ");
console.log(a);
console.log(b);

let [first, , end] = ["yellow", "blue", "white"];
console.log(first + " " + end);

let user = {};
[user.name, user.lastName] = "melike altin".split(" ");
console.log(user);

let [name1, name2, ...name3] = ["emre", "ali", "fatma", "kerem", "ece"];
console.log(name3);

let [s1 = "unknown", s2 = "unknown"] = ["hello"];
console.log(s1 + " " + s2);

//object destructuring
const employee = {
  name: "melike",
  surName: "altin",
  age: 25,
  city: "bursa",
};

const { name, surName, age, city } = employee;

console.log(name + " " + surName + " " + age + " " + city);

const book = {
  title: "We humans",
  author: "Peyami Safa",
};

const { title: bookName, author: writer } = book;
console.log(bookName + " " + writer);

const job = "engineer";
const country = "japan";

const worker = {
  job,
  country,
  age: 25,
  city: "tokyo",
};

const { job: j, city: c, ...theRest } = worker;
console.log(theRest);

const userProfile = {
  username: "melikealtin",
  email: "user@example.com",
  address: {
    street: "123 main st",
    city: "bursa",
    zip: "12345",
  },
};

const {
  username,
  email,
  address: { street },
} = userProfile;
console.log(`${username} ${street}`);

function showPerson(
  name = "unknown",
  age = 0,
  height = 160,
  favoriteColors = []
) {}

showPerson("melike", undefined, undefined, ["purple", "blue"]);


const params = {
    name: "melo",
    age:25 ,
    favoriteColors: ["purple, blue"]
}

showUser(params) 

function showUser({name = "unknown", favoriteColors = [] , age=0 }){
    console.log(name + " " +age);
}
