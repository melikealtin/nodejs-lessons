console.log("start");

setTimeout(() => {
  console.log("3 second process finished");
}, 3000);

setTimeout(() => console.log("0 secons process finished"), 0);

console.log("end");
