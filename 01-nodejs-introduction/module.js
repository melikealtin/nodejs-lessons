const personName = "melike";

function add(a, b) {
  console.log(a + b);
}

exports.name = personName;
exports.add = add;

exports.subtract = function(a, b) {
  console.log(a - b);
};

exports.employee = {
  name: "melike",
  age: 25,
};
