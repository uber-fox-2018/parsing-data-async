const fs = require('fs')

class Person {
    constructor(id, first_name, last_name, email, phone, createdAt) {
       this.id = id
       this.first_name = first_name
       this.last_name = last_name
       this.email = email
       this.phone = phone
       this.createdAt = createdAt
    }
}

class PersonParser {
    constructor(file) {
        this.file = file
        this.data = null
        this.people = []
    }

    readData(cb) {
        fs.readFile(this.file, 'utf8', (err, data) => {
            if (err) {
                throw err
            } else {
                this.data = data
            }
            cb()
        })
    }

    parsingData() {
        let category = []
        let people_CSV = this.data.split('\n')

        for (let i = 0; i < people_CSV.length-1; i++) {
            let people_split = people_CSV[i].split(',')

            // let id = people_split[0]
            // let first_name = people_split[1]
            // let last_name = people_split[2]
            // let email = people_split[3]
            // let phone = people_split[4]
            // let createdAt = people_split[5]
            // let people_obj = new Person(id, first_name, last_name, email, phone, createdAt)

            let people_obj = new Person (people_split[0], people_split[1], people_split[2], people_split[3], people_split[4], people_split[5])
            this.people.push(people_obj)
        }
    }

    addPerson(id, first_name, last_name, email, phone, createdAt = new Date()) {
        let new_data_person = new Person(id, first_name, last_name, email, phone, createdAt)
        this.people.push(new_data_person)
    }

    writeFile(cb) {
        let new_data_person_string = ''
        for (let i in this.people) {
            let arrSave = []
            for (let key in this.people[i]) {
                arrSave.push(this.people[i][key])
            }
            new_data_person_string += `${arrSave.join(',')}\n`
        }

        fs.writeFile(this.file, new_data_person_string, (err) => {
            if (err) throw err
            cb()
        })
    }
}

var personParser = new PersonParser('people.csv')
personParser.readData(() => {
    console.log(personParser.data)
    personParser.parsingData()
    personParser.addPerson('201', 'Tyler', 'Durden', 'durden@hotwheels.com', '1-111-666-666')
    personParser.addPerson('202', 'Lauren', 'Tsai', 'durden@hotwheels.com', '1-111-666-666')
    personParser.addPerson('202', 'Anne', 'Hathaway', 'durden@hotwheels.com', '1-111-666-666')
    personParser.writeFile(() => {
        console.log('The file has been saved!')
    })
}) 