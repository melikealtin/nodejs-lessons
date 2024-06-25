const https = require("https");
const capitalWeather = require("./capital-weather")
const yargs = require('yargs')

yargs.command({
    command: "get",
    describe: "country to bring information",
    builder: {
      country: {
        describe: "enter country name in english",
        demandOption: "true",
        type: "string",
      }
    },
    handler(argv) {
        capitalWeather(argv.country)
    
    },
  });
  
  yargs.parse()






// https
//   .get("https://restcountries.com/v3.1/lang/turkish", (response) => {
//     let data = "";
//     response.on("data", (chunk) => {
//       // console.log(chunk);
//       data = data + chunk;
//     });

//     response.on("end", () => {
//       const jsonData = JSON.parse(data);

//       if (jsonData[0] != null) {
//         console.log(jsonData[0].name);
//       } else {
//         console.error("no data retrieved");
//       }
//     });
//   })
//   .on("error", (err) => {
//     console.log("ERROR: " + err.message);
//   });
