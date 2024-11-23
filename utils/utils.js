const fs = require('fs');
const csv = require('csv-parser');
const { faker } = require('@faker-js/faker');

class User {
    constructor(fullName="", email="", phone="", password="") {
        this.fullName = fullName,
        this.email = email,
        this.phone = phone,
        this.password = password
    }

    createCSV(){
        const newUser = `${this.fullName},${this.email},${this.phone},${this.password}\n`;
        try {
            fs.appendFileSync('./users.csv', newUser);
        } catch (error) {
            console.log(`${error}`);
        }
    }

    readCSV(filePath){
        let users = []
        fs.createReadStream(filePath)
        .pipe(csv({ delimiter: ",", from_line: 2}))
        .on("data", (row) => {
            console.log(users.push(row));
        });
    }
}


const generateEmail = (fullName) => {
    // Remove spaces between fullname
    // Convert to lowercase
    // add @labms.com
    let full_name = fullName.split(" ").join("");
    let full_name_lower = full_name.toLowerCase();
    return full_name_lower + "@labms.com";
}

const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (min, max))
}

const generateRandomSymbol = () => {
    const mySymbol = ['@!','#&','!','@', '#', '$', '&'];
    const min = 0;
    const max = mySymbol.length;
    const randomIndex = generateRandomNumber(min, max);
    return mySymbol[randomIndex];
}

const generatePassword = (full_name) => {
    let name = full_name.split(" ");
    const max = name.length;
    const randomIndex = generateRandomNumber(0, max);
    const mySymbol = generateRandomSymbol();
    return name[randomIndex] + mySymbol + generateRandomNumber(1000, 9999);
}

for (let i = 0; i < 15; i++) {
    let fullName = faker.name.fullName();
    let phoneNumber = faker.phone.number('+254-####-###-###');
    let email = generateEmail(fullName);
    let password = generatePassword(fullName);

    let user = new User(fullName, email, phoneNumber, password);
    user.createCSV();
}
