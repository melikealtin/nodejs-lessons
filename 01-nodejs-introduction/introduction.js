const myModule = require("./module.js");
const pcInfo = require("./pc-info-homework.js");

function sayHello() {
  console.log("hello Node.js");
  // console.log(window);
  global.console.log("this text came from global object");
}

sayHello();

console.log(myModule.name);
myModule.add(5, 10);
myModule.subtract(20, 10);
console.log(myModule.employee.age);

pcInfo.pcInfo();
