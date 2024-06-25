//callback hell
console.log("program started");

getUser(123, processUser);

function processUser(userObject) {
  getCourse(userObject.name, processCourses);
}

function processCourses(courseArray) {
  getComments(courseArray[0], processComments);
}

function processComments(comment) {
  console.log(comment);
}

console.log("program finished");

function getUser(id, callback) {
  console.log("fetching user with id " + id);

  setTimeout(() => {
    callback({ id: id, name: "melike" });
  }, 1500);
}

function getCourse(userName, callback) {
  console.log(userName + "'s courses will be fetched");

  setTimeout(() => {
    callback(["Vue.js", "React", "Angular"]);
  }, 2000);
}

function getComments(courseName, callback) {
  console.log(courseName + " course comments will be fetched");
  setTimeout(() => {
    callback("great course");
  }, 2000);
}
