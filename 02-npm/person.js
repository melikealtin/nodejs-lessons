const fs = require("fs");
const path = require("path");


const filePath = path.join(__dirname, "persons.json");

const addPerson = (name, phone) => {
  console.log(`Person to add: ${name} , ${phone}`);
  const persons = readPeopleFromFile();

  if (persons.some(person => person.name === name)) {

    console.log("person already registered");
  } else {
    persons.push({ name, phone });
    writePeopleToFile(persons);
  }

};

const writePeopleToFile = (persons) => {

  try {
    const jsonData = JSON.stringify(persons, null, 2);
    fs.writeFileSync(filePath, jsonData);
  } catch (error) {
    console.error(`error: ${error.message}`);
  }

};

const readPeopleFromFile = () => {

  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    } else {
      console.error(`error: ${error.message}`);
      throw error;
    }
  }

};

const deletePerson = (name) => {
  console.log(`Person to delete: ${name}`);
  const allPersons = readPeopleFromFile()

  const filteredPersons = allPersons.filter(person => person.name !== name);

  if (allPersons.length > filteredPersons.length) {
    writePeopleToFile(filteredPersons);
    console.log("person found and deleted");
  } else {
    console.log("no person found with that name");
  }

};

const showPerson = (name) => {
  console.log(`Person to show: ${name}`);
  const persons = readPeopleFromFile();
  const person = persons.find(person => person.name === name);

  if (person) {
    console.log(person);
  } else {
    console.log(`no person found with the name ${name}`);
  }
 

};

const listPersons = () => {
  console.log("All persons:");
  const persons = readPeopleFromFile();

  if (persons.length === 0) {
    console.log("no persons registered.");
  } else {
     persons.forEach(person => {
      console.log(`name: ${person.name} phone: ${person.phone} `);
     });
  }

};

module.exports = {
  addPerson,
  deletePerson,
  showPerson,
  listPersons,
};
