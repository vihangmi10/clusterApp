const csvFilePath = './data.csv';
const colors = require('colors');
const csv = require('csvtojson');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const ProgramListing = require('./models/programListing');

mongoose.connect(process.env.MONGODB_URI, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useFindAndModify: false,
   useUnifiedTopology: true
});

const convertCsvToJsonAddToDB = async () => {
    try {
        const jsonArr = await csv().fromFile(csvFilePath);
        const convertedArr =  convertKeys(jsonArr);
        await ProgramListing.create(convertedArr);
        console.log(`Data imported successfully`.cyan.bold);
        process.exit();
    } catch (err) {
        console.log(err.message.red.bold);
    }

};

const convertKeys = (jsonArr) => {
    jsonArr.forEach((jsonObj) => {
        for(let key in jsonObj) {
            if(jsonObj.hasOwnProperty(key)) {
                const convertedKey = removeSpaceConvertToLowerCase(key);
                jsonObj[convertedKey] = jsonObj[key];
                delete jsonObj[key];
            }
        }
    });
    return jsonArr;
};
const removeSpaceConvertToLowerCase = (key) => {
    if(key.includes(' ')) {
        key = key.replace(/ /g, '');
    }
    return key.charAt(0).toLowerCase() + key.slice(1);
};

const deleteData = async () => {
    try {
        await ProgramListing.deleteMany();
        console.log(`Data deleted successfully`.cyan.bold);
        process.exit();
    } catch(e) {
        console.log(e.message.red.bold);
    }
};

if(process.argv[2] === '-i') {
    convertCsvToJsonAddToDB();
} else if(process.argv[2] === '-d') {
    deleteData();
}
