const fs = require('fs');

class Person {
    constructor(id, first_name, last_name, email, phone, created_at) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
        this.created_at = created_at;
    }
}

class PersonParser {
    constructor(file) {
        this.file = file;
        this.peeps = [];
        this.data = null;
    }


    readFile(callback) {
        fs.readFile(this.file, 'utf8', (err, people) => {
            if (err) throw err
            this.data = people;
            callback(people);
        })
    }

    parseData() {
        let details = this.data.toString().split('\n');
        for (let i = 1; i < details.length - 1; i++) {
            let dataArr = details[i].split(',');
            var id = dataArr[0];
            var first_name = dataArr[1];
            var last_name = dataArr[2];
            var email = dataArr[3];
            var phone = dataArr[4];
            var created_at = dataArr[5];

            let person = new Person(id, first_name, last_name, email, phone, created_at);
            // console.log(person);
            
            this.peeps.push(person);
            // console.log(this.peeps.slice(197));
            
        }
    }

    addPerson(id, first_name, last_name, email, phone) {
        var created_at = new Date();
        let person = new Person(id, first_name, last_name, email, phone, created_at);
        this.peeps.push(person);
    }

    writeFile() {
        let personData = 'id,first_name,last_name,email,phone,created_at\n';

        for (let i = 0; i < this.peeps.length; i++) {
            personData += `${this.peeps[i].id},${this.peeps[i].first_name},${this.peeps[i].last_name},${this.peeps[i].email},${this.peeps[i].phone},${this.peeps[i].created_at}\n`;
        }
        fs.writeFile(this.file, personData, (err) => {
            if (err) throw err
            console.log('File write successful!');
        })

    }
}

let parser = new PersonParser('./people.csv');;
parser.readFile(function () {
    parser.parseData();
    parser.addPerson('204', 'Holly', 'Jill', 'holjil@mail.com', '1-975-531-1357', new Date());
    parser.writeFile();
})
