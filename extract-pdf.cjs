const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('NCERT_Digital_Board_Class1_to_12.pdf');

pdf(dataBuffer).then(function(data) {
  // Output first 15000 chars
  console.log(data.text.substring(0, 15000));
}).catch(err => {
  console.error('Error:', err.message);
});
