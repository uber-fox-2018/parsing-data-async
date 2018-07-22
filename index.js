const fs = require('fs')

class Person {
    //class untuk data melihat data-data personya
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
    //data-data yg di parse di baca(readFile()) dan writeFile()
    constructor(file){
        this.file = file
        this.people = []
        this.data = null
    }

    //baca File --> readFile(async)
    readFile(callback){
        let that = this // karena this, sudah punya properety, oleh karena itu di dalam call back digunakan variabel tmabahan
        fs.readFile(this.file,'utf8',function(err,data) {
          if (err) throw err
          that.data = data // membaca parser.data --> karena null data di tampung jadi data
          callback() 
        })
    }

    parse(){
        let data = this.data.toString().split('\n')
    
        for (let i = 0; i < data.length-1; i++) { // meggunkan length-1, file csv setiap add, akan secara otomstis print 1x
            let dataPeople = data[i].split(',')
            
            let id = dataPeople[0]
            let first_name = dataPeople[1]
            let last_name = dataPeople[2]
            let email = dataPeople[3]
            let phone = dataPeople[4]
            let created_at = dataPeople[5]
            
            let person = new Person(id,first_name,last_name,email,phone,created_at) // memasukan data ke class person
            this.people.push(person) 
        }
        return this.people
    }

    //method untuk tambah data person
    addPerson(id,first_name,last_name,email,phone){
        let created_at = new Date() // seusaui method --> function bawaan sesuai dengan date jaman sekarang
        let person = new Person(id,first_name,last_name,email,phone,created_at)
        this.people.push(person)
    }

    save(callback){
        let dataNew = ''
        
        for (let i = 0; i < this.people.length; i++) {
            dataNew += `${this.people[i].id},${this.people[i].first_name},${this.people[i].last_name},${this.people[i].email},${this.people[i].phone},${this.people[i].created_at} \n`
        }

        fs.writeFile(this.file,dataNew, (err) => {  //writeFile(async) -->save perubahan data (penambahan data)
            if (err) throw err
            callback()
        })
    }
}

let parser = new PersonParser('./people.csv')
parser.readFile(function(){
    parser.parse()
    parser.addPerson(201,'cim','min','cim@mail.com','081-000-0000-0000')
    parser.save(function(){
//     console.log(`Data Has Been Saved`);
    })
})

// parser.readFile(()=> {
//     console.log(parser.data)
// })

