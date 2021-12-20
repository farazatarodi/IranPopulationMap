let csvToJson = require('convert-csv-to-json');

let fileInputName = 'coords_capital.csv';
let fileOutputName = '../amarJSON/coords_capital.json';

csvToJson
  .fieldDelimiter(',')
  .formatValueByType()
  .generateJsonFileFromCsv(fileInputName, fileOutputName);
