"use strict"
const fs = require('fs')

class Person {
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = new Date(created_at)
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = []
    this.data = null
    this.dataPeople()
  }

  get file() {
    return this._file
  }

  set people(newPerson) {
    this._people.push(newPerson)
  }

  readFilePerson(callback) {
    fs.readFile(this.file, 'utf-8', (err, data_person) => {
      if (err) throw err
      this.data = data_person.split('\n')
      callback()
    })
  }

  writeFilePerson(writeDataPerson) {
    fs.writeFile(this.file, writeDataPerson, (err) => {
      if (err) throw err;
    })
  }

  dataPeople() {
    this.readFilePerson(() => {
      for (let i = 1; i < this.data.length; i++) {
        let currentLine = this.data[i].split(',')

        let id = currentLine[0]
        let first_name = currentLine[1]
        let last_name = currentLine[2]
        let email = currentLine[3]
        let phone = currentLine[4]
        let created_at = currentLine[5]

        var person = new Person(id, first_name, last_name, email, phone, created_at)
        this.people = person
      }
    })
  }

  get people() {
    return {
      size: this._people.length,
      data: this._people
    }
  }

  addPerson(newPerson) {
    this.people = newPerson
  }

  save() {
    this.readFilePerson(() => {
      let headers = this.data[0].split(',')
      let newData = ''
      for (let i = 0; i < this.people.data.length; i++) {
        newData += Object.values(this.people.data[i]).join(',') + '\n'
      }
      this.writeFilePerson(`${headers}\n${newData}`)
    })
  }
}

const parser = new PersonParser('people.csv')

parser.readFilePerson(() => {
  parser.addPerson(new Person(`${parser.people.size + 1}`, 'Ari', 'Supriatna', 'arisupriatna703@gmail.com', '085777282844', new Date()))
  parser.save()
  console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
})

module.exports = { Person, PersonParser }