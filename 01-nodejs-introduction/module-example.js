const path = require('path');
const fs = require('fs');


const pathObject = path.parse(__dirname)
console.log(pathObject.dir);


fs.readdir('./' , {withFileTypes: true}, function(err, files) {

    if(err) console.log("Error", err);
    console.log(files[0].isDirectory());
})