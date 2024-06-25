// const promiseSuccesfull = Promise.resolve("successfully concluded promise");
// const promiseWrong = Promise.reject(new Error("error occurred"));

// promiseSuccesfull.then((result) => console.log(result));

// promiseWrong
// .then((result) => console.log(result))
// .catch((e) => console.log(e));

const fetchUserData = new Promise((resolve, reject) => {
  setTimeout(() => {
    // reject("fetchUserData error");
    resolve("user data fetched after 5 seconds");
  }, 5000);
});

const fetchOrderData = new Promise((resolve, reject) => {
  setTimeout(() => {
    // reject("fetchOrderData error");
    resolve("order data fetched after 4 seconds");
  }, 4000);
});

const allDataFetched = Promise.all([fetchUserData, fetchOrderData]);

allDataFetched
  .then((results) => console.log(results))
  .catch((error) => console.log(error));


const promiseRace = Promise.race([fetchUserData, fetchOrderData]) 
promiseRace.then(result => console.log("race: " + result))
