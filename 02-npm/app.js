const yargs = require("yargs");
const person = require("./person");

// console.log(process.argv);
// console.log(process.argv[2]);
// console.log(process.argv[3]);
// console.log(process.argv[0]);

let command = process.argv[2];
if (command == "add") {
  // console.log("will be added");
}



yargs.command({
  command: "add",
  describe: "used to add people",
  builder: {
    name: {
      describe: "person name to add",
      demandOption: "true",
      type: "string",
    },
    phone: {
      describe: "person phone to add",
      demandOption: "true",
      type: "string",
    },
  },
  handler(argv) {
    // console.log("name: " + argv.name + " phone: " + argv.phone);
    person.addPerson(argv.name, argv.phone);
  },
});

yargs.command({
  command: "delete",
  describe: "used to delete people",
  builder: {
    name: {
      describe: "person name to delete",
      demandOption: "true",
      type: "string",
    },
  },
  handler(argv) {
    // console.log("name: " + argv.name);
    person.deletePerson(argv.name);
  },
});

yargs.command({
  command: "show",
  describe: "used to show people",
  builder: {
    name: {
      describe: "person name to list",
      demandOption: "true",
      type: "string",
    },
  },
  handler(argv) {
    // console.log("name: " + argv.name);
    person.showPerson(argv.name);
  },
});

yargs.command({
  command: "list",
  describe: "used to list people",
  handler(argv) {
    // console.log("all people list");
    person.listPersons();
  },
});

yargs.version("1.2.4");
// console.log(yargs.argv);

yargs.parse();
