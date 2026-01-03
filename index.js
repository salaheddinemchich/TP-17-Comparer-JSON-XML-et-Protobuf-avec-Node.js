const fs = require('fs');
const convert = require('xml-js');
const protobuf = require('protobufjs');

const root = protobuf.loadSync('employee.proto');
const EmployeeList = root.lookupType('Employees');

const employees = [];

employees.push({
  id: 1,
  name: 'yassir',
  salary: 9000,
  email: 'ali@example.com',
  is_manager: false
});

employees.push({
  id: 2,
  name: 'Kamal',
  salary: 22000,
  email: 'kamal@example.com',
  is_manager: true
});

employees.push({
  id: 3,
  name: 'Amal',
  salary: 23000,
  email: 'amal@example.com',
  is_manager: true
});

let jsonObject = {
  employee: employees
};

console.time('JSON encode');
let jsonData = JSON.stringify(jsonObject, null, 2);
console.timeEnd('JSON encode');

console.time('JSON decode');
let jsonDecoded = JSON.parse(jsonData);
console.timeEnd('JSON decode');

const options = {
  compact: true,
  ignoreComment: true,
  spaces: 2
};

console.time('XML encode');
let xmlData = "<root>\n" + convert.json2xml(jsonObject, options) + "\n</root>";
console.timeEnd('XML encode');

console.time('XML decode');
let xmlJson = convert.xml2json(xmlData, {
  compact: true
});
let xmlDecoded = JSON.parse(xmlJson);
console.timeEnd('XML decode');

let errMsg = EmployeeList.verify(jsonObject);
if (errMsg) {
  throw Error(errMsg);
}

console.time('Protobuf encode');
let message = EmployeeList.create(jsonObject);
let buffer = EmployeeList.encode(message).finish();
console.timeEnd('Protobuf encode');

console.time('Protobuf decode');
let decodedMessage = EmployeeList.decode(buffer);
let protoDecoded = EmployeeList.toObject(decodedMessage);
console.timeEnd('Protobuf decode');

fs.writeFileSync('data.json', jsonData);
fs.writeFileSync('data.xml', xmlData);
fs.writeFileSync('data.proto', buffer);

const jsonFileSize = fs.statSync('data.json').size;
const xmlFileSize = fs.statSync('data.xml').size;
const protoFileSize = fs.statSync('data.proto').size;

console.log(`Taille de 'data.json' : ${jsonFileSize} octets`);
console.log(`Taille de 'data.xml'  : ${xmlFileSize} octets`);
console.log(`Taille de 'data.proto': ${protoFileSize} octets`);

const readBuffer = fs.readFileSync('data.proto');
const readMessage = EmployeeList.decode(readBuffer);
const readObject = EmployeeList.toObject(readMessage);

console.log("\n--- Vérification de la lecture du fichier .proto ---");
console.log(JSON.stringify(readObject, null, 2));