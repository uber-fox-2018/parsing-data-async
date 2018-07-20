let fs = require("fs");

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
    this.person = [];
  }

  readFile(cb) {
    fs.readFile(this.file, "utf-8", (err, text) => {
      if (err) {
        throw err;
      } else {
        let arr = [];
        let peoples = text.toString().split("\n");
        console.log(typeof text);

        for (let i = 0; i < peoples.length - 1; i++) {
          arr.push(peoples[i].split(","));
        }
        for (let i = 0; i < arr.length; i++) {
          const id = arr[i][0];
          const first_name = arr[i][1];
          const last_name = arr[i][2];
          const email = arr[i][3];
          const phone = arr[i][4];
          const created_at = arr[i][5];

          this.person.push(
            new Person(
              id,
              first_name,
              last_name,
              email,
              phone,
              created_at,
              new Date()
            )
          );
        }
      }
      cb(this.person);
    });
  }

  countMany(cb) {
    fs.readFile(this.file, (err, data) => {
      if (err) {
        throw err;
      } else {
        console.log(this.person.length);
        cb(this.person.length);
      }
    });
  }

  addtoFile(people) {
    this.person.push(people);
  }

  save(cb) {
    let str = " ";
    for (let i = 0; i < this.person.length; i++) {
      str += this.person[i].id + ",";
      str += this.person[i].first_name + ",";
      str += this.person[i].last_name + ",";
      str += this.person[i].email + ",";
      str += this.person[i].phone + ",";
      str += this.person[i].created_at + "\n";
    }
    fs.writeFileSync(this.file, str, (err, save) => {
      cb(save);
    });
  }
}

const parser = new PersonParser("./person.csv");
parser.readFile(function(data) {
  console.log(data);

  parser.countMany(function(data) {
    let ade = new Person(
      data,
      "ade",
      "fahri",
      "adefahri@gmail.com",
      3389492890,
      new Date()
    );
    parser.addtoFile(ade);
    parser.save();
    console.log(`There are ${data} people in the file '${parser.file}'.`);
  });
});
