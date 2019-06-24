"use strict"

const fs = require('fs')

class Person {
  constructor (id, firstName, lastName, email, phone, createdAt){
    this.id = id;
    this.first_name = firstName;
    this.last_name = lastName;
    this.email = email;
    this.phone = phone;
    this.created_at = createdAt;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._data = null
    this._people = []
  }

  get people() {
    return this._people;
  }

  set people (person){
    return this._people.push(person);
  }

  get data (){
    return this._data;
  }

  set data (newData){
    return this._data = newData;
  }

  get file (){
    return this._file;
  }

  addPerson(newPerson) {
    return this.people = newPerson;
  }

  readFile(cb){
    fs.readFile(this.file, 'utf8', (err, data)=> {
      if (err){
        console.log(err.message);
      } else {
        this.data = data;
      }
      cb()
    })
  }

  parsing(){
    let peopleArr = this.data.split('\n');
    peopleArr.shift();

    for (let i in peopleArr){
      let param = peopleArr[i].split(',');
      let person = new Person (param[0], param[1], param[2], param[3], param[4], param[5]);
      this.people = person;
    }
  }

  saveFile(){
    let mainStr = '';
    let keysStr = Object.keys(this.people[0]);
    mainStr += keysStr.join(',');

    for (let i in this.people){
      mainStr += `\n${this.people[i].id},${this.people[i].first_name},${this.people[i].last_name},${this.people[i].email},${this.people[i].phone},${this.people[i].created_at}`
    }
    fs.writeFile(this.file, mainStr, (err)=> {
      if (err){
        console.log(err.message);
      } else {
        console.log('data saved to file successfully');
      }
    });
  }
}

let parser = new PersonParser('people.csv')
let brian = new Person (999, 'brian', 'fury', 'a@a.com', 1234, new Date())


parser.readFile(()=>{
  parser.parsing();
  parser.addPerson(brian);
  parser.saveFile();
})


// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
