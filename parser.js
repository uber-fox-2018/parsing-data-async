const fs = require('fs')

class Person {
    constructor(id,first_name,last_name,email,phone,created_at){
        this.id = id
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.phone = phone
        this.created_at = created_at
    }
}

class PersonParser {
    constructor(file){
        this._file = file
        this._people = []
        this.data = null
    }

    get file(){
        return this._file
    }

    readFile(callback){
        console.log(typeof(this.file));
        fs.readFile(this.file,'utf8',(err,data) => {
          if (err) throw err
          this.data = data
          callback() 
        })
    }

    parse(){
        let convertedData = this.data.toString().split('\n')
        // convertedData.splice(0,1)
        for (let i = 0; i < convertedData.length; i++) {
            let dataPerson = convertedData[i].split(',')
            let id = dataPerson[0]
            let first_name = dataPerson[1]
            let last_name = dataPerson[2]
            let email = dataPerson[3]
            let phone = dataPerson[4]
            let created_at = dataPerson[5]
            
            let person = new Person(id,first_name,last_name,email,phone,created_at)
            this._people.push(person)
        }
        return this._people
    }

    addPerson(id,first_name,last_name,email,phone){
        let created_at = new Date()
        let person = new Person(id,first_name,last_name,email,phone,created_at)
        this._people.push(person)
    }

    save(callback){
        let newData = ''
        
        for (let i = 0; i < this._people.length; i++) {
            newData += `${this._people[i].id},${this._people[i].first_name},${this._people[i].last_name},${this._people[i].email},${this._people[i].phone},${this._people[i].created_at} \n`
        }

        fs.writeFile(this.file,newData, (err) => {
            if (err) throw err
            callback()
        })
    }
}

let par = new PersonParser('./people.csv')
par.readFile(function(){
    par.parse()
    par.addPerson(201,'ketut','budi','budi@mail.com','087-823-499-199')
    par.save(function(){
    console.log(`Data Has Been Saved`);
    })
})



// console.log(par._people);

console.log(`TES CALLBACK`);

