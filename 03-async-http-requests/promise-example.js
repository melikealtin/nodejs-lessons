// const myPromise = new Promise((resolve,reject) => {
//     console.log("3 second process started");
//     setTimeout(() => {
//         console.log("process finished");

//         // resolve("process result")
//         reject("error appeared")

//     },3000)
// })

// myPromise.then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log("ERROR: " + err );
// })

console.log("Start");
console.log("Finish");

function getUser(id) {
    return new Promise((resolve, reject) => {
        console.log("fetching user with id " + id);

        setTimeout(() => {
          resolve({ id: id, name: "melike" });
        }, 1500);

    })
}

function getCourse(userName) {
    return new Promise((resolve, reject) => {
        console.log(userName + "'s courses will be fetched");

        setTimeout(() => {
          resolve(["Vue.js", "React", "Angular"]);
        }, 2000);

    })
}

function getComments(courseName) {
    return new Promise((resolve,reject) => {
        console.log(courseName + " course comments will be fetched");
        setTimeout(() => {
          reject("great course");
        }, 2000);

    })
}

// getUser(123)
// .then(userObj => getCourse(userObj.name))
// .then(courseArray => getComments(courseArray[0]))
// .then(comment => console.log(comment))
// .catch(err => console.log(err))


// async-await
async function fetchComment() {

    try {
        const userObj = await getUser(123)
        const courseArray = await getCourse(userObj.name)
        const comment = await getComments(courseArray[0])
        console.log(comment);
    } catch(e) {
         console.log("ERROR: " + e);   
    }

}

fetchComment()