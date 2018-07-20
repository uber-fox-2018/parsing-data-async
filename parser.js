"use strict"
var fs = require('fs')

class Person{
  constructor(id, first_name, last_name, email, phone, created_at ){
    this._id = id
    this._firstName = first_name
    this._lastName = last_name
    this._email = email
    this._phone = phone
    this._created_at = new Date(created_at)
  }
}

class PersonParser{

  constructor(file) {
    this._file = file
    this._people = []
    this._dataRaw = ''
  }

  get file(){
    return this._file
  }

  get people(){
    // console.log('ini =============>',this._people[0]);
    return {
      size : this._people.length
    }
  }


  set people(people){    
    this._people.push(people)
  }

  readData(cb){
    let that = this
    fs.readFile(this._file,'utf8',function(err,data){
      if(err){
        throw err
      }else{
        // cb(data)
        that._dataRaw = data
        cb()
      }
    })
  }

  writeFile(str){
    fs.writeFile('people.csv',str,function(err){
      if(err){
        throw err
      }
    })
  }
  
  save(){
    var str = ''
    for(var i = 0; i < this._people.length;i++){
      var temp = []
      for(var key in this._people[i]){
        temp.push(this._people[i][key])
      }
      if(i === this._people.length-1){
        str += temp.join(',')
      }else{
        str += temp.join(',')+('\n')
      }
    }
    this.writeFile(str)
  }

  parse(){

      let dataParse = this._dataRaw.split('\n')
      for(var i = 0; i < dataParse.length;i++){
        let coll = dataParse[i].split(',')
        let id = coll[0]
        let first_name= coll[1]
        let last_name = coll[2]
        let email =  coll[3]
        let phone = coll[4]
        let created_at = coll[5]
        var person = new Person(id,first_name,last_name,email,phone,created_at)
        this.people = person
      }
  }

  addPerson(newPerson){
    this.people = newPerson
  }

}

let parser = new PersonParser('people.csv')

parser.readData(function(){
  parser.parse()
  parser.addPerson(new Person(`${parser.people.size}`,'imam','farid','imam@farid.com','0876xxxxxxx',new Date()))
  parser.save()
  console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
})

