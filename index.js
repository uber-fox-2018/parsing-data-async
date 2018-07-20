const fs = require('fs')

class Person {
    constructor(array) {
        this.id = array[0]
        this.first_name = array[1]
        this.last_name = array[2]
        this.email = array[3]
        this.phone = array[4]
        this.created_at = array[5]
    }
}

class PersonParser{
    constructor(file) {
        this.file = file
        this.people = []
        this.data = null
    }

    read(callback){
        fs.readFile(this.file, 'utf8', (err, file) => {
            if (err) throw err;
            this.data = file.split('\n');
            callback();
        })
        
    }

    dataPeople(){
        for(let i=0; i<this.data.length-1; i++){
            let person = new Person(this.data[i].split(','))
            this.people.push(person)
        }
    }

    addPerson(id, first_name, last_name, email, phone){
        let created_at = new Date()
        let person  = new Person([id,first_name,last_name,email,phone,created_at])
        this.people.push(person)
    }

    save(){
        let newData = ''
        for (let i = 0; i < this.people.length; i++) {
          newData += `${this.people[i].id},${this.people[i].first_name},${this.people[i].last_name},${this.people[i].email},${this.people[i].phone},${this.people[i].created_at} \n`
        }
        fs.writeFileSync('people.csv',newData)
    } 
}

let parser = new PersonParser('people.csv')

parser.read(() => {
    
    parser.dataPeople()
    parser.addPerson(201,'Wahyudi','Setiaji','wayudisetiaji@gmail.com','0858-1348-6177')
    parser.save()
    console.log('Data berhasil di save');
    
})

