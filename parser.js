"use strict"
const fs = require('fs')

class Person {
  constructor(id, firstName, lastName, email, phone, createdAt) {
    this._id = id;
    this._first_name = firstName;
    this._last_name = lastName;
    this._email = email;
    this._phone = phone;
    this._created_at = createdAt;
  }

  get id() {
    return this._id;
  }

  get first_name() {
    return this._first_name;
  }

  get last_name() {
    return this._last_name;
  }

  get email() {
    return this._email;
  }

  get phone() {
    return this._phone;
  }

  get created_at() {
    return this._created_at;
  }

  set first_name(fName) {
    this._first_name = fName;
  }

  set last_name(lName) {
    this._last_name = lName;
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = []
    this._data = null
  }

  get file() {
    return this._file
  }

  get people() {
    return this._people
  }

  get data() {
    return this._data
  }

  set people(newData) {
    this._people = newData
  }

  set data(newData) {
    this._data = newData
  }

  parsingData() {
    let splitData = this.data.split('\n');
    let containArr = []
    for(let i = 0; i < splitData.length; i++) {
      containArr.push(splitData[i].split(','))
    }

    for(let j = 1; j < containArr.length; j++) {
      let id = containArr[j][0]
      let fName = containArr[j][1]
      let lName = containArr[j][2]
      let email = containArr[j][3]
      let phone = containArr[j][4]
      let createdAt = containArr[j][5]
      let personObj = new Person(id, fName, lName, email, phone, createdAt)
      this.people.push(personObj)
    }
  }

  readFile(cb) {
    fs.readFile(this.file, 'utf8', (err, dataFile) => {
      (!err) ? this.data = dataFile : console.log(err);
      cb();
    })
  }

  writeFile(newPerson) {
    fs.writeFile(this.file, newPerson, (err) => {
      (err) ? console.log(err) : 'Write Successfully!'
    })
  }

  addPerson(id, fName, lName, email, phone, createdAt = new Date()) {
    let newPerson = new Person(id, fName, lName, email, phone, createdAt)
    let str = ''
    this.people.push(newPerson)
    for(let i = 0; i < this.people.length; i++) {
      for(let keys in this.people[i]) {
        str += this.people[i][keys] + ','
      }
      str += '\n'
    }
    let modStr = str.slice(0, str.length -1)
    this.writeFile(modStr)
  }

}

let parser = new PersonParser('people.csv')
parser.readFile(() => {
  parser.parsingData()
  parser.addPerson('201', 'Fajar', 'Kerween', 'fajar@mail.com', '0822-1152-3242');
  console.log(parser.people); // parse data and create new Person sucess to array
  // console.log(`There are ${parser.people} people in the file '${parser.file}'.`)
})

