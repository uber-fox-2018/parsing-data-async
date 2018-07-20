"use strict"
const fs = require('fs')

class Person {
  constructor(id, first_name, last_name, email, phone,) {
    this._id = id
    this._first_name = first_name
    this._last_name = last_name
    this._email = email
    this._phone = phone
    this._created_at = null
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
    this._data = null //di isi null bukan di isi this.read() karena biar bisa lempar lemparan cb
  }

  get people() {
    let dataPeople = {
      size: this._people.length,
      data: this._people
    }
    return dataPeople
  }

  addPerson(newPerson) {
    // let stringCSV = ''
    return this._people.push(newPerson) 
    // for(let i = 0; i<this._people.length; i++){
    //   for(var key in this._people[i]){
    //     stringCSV = stringCSV + this._people[i][key]+','
    //   }
    //   stringCSV+='\n'
    // }
    // return stringCSV
  }

  write(cb){
    let stringCSV = ''
    for(let i = 0; i<this._people.length; i++){
      this._people[this._people.length-1]._created_at = new Date()
      for(var key in this._people[i]){
        stringCSV = stringCSV + this._people[i][key]+','
      }
      stringCSV+='\n'
    }

    fs.writeFile(this._file,stringCSV,(err,data)=>{
      if(err){
        throw err
      }
      cb()
    })
    


  }

  read(cb) {
    fs.readFile(this._file,'utf8',(err, data) => {
      if (err) {
        throw err
      }
      this._data = data
      cb()
    })
  }

  parse() {
    this._data = this._data.split('\n')
    this._people = []
    for (let i = 0; i < this._data.length; i++) {
      let personString = this._data[i].split(',')
      let personObj = new Person(personString[0], personString[1], personString[2], personString[3], personString[4])
      personObj._created_at = new Date(personString[5])
      this._people.push(personObj)
    }
  }



}

let parser = new PersonParser('people.csv')
let bambang  = new Person ('201','Bambang','Sudirman','bambang@mail.com','0867-1234-6789')

parser.read(function () {
  console.log(typeof parser._data)
  parser.parse();
  console.log(parser._people)
  parser.addPerson(bambang)
  console.log(parser._people)
  parser.write(function(){
    
  })

  // console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

})




